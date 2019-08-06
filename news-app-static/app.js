const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register('service-worker.js');
  return swRegistration;
}

const main = async () => {
  await registerServiceWorker();  
}

main();