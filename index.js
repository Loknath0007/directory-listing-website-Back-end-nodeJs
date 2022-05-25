const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");
const morgan = require('morgan');
const session = require('express-session');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');
// const sessoin = require('e')

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database
connectDB();

const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const fileFilter = (req, file, cb) => {
  // var ext = path.extname(file.originalname);
  const ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    return cb(new Error("Only images are allowed"));
  }
};

// const fileSize = parseInt(req.headers['content-length']);
//       if (fileSize > 1048576) {
//         callback(new Error('Please upload file less then 10Mb'));
//     }

var upload = multer({
  storage: storage,
  limits: { fileSize: 200 * 1024 * 1024 },
  // fileFilter:fileFilter
});

// const {upload} = require('./middlewares/products/fileUplaod')

const path = require("path");
const fs = require("fs");

var imageModel = require("./model/Images");

//multiple file problem
app.post(
  "/post/imageupload/:id",
  upload.array("images", 6),
  (req, res, next) => {
    var obj = {
      postId: req.params.id,
      name: req.body.name,
      desc: req.body.desc,
      img: {
        data: req.files.map((file) =>
          fs.readFileSync(path.join(__dirname + "/uploads/" + file))
        ),
        // data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.files.map(filename=>filename=filename))),
        contentType: "image/*",
      },
    };
    imageModel.create(obj, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        // item.save();
        res.send(item);
      }
    });
    res.send("upload ok");
  }
);

//Router
const authRouter = require("./routes/authRouter");
app.use("/api", authRouter);
const postRouter = require("./routes/postRouter");
app.use("/posts", postRouter);
const categoryRouter = require("./routes/categoryRouter");
app.use("/categories", categoryRouter);
const locationRouter = require("./routes/locationRouter");
app.use("/location", locationRouter);
const userRouter = require("./routes/userRoute");

app.use("/users", userRouter);
const fileUploadRouter = require("./routes/fileUploadRoute");
app.use("/post", fileUploadRouter);


app.get("/", (req, res) => {
  res.send("server Running");
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    next("there is problem");
  } else {
    if (err.message) {
      res.status(500).json(err.message);
    } else {
      res.status(500).json({ message: "there is an error" });
    }
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});