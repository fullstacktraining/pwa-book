const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register('service-worker.js');
  return swRegistration;
}

const main = async () => {
  await registerServiceWorker();
  try {
    const data = await fetch('http://localhost:3000/api/news');
    const articles = await data.json();
    if (articles) {
      articles.forEach(article => {
        const card = generateCard(article);
        document.getElementById('articles').innerHTML += card;
      });
    }
  } catch(error) {
    throw new Error(error);
  }
}

main();

/*
*
*/
function generateCard(article) {
  const today = new Date();
  const added = new Date(article.added);
  const difference = parseInt((today - added) / (1000 * 3600));
  
  return `<div class="col-md-4">
  <div class="card mb-4 shadow-sm">
    <div class="card-body">
      <p class="card-text">${article.slug}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <a href="#" class="btn btn-sm btn-outline-primary">Read more</a>
          <a href="#" class="btn btn-sm btn-outline-secondary read-later">Read later</a>
        </div>
        <small class="text-muted">${difference === 1 ? `${difference} hour ago` : `${difference} hours ago`}</small>
      </div>
    </div>
  </div>`;
}