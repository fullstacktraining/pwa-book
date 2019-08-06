importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
import { generateCard, generateArticle } from './utils.mjs';

if (workbox) {
  console.log('Workbox loaded');
  workbox.precaching.precacheAndRoute([]);
  workbox.precaching.cleanupOutdatedCaches();

  const apiRoute = `http://localhost:3000/api/news`;
  
  const cacheStrategy = new workbox.strategies.CacheFirst();
  const apiStrategy = new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-cache'
  });

  workbox.routing.registerRoute(
    '/',
    workbox.streams.strategy([
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/header.html')}),
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/info.html')}),
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/hero.html')}),
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/articles.html')}),
      async ({event, url}) => {
        try {
          const response = await apiStrategy.makeRequest({
            event,
            request: apiRoute,
          });
          const articles = await response.json();
          let cards = '';
          articles.forEach(article => {
            cards += generateCard(article);
          });
          return cards;
        } catch (error) {
          console.error(error);
        }
      },
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/articles-close.html')}),
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/footer.html')}),
    ])
  );

  workbox.routing.registerRoute(
    new RegExp('\/news\/[0-9]+'),
    workbox.streams.strategy([
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/header.html')}),
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/info.html')}),
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/articles.html')}),
      async ({event, url}) => {
        const id = url.pathname.split('/')[2];
        try {
          const response = await apiStrategy.makeRequest({
            event,
            request: `${apiRoute}/${id}`,
          });
          const article = await response.json();
          return generateArticle(article[0]);
        } catch (error) {
          console.error(error);
        }
      },
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/articles-close.html')}),
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/footer.html')}),
    ])
  );

  workbox.routing.registerRoute(
    new RegExp(`/about.html`),
    workbox.streams.strategy([
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/header.html')}),
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/info.html')}),
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/about.html')}),
      () => cacheStrategy.makeRequest({request: workbox.precaching.getCacheKeyForURL('partials/footer.html')}),
    ])
  );
}