const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();


const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('server Running')
  })
  
  app.listen(port, () => {
    console.log(`listening at ${port}`)
  })