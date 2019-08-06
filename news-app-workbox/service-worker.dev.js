importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log('Workbox loaded');
  workbox.precaching.precacheAndRoute([]);

  const apiRoute = 'http://localhost:3000/api/news';
  workbox.routing.registerRoute(
    apiRoute,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'api-cache'
    })
  );
}