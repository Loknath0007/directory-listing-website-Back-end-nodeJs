const multer = require("multer");
const path = require("path");
const ErrorResponse = require("../utils/errorResponse");

// Create Upload Folder
const uploadFolder = "./assets";

// Define The Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    console.log("fileExt    is " + file);
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileName + fileExt);
  },
});

const uploadFile = multer({
  storage: storage,
  limits: {
    fileSize: 10000000, // 3MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new ErrorResponse("Only .jpg, .png or .jpeg format allowed!", 400));
    }
  },
});

module.exports = uploadFile;
