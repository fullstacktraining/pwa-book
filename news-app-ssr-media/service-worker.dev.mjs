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
    new RegExp('^https://res\.cloudinary\.com'),
    
    new workbox.strategies.CacheFirst({
      cacheName: 'cloudinary-images',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: 50,
          purgeOnQuotaError: true,
        }),
      ],
    })
  );

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

const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

async function saveSubscription(subscription) {
  const SERVER_URL = 'http://localhost:3000/save-subscription';
  try {
    const response = await fetch(SERVER_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    });

    return response.json();
  } catch(error) {
    console.error(error);
  }
};

self.addEventListener('activate', async () => {
  try {
    const applicationServerKey = urlB64ToUint8Array(
      'BFdZJyk0BeBehG4Yai5cMAF6i27qplrG-8fDfWnSl8-lhqwIMHHIAD9bSgEnlSTUz55h8Rjw8SUPeYx2DCpX2_E'
    );

    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    const response = await saveSubscription(subscription);
  } catch (err) {
    console.error('Error', err);
  }
});

self.addEventListener('push', function(event) {
  if (event.data) {
    console.log('Push event!! ', event.data.text());
    showLocalNotification(JSON.parse(event.data.text()).author, JSON.parse(event.data.text()).title,  self.registration);
  } else {
    console.log('Push event but no data');
  }
});
const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body
  };
  swRegistration.showNotification(title, options);
};