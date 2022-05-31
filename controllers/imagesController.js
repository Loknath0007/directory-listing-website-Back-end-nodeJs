const asyncHandler = require("../middlewares/async");

// upload images
exports.uploadImages = asyncHandler(async (req, res, next) => {
  console.log(req.files, "all is ok");

  res.send("Images Upload successfully");
});

exports.getImages = asyncHandler(async (req, res, next) => {
  console.log("req");
});
