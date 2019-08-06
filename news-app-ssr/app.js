const registerServiceWorker = async () => {
  try {
    const swRegistration = await navigator.serviceWorker.register('./service-worker.js');
    return swRegistration;
  } catch(error) {
    console.error(error);
  }
}

const main = async () => {
  try {
    await registerServiceWorker();
  } catch(error) {
    console.error(error);
  }
}

main();