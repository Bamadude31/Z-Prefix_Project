const express = require("express");
const cors = require("cors");
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

const bcrypt = require("bcrypt");

const app = express();
const port = 8082;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`App running on port ${port}.`));

app.get("/", (req, res) => {
  res.json({ info: "Application Z-Prefix Backend" });
});

// User Registration
app.post("/users/signup", async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  try {
    let usernameIsDuplicate = false;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: hashedPassword,
    };

    knex("user_data").then((userData) => {
      userData.forEach((user) => {
        if (user.username === username) usernameIsDuplicate = true;
      });
      if (!usernameIsDuplicate) {
        knex("user_data").insert(user).then(res.status(201).send());
      } else {
        res.status(400).send("Username already exists");
      }
    });
  } catch {
    res.status(500).send();
  }
});

// User login
app.post("/users/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await knex("user_data")
      .select("*")
      .where("username", username);
    if (!user[0]) {
      return res.status(400).send("user is not in system");
    }
    if (await bcrypt.compare(password, user[0].password)) {
      res.status(200).send({
        id: user[0].id,
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        username: user[0].username,
      });
    } else {
      res.status(400).send("incorrect password");
    }
  } catch {
    res.status(500).send();
  }
});

// user_data;
app.get("/user", async (req, res) => {
  knex("user_data")
    .select("*")
    .then((all_user) => res.status(200).send(all_user))
    .catch((e) => res.status(500).send());
});

// get all item data
app.get("/items", async (req, res) => {
  knex("item")
    .select("*")
    .then((all_items) => res.status(200).send(all_items))
    .catch((e) => res.status(500).send());
});

// get user item data
app.get("/user/items", async (req, res) => {
  const { id } = req.query;
  knex("item")
    .select("*")
    .where("user_id", id)
    .then((user_items) => res.status(200).send(user_items))
    .catch((e) => res.status(500).send());
});

// add a new item
app.post("/make-item", async (req, res) => {
  const { user_id, item_name, description, quantity } = req.body;
  knex("item")
    .insert({
      user_id: user_id,
      item_name: item_name,
      description: description,
      quantity: quantity,
    })
    .then((data) => res.status(201).send(data))
    .catch((e) => res.status(500).send(e));
});

// update an item
app.patch("/item", async (req, res) => {
  const { id, item_name, description, quantity } = req.body;
  knex("item")
    .where("id", id)
    .update({
      item_name: item_name,
      description: description,
      quantity: quantity,
    })
    .then((x) => res.status(200).send())
    .catch((e) => res.status(500).send());
});

// delete an item
app.delete("/item", async (req, res) => {
  const { id } = req.body;
  knex("item")
    .where("id", id)
    .del()
    .then((x) => res.status(200).send())
    .catch((e) => res.status(500).send());
});

/* OLDER BACKEND CODE */

// const bodyParser = require('body-parser');
// const app = express()
// const pgp = require('pg-promise')();
// const db = pgp('postgres://postgres:password@localhost:5432/postgres');
// const knexConfig = require('./db/knexfile.js');
// const knex = require('knex')(knexConfig);
// const port = 8082

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true}));

// app.get('/', (request, response) => {
//   response.json({ info: 'Application Z-Prefix' })
// })

// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

// app.get('/items', db.getItems);
// app.get('/items/:id', db.getItemById);
// app.post('/items', db.createItem);
// app.put('/items/:id', db.updateItem);
// app.delete('/items/:id', db.deleteItem);

//--------------------------------------
// Example query for Users table
//
// db.query(`
// CREATE TABLE Users (
//   id SERIAL PRIMARY KEY,
//   first_name VARCHAR(255) NOT NULL,
//   last_name VARCHAR(255) NOT NULL,
//   username VARCHAR(255) NOT NULL,
//   password VARCHAR(255) NOT NULL);
// );
//--------------------------------------
// Example query for items table
//db.query('
// CREATE TABLE items (
//   id SERIAL PRIMARY KEY,
//   UserId INTEGER NOT NULL,
//   Item_Name VARCHAR(255) NOT NULL,
//   Description VARCHAR(255) NOT NULL,
//   Quality INTEGER NOT NULL
// );
