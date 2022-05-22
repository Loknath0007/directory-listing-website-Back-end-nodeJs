const express = require('express');
// const fileUpload = require('../controllers/fileUploadController')
const { upload } = require('../middlewares/products/fileUplaod');

const router = express.Router();

const path = require('path');
const fs = require('fs');

// const mongoose = require("mongoose");
var imageModel = require('../model/Images');

router.post('/image', upload.single('image'), (req, res, next) => {
  var obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + '../uploads/' + req.file.filename)
      ),
      contentType: 'image/jpg',
    },
  };
  imageModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.send('uploaded');
    }
  });
  // res.send('upload ok')
});

module.exports = router;
