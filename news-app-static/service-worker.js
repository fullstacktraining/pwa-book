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

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(assetCache).then(cache => cache.addAll(files))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});