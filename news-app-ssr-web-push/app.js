window.addEventListener('load', async () => {

  const requestNotificationPerm = async () => {
    const permission = await window.Notification.requestPermission();
  };
  
  const CACHE = 'api-cache';
  const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('./service-worker.js');
    return swRegistration;
  }

  const main = async () => {
    await registerServiceWorker();
    await requestNotificationPerm();
  }

  const apiCache = await caches.open(CACHE);
  const cachedRequests = await apiCache.keys();
  const cachedUrls = cachedRequests.map(request => request.url);
  const cards = document.querySelectorAll('.card');
  const uncachedCards = [...cards].filter(card => {
    return !cachedUrls.includes(card.dataset.cache);
  });

  const offlineHandler = () => {
    for (const uncachedCard of uncachedCards) {
      uncachedCard.style.opacity = '0.3';
    }
  };

  const onlineHandler = () => {
    for (const uncachedCard of uncachedCards) {
      uncachedCard.style.opacity = '1.0';
    }
  };

  window.addEventListener('online', onlineHandler);
  window.addEventListener('offline', offlineHandler);

  if (navigator.onLine) {
    onlineHandler();
  } else {
    offlineHandler();
  }

  const readLaterNodes = document.getElementsByClassName('read-later');
  for (let i = 0; i < readLaterNodes.length; i++) {
    readLaterNodes[i].addEventListener('click', event => {
      caches.open(CACHE).then(async cache => {
        const response = await fetch(event.target.getAttribute('data-cache'));
        cache.put(new Request(event.target.getAttribute('data-cache')), response.clone());
        window.location.reload();
      });
    });
  }

  main();
});