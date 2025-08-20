import multer from 'multer';
// multer is used to store file in local storage of serve adn then store it in cloudinary

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    // cb is a callback function that tells multer where to store the file
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // cb is a callback function that tells multer what to name the file
  }
})


export const upload = multer({ 
    storage, 
});