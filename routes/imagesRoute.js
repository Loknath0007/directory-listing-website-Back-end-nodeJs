const express = require("express");
const router = express.Router();

const { uploadImages, getImages } = require("../controllers/imagesController");
const { upload } = require("../middlewares/products/fileUplaod");

router
  .route("/images")
  .get(getImages)
  .post(upload.array("images", 5), uploadImages);

module.exports = router;
