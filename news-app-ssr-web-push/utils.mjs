export function generateCard(article) {
  const today = new Date();
  const added = new Date(article.added);
  const difference = parseInt((today - added) / (1000 * 3600));
  
  return `
<div class="col-md-4">
  <div class="card mb-4 shadow-sm" data-cache="http://localhost:3000/api/news/${article.id}">
    <div class="card-body">
      <p class="card-text">${article.slug}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <a href="news/${article.id}" class="btn btn-sm btn-outline-primary">Read more</a>
          <a class="btn btn-sm btn-outline-secondary read-later" data-cache="http://localhost:3000/api/news/${article.id}" on>Read later</a>
        </div>
        <small class="text-muted">${difference === 1 ? `${difference} hour ago` : `${difference} hours ago`}</small>
      </div>
    </div>
  </div>
</div>`;
}

export function generateArticle(article) {
  const today = new Date();
  const added = new Date(article.added);
  const difference = parseInt((today - added) / (1000 * 3600));
  
  return `<div class="col-md-12">
    <h2>${article.title}</h2>
    <p>Written by <strong>${article.author}</strong> <small class="text-muted">${difference === 1 ? `${difference} hour ago` : `${difference} hours ago`}</small></p>
    <p>${article.body}</p>
    <p><small><a href="/">Go back</small></p>
  </div>`;
}