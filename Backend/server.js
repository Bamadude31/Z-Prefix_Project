require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:password@localhost:5432/postgres');
const knexConfig = require('./db/knexfile.js');
const knex = require('knex')(knexConfig);
const port = 8082


app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (request, response) => {
  response.json({ info: 'Application Z-Prefix' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.get('/items', db.getItems);
app.get('/items/:id', db.getItemById);
app.post('/items', db.createItem);
app.put('/items/:id', db.updateItem);
app.delete('/items/:id', db.deleteItem);





app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

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


// // `)
//   .then(() => {
//     console.log('eshop table created');
//   })
//   .catch(error => {
//     console.error('Error creating eshop table', error);
//   });

// db.query('SELECT * FROM eshop')
//   .then(data => {
//     console.log(data)
//     console.log("Connected to Database");
//   })
//   .catch(error => {
//     console.error('Error executing query', error);
//   });




// app.post('/items', async (req, res) => {
//   const items = new Items({
//     UserId: req.body.UserId,
//     Item_Name: req.body.Item_Name,
//     Description: req.body.Description,
//     Quality: req.body.Quality
//   })
//   try {
//     const newItems = await Items.save()
//     res.status(201).json(newItems)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// });


//////////////////////////////////////////////////////
/* Backup queries if needed   */


// app.get('/items',(request,response) =>{
//   knex('items')
//     .select('*')
//     .then(data => {
//       var itemNames = data.map(items => items)
//       response.json(itemNames);
//     })
// })


// app.post('/items', async (req, res) => {
//   try {
//     const newItem = await knex('items').insert({
//       UserId: req.body.UserId,
//       Item_Name: req.body.Item_Name,
//       Description: req.body.Description,
//       Quality: req.body.Quality
//     }).returning('*');

//     res.status(201).json(newItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
// const usersRouter = require('./routes/users')
// app.use('/users', usersRouter)
// const itemsRouter = require('./routes/items')
// app.use('/items', itemsRouter)