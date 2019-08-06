const files = [
  '/',
  'index.html',
  'about.html',
  'app.js',
  'app.css',
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
  'node_modules/jquery/dist/jquery.min.js',
  'assets/icons/icon.png',
  'favicon.ico'
];

const assetCache = 'assets';
const apiCache = 'api';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(assetCache).then(cache => cache.addAll(files))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('api')) { // API request, Cache then network
    console.log('this is an API request');
    event.respondWith(
      caches.open(apiCache).then(cache => {
        return fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    );
  } else { // static asset request, cache first with network fallback
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});