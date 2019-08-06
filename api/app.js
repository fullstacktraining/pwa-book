const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const data = require('./data');

const webpush = require('web-push');

const vapidKeys = {
  publicKey: 'BFdZJyk0BeBehG4Yai5cMAF6i27qplrG-8fDfWnSl8-lhqwIMHHIAD9bSgEnlSTUz55h8Rjw8SUPeYx2DCpX2_E',
  privateKey: '6iHmoxcTpY7fb91Cau3Sm27i-fiTgRlOhFmRgc302rk'
};

webpush.setVapidDetails(
  'mailto:user@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const sendNotification = (subscription, data) => {
  webpush.sendNotification(subscription, data);
};

const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// subscription
const subscriptions = {
  subscription: null
};

const saveSubscription = async subscription => {
  subscriptions.subscription = subscription;
};

app.post('/save-subscription', async (req, res) => {
  const subscription = req.body;
  await saveSubscription(subscription);
  res.json('success');
});

app.get('/api/news', (req, res) => {
  const articles = data.articles;
  const props = ['body', 'author', 'title'];
  const articleList = articles.map(article => {
    return Object.keys(article).reduce((object, key) => {
      if (!props.includes(key)) {
        object[key] = article[key];
      }
      return object;
    }, {});
  });
  
  return res.status(200).json(articleList);
});

app.get('/api/news/:id', (req, res) => {
  const id = +req.params.id;
  const articles = data.articles;
  const article = articles.filter(article => article.id === id);
  if (article.length === 0) {
    return res.status(404).json('Article not found');
  }
  return res.status(200).json(article);
});

app.post('/api/news', (req, res) => {
  const article = req.body;
  data.articles.push(article);
  const subscription = subscriptions.subscription;
  sendNotification(subscription, JSON.stringify({ title: article.title, author: article.author }));
  return res.status(201).json('Article added');
});

app.listen(port, () => console.log(`==
Available endpoints:
 * GET '/api/news'
 * GET '/api/news:id'
 * POST '/api/news'
 * POST '/save-subscription'
==

Server is up on port ${port} 🚀`))
