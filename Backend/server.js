var express = require('express');
var bodyParser = require('body-parser');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, function() {
  console.log("Listing on port: ", port);
})

const express = require('express');

// Use "db" to query your database in your API endpoints.

// Example route to get all items
app.get('/api/items', async (req, res) => {
  const items = await db('items').select();
  res.json(items);
});

// ...

app.listen(8080, () => {
  console.log(`Server listening on port ${port}`);
});