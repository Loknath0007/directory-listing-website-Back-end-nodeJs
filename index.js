const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId

const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.daqqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db('listing_siteDB');
      const usersCollection = database.collection('users');
      const postsCollection = database.collection('posts');
    //   const categoriesCollection = database.collection('categories');
      const citiesCollection = database.collection('cities');
      const paymentsCollection = database.collection('payments');


    // post (get,post)

    app.get('/users', async (req, res) => {
        const cursor = usersCollection.find({});
        const users = await cursor.toArray();
        res.json(users);

    })


    app.post('/users',async(req,res)=>{
        const users = req.body; 
         const result = await usersCollection.insertOne(users);
         res.json(result);
      
     })

       //   single data get 

       app.get('/users/:id', async (req, res) => {
        const id= req.params.id;
        const query ={_id: ObjectId(id)};
        console.log('get id')
        const result = await usersCollection.findOne(query);
        res.json(result);
      })


     //Update

      app.put('/users/:id', async (req, res) => {
        const id = req.params.id;
        const posts = req.body;
        const filter = {_id: ObjectId(id)}
        // const options = { upsert: true };
        const updateDoc = {
           $set: posts
            
        };
        const result = await usersCollection.updateOne(filter, updateDoc);
        res.json(result);
      });

     // delete api 
  
     app.delete('/users/:id',async(req,res)=>{
        const id= req.params.id;
        const query ={_id: ObjectId(id)};
        const result = await usersCollection.deleteOne(query);
        res.json(result);
      })



      
    // post (get,post)

    app.get('/posts', async (req, res) => {
        const cursor = postsCollection.find({});
        const posts = await cursor.toArray();
        res.json(posts);

    })


    app.post('/posts',async(req,res)=>{
        const posts = req.body; 
         const result = await postsCollection.insertOne(posts);
         res.json(result);
      
     })

       //   single data get 

       app.get('/posts/:id', async (req, res) => {
        const id= req.params.id;
        const query ={_id: ObjectId(id)};
        console.log('get id')
        const result = await postsCollection.findOne(query);
        res.json(result);
      })


     //Update

      app.put('/posts/:id', async (req, res) => {
        const id = req.params.id;
        const posts = req.body;
        const filter = {_id: ObjectId(id)}
        // const options = { upsert: true };
        const updateDoc = {
           $set: posts
            
        };
        const result = await postsCollection.updateOne(filter, updateDoc);
        res.json(result);
      });

     // delete api 
  
     app.delete('/posts/:id',async(req,res)=>{
        const id= req.params.id;
        const query ={_id: ObjectId(id)};
        const result = await postsCollection.deleteOne(query);
        res.json(result);
      })


    
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server Running')
  })
  
  app.listen(port, () => {
    console.log(`listening at ${port}`)
  })