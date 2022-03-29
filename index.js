const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId
const bodyParser = require("body-parser");
const session = require('express-session');
// const sessoin = require('e')

const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;
// const mongoose = require('mongoose')
const mongoose = require('mongoose')

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded(
      { extended:true }
))



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.daqqt.mongodb.net/listing_siteDB?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const con= mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log('connect'))




// initial coding for uploading photo 
// set storage 

const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const fileFilter = (req,file,cb)=>{
  // var ext = path.extname(file.originalname);
  const ext = path.extname(file.originalname);
  if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    return cb(new Error('Only images are allowed'))
}

}

// const fileSize = parseInt(req.headers['content-length']);
//       if (fileSize > 1048576) {
//         callback(new Error('Please upload file less then 10Mb'));
//     }


var upload = multer({ 
  storage: storage ,
  limits:{ fileSize: 200 * 1024 * 1024} ,
    // fileFilter:fileFilter
  });

// const {upload} = require('./middlewares/products/fileUplaod')


const path = require('path');
const fs = require("fs");

// const mongoose = require("mongoose");
var imageModel = require('./model/Images');
 
 
app.use(bodyParser.urlencoded(
      { extended:true }
))
 
    
//multiple file problem 
app.post('/post/imageupload/:id', upload.array('images',6), (req, res, next) => {

	var obj = {
    postId: req.params.id ,
		name: req.body.name,
		desc: req.body.desc,
		img: {
      data: req.files.map(file=>fs.readFileSync(path.join(__dirname+ '/uploads/' + file))),
			// data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.files.map(filename=>filename=filename))),
			contentType: 'image/*'
		}
	}
	imageModel.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.send(item);
		}
	});
  res.send('upload ok')
});


// end of file uploadation 




//Router
const authRouter=require('./routes/authRouter')
app.use('/',authRouter)
const postRouter=require('./routes/postRouter')
app.use('/posts',postRouter)
const categoryRouter=require('./routes/categoryRouter')
app.use('/categories',categoryRouter)
const locationRouter=require('./routes/locationRouter')
app.use('/location',locationRouter)
const userRouter=require('./routes/userRoute');

app.use('/users',userRouter);
const fileUploadRouter = require('./routes/fileUploadRoute');
app.use('/post',fileUploadRouter)
// app.use('/',fileUploadRouter)





// async function run() {
//     try {

//       // await client.connect();
//       // const database = client.db('listing_siteDB');
//       // const usersCollection = database.collection('users');
//       // const postsCollection = database.collection('posts');
//       // const categoriesCollection = database.collection('categories');
//       // const citiesCollection = database.collection('cities');
//       // const paymentsCollection = database.collection('payments');


//     // User (get,post,update,delete)

//     // app.get('/users', async (req, res) => {
//     //     const cursor = usersCollection.find({});
//     //     const users = await cursor.toArray();
//     //     res.json(users);

//     // })


//     // app.post('/users',async(req,res)=>{
//     //     const users = req.body; 
//     //      const result = await usersCollection.insertOne(users);
//     //      res.json(result);
      
//     //  })

//     //    //   single data get 

//     //    app.get('/users/:id', async (req, res) => {
//     //     const id= req.params.id;
//     //     const query ={_id: ObjectId(id)};
//     //     console.log('get id')
//     //     const result = await usersCollection.findOne(query);
//     //     res.json(result);
//     //   })


//     //  //Update

//     //   app.put('/users/:id', async (req, res) => {
//     //     const id = req.params.id;
//     //     const posts = req.body;
//     //     const filter = {_id: ObjectId(id)}
//     //     // const options = { upsert: true };
//     //     const updateDoc = {
//     //        $set: posts
            
//     //     };
//     //     const result = await usersCollection.updateOne(filter, updateDoc);
//     //     res.json(result);
//     //   });

//     //  // delete api 
  
//     //  app.delete('/users/:id',async(req,res)=>{
//     //     const id= req.params.id;
//     //     const query ={_id: ObjectId(id)};
//     //     const result = await usersCollection.deleteOne(query);
//     //     res.json(result);
//     //   })




//     // post (get,post, ,update,delete)

//     // app.get('/posts', async (req, res) => {
//     //     const cursor = postsCollection.find({});
//     //     const posts = await cursor.toArray();
//     //     res.json(posts);

//     // })


//     // app.post('/posts',async(req,res)=>{
//     //     const posts = req.body; 
//     //      const result = await postsCollection.insertOne(posts);
//     //      res.json(result);
      
//     //  })

//        //   single data get 

//       //  app.get('/posts/:id', async (req, res) => {
//       //   const id= req.params.id;
//       //   const query ={_id: ObjectId(id)};
//       //   console.log('get id')
//       //   const result = await postsCollection.findOne(query);
//       //   res.json(result);
//       // })


//      //Update

//       // app.put('/posts/:id', async (req, res) => {
//       //   const id = req.params.id;
//       //   const posts = req.body;
//       //   const filter = {_id: ObjectId(id)}
//       //   // const options = { upsert: true };
//       //   const updateDoc = {
//       //      $set: posts
            
//       //   };
//       //   const result = await postsCollection.updateOne(filter, updateDoc);
//       //   res.json(result);
//       // });

//      // delete api 
  
//     //  app.delete('/posts/:id',async(req,res)=>{
//     //     const id= req.params.id;
//     //     const query ={_id: ObjectId(id)};
//     //     const result = await postsCollection.deleteOne(query);
//     //     res.json(result);
//     //   })



//     // category (get,post, ,update,delete)

//     // app.get('/categories', async (req, res) => {
//     //     const cursor = categoriesCollection.find({});
//     //     const categories = await cursor.toArray();
//     //     res.json(categories);

//     // })


//     // app.post('/categories',async(req,res)=>{
//     //     const categories = req.body; 
//     //      const result = await categoriesCollection.insertOne(categories);
//     //      res.json(result);
      
//     //  })

//     //    //   single data get 

//     //    app.get('/categories/:id', async (req, res) => {
//     //     const id= req.params.id;
//     //     const query ={_id: ObjectId(id)};
//     //     console.log('get id')
//     //     const result = await categoriesCollection.findOne(query);
//     //     res.json(result);
//     //   })


//     //  //Update

//     //   app.put('/categories/:id', async (req, res) => {
//     //     const id = req.params.id;
//     //     const categories = req.body;
//     //     const filter = {_id: ObjectId(id)}
//     //     // const options = { upsert: true };
//     //     const updateDoc = {
//     //        $set: categories
            
//     //     };
//     //     const result = await categoriesCollection.updateOne(filter, updateDoc);
//     //     res.json(result);
//     //   });

//     //  // delete api 
  
//     //  app.delete('/categories/:id',async(req,res)=>{
//     //     const id= req.params.id;
//     //     const query ={_id: ObjectId(id)};
//     //     const result = await categoriesCollection.deleteOne(query);
//     //     res.json(result);
//     //   })
  


    
//     } finally {
//       // Ensures that the client will close when you finish/error
//       // await client.close();
//     }
//   }

  // run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server Running')
  });
  


  app.use((err,req, res,next) =>{
   
    if(res.headersSent){
      next('there is problem')
    }
    else{

      if(err.message){
        res.status(500).json(err.message)
      }
      else{
        res.status(500).json({'message':'there is an error'})
      }
    }
   
   
  })


  mongoose.connection.once('open',()=>{

    console.log("connect to mongo");
    app.listen(port, () => {
      console.log(`listening at ${port}`)
    })
  })