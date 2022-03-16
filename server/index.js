const express = require('express');
const axios = require('axios');
const { API_KEY } = require('../config');
const db = require('../db');

const app = express();

const PORT = 3002;

app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.json());

app.get('/mvp/search', (req, res) => {
  const params = req.query;
  axios(
    {
      method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/search',
      headers: { Authorization: `Bearer ${API_KEY}` },
      params,
    },
  )
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// app.post('//')

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT} :)`);
});
