importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log('Workbox loaded');
  workbox.precaching.precacheAndRoute([
  {
    "url": "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "revision": "a15c2ac3234aa8f6064ef9c1f7383c37"
  },
  {
    "url": "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
    "revision": "a454220fc07088bf1fdd19313b6bfd50"
  },
  {
    "url": "node_modules/jquery/dist/jquery.min.js",
    "revision": "220afd743d9e9643852e31a135a9f3ae"
  },
  {
    "url": "assets/icons/android-icon-144x144.png",
    "revision": "bef8804ac792065d0979fe124e99132f"
  },
  {
    "url": "assets/icons/android-icon-192x192.png",
    "revision": "14955c89fbbb488a6f42bccfdff500a9"
  },
  {
    "url": "assets/icons/android-icon-36x36.png",
    "revision": "9119b8498a1cf558b9c8a453b18bdcc2"
  },
  {
    "url": "assets/icons/android-icon-48x48.png",
    "revision": "ebfd8c223bef69a29e77c4cb33b3b968"
  },
  {
    "url": "assets/icons/android-icon-72x72.png",
    "revision": "3a89376f3c8b29886eca32b5d363f03d"
  },
  {
    "url": "assets/icons/android-icon-96x96.png",
    "revision": "1cd347774ecceae5a1d58c6cda110e6b"
  },
  {
    "url": "assets/icons/apple-icon-114x114.png",
    "revision": "61e7f5e1e93d52c90df455a8c922a9a5"
  },
  {
    "url": "assets/icons/apple-icon-120x120.png",
    "revision": "accabae3409ba247f42ff040b8fedbc6"
  },
  {
    "url": "assets/icons/apple-icon-144x144.png",
    "revision": "bef8804ac792065d0979fe124e99132f"
  },
  {
    "url": "assets/icons/apple-icon-152x152.png",
    "revision": "1178f37d7c7aa523d443fd9c91d7d840"
  },
  {
    "url": "assets/icons/apple-icon-180x180.png",
    "revision": "4c9bdb47ef728e33d8bffa4bb47b736f"
  },
  {
    "url": "assets/icons/apple-icon-57x57.png",
    "revision": "8caffd092dd5139981ac228f0953b7c2"
  },
  {
    "url": "assets/icons/apple-icon-60x60.png",
    "revision": "30dc13ba1e39720d7a5013ead866344f"
  },
  {
    "url": "assets/icons/apple-icon-72x72.png",
    "revision": "3a89376f3c8b29886eca32b5d363f03d"
  },
  {
    "url": "assets/icons/apple-icon-76x76.png",
    "revision": "3e9ca1af32ffd73cfea86cb33218bc2c"
  },
  {
    "url": "assets/icons/apple-icon-precomposed.png",
    "revision": "4ff2d1147023f526309bcbdef4ef6ada"
  },
  {
    "url": "assets/icons/apple-icon.png",
    "revision": "4ff2d1147023f526309bcbdef4ef6ada"
  },
  {
    "url": "assets/icons/favicon-16x16.png",
    "revision": "624d2a0f99f3cd064546c4bb0edf6383"
  },
  {
    "url": "assets/icons/favicon-32x32.png",
    "revision": "d8b2e8faab65187d013716f9e9d81cc5"
  },
  {
    "url": "assets/icons/favicon-96x96.png",
    "revision": "1cd347774ecceae5a1d58c6cda110e6b"
  },
  {
    "url": "assets/icons/icon.png",
    "revision": "4ff2d1147023f526309bcbdef4ef6ada"
  },
  {
    "url": "assets/icons/ms-icon-144x144.png",
    "revision": "bef8804ac792065d0979fe124e99132f"
  },
  {
    "url": "assets/icons/ms-icon-150x150.png",
    "revision": "9156c4852adc113f83009213c14861ab"
  },
  {
    "url": "assets/icons/ms-icon-310x310.png",
    "revision": "b03a3c761218e60f9f57a89c41c3f17b"
  },
  {
    "url": "assets/icons/ms-icon-70x70.png",
    "revision": "c5f25fa6a93484231f681a6a8d4ef7cd"
  },
  {
    "url": "about.html",
    "revision": "43c831a29c15e33671f438004378c2f0"
  },
  {
    "url": "app.css",
    "revision": "c0b1d7a32d300c2a65c67a8fbd6d7c20"
  },
  {
    "url": "app.js",
    "revision": "ca90443c0e23ade45c47ed116e56b8bd"
  },
  {
    "url": "index.html",
    "revision": "780056d9f63126ddc0f257a42787bc26"
  }
]);

  const apiRoute = 'http://localhost:3000/api/news';
  workbox.routing.registerRoute(
    apiRoute,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'api-cache'
    })
  );
}