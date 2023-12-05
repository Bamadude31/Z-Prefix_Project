//Service and Middleware
const app = express();
const express = require('express');
const bodyParser = require('body-parser');
const cors =require('cors');
const morgan = require('morgan');
// const knexConfig = require('./knexfile');
// const db = knex(knexConfig.development);
require('dotenv/config');
//Start of app usaage
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
const api =process.env.API_URL;
const port = process.env.PORT


app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);



app.get(`/`,(req,res) =>{
  res.send('root path is working')
})

app.get(`${api}`,(req,res) => {
  res.send('api path is working')
})

// Starting route to get all items
app.get(`${api}/products`,(req,res) =>{
  const product = {
    id: 1,
    UserId: 1234,
    Item_Name: 'chair',
    Description: 'three legged stool',
    Quality: '15',
  }
  res.send('product');
})

// Server listening
app.listen(port, () => {
  console.log(api);
  console.log(`Server listening on port ${port}`);
});






// _________________________________________________________________.




//Database fix this with knex
// mongoose.connect(process.env.CONNECTION_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'eshop-database'
// })
// .then(()=>{
//     console.log('Database Connection is ready...')
// })
// .catch((err)=> {
//     console.log(err);
// })

//Older code

// app.get(api +'/items', async (req, res) => {
//   res.send('hello items!');


  // const items = await db('items').select();
  // res.json(items);
// });
