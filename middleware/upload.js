const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generate a unique suffix for the filename
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append the original file extension
  }
});

const upload = multer({ storage: storage });

module.exports = upload;

// This code sets up a multer storage configuration to handle file uploads in a Node.js application.