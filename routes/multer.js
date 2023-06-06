const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/profile_pets'); // Donde se guardan
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now()); // Para que no se repitan
  }
});

module.exports = multer({ storage });