const multer = require("multer");

var fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/adImgaes');
  },
  filename: (req, file, cb) => {
    cb(null, +Date.now() + "-" + file.originalname);
  },
});



var upload = multer({
  storage: fileStorage,
  // fileFilter: (req, file, cb) => {
      
  // }
  // limits: { fileSize: 200 * 1024 * 1024 },
});

module.exports = {
  upload,
};
