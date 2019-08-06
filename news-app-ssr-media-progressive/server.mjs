import express from 'express';
import fs from 'fs';
import fetch from 'node-fetch';
import { generateCard, generateArticle } from './utils.mjs';

// to enable __dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 8080;

const app = express();
const files = [
  '/node_modules/',
  '/assets/icons/',
  '/app.css',
  '/app.js',
  '/service-worker.js',
  '/partials',
  '/favicon.ico',
  '/manifest.json'
];
files.forEach(file => {
  app.use(file, express.static(`${__dirname}/${file}`));
});


app.get('/', async (req, res) => {
  res.write(fs.readFileSync('partials/header.html'));
  res.write(fs.readFileSync('partials/info.html'));
  res.write(fs.readFileSync('partials/hero.html'));
  res.write(fs.readFileSync('partials/articles.html'));
  const articles = await(await fetch('http://localhost:3000/api/news')).json();
  articles.forEach(article => {
    const card = generateCard(article);
    res.write(card);
  });
  res.write(fs.readFileSync('partials/articles-close.html'));
  res.write(fs.readFileSync('partials/footer.html'));
  res.end();
});

app.get('/about.html', async (req, res) => {
  res.write(fs.readFileSync('partials/header.html'));
  res.write(fs.readFileSync('partials/info.html'));
  res.write(fs.readFileSync('partials/about.html'));
  res.write(fs.readFileSync('partials/footer.html'));
  res.end();
});

app.get('/news/:id', async (req, res) => {
  const { id } = req.params;
  res.write(fs.readFileSync('partials/header.html'));
  res.write(fs.readFileSync('partials/info.html'));
  res.write(fs.readFileSync('partials/articles.html'));
  const article = await(await fetch(`http://localhost:3000/api/news/${id}`)).json();
  const card = generateArticle(article[0]);
  res.write(card);
  res.write(fs.readFileSync('partials/articles-close.html'));
  res.write(fs.readFileSync('partials/footer.html'));
  res.end();
});

app.listen(port, () => console.log(`Application is up on port ${port} 🚀`));