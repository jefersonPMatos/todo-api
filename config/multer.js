const multer = require('multer');
const { v4 } = require('uuid');

const uploadPath = 'public/uploads';

module.exports = {
  uploadPath,

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    
    filename: (req, file, cb) => {
      cb(null, `${v4()} - ${file.originalname}`);
    }    
  })
}