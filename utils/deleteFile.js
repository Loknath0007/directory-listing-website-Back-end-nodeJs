const fs = require('fs');
const ErrorResponse = require('./errorResponse');

module.exports = function deleteFile(images) {
  images.forEach((image) => {
    const filePath = `../${image}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        new ErrorResponse('Error deleting file', 500);
      }
    });
  });
};
