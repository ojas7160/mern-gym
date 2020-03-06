const multer = require('multer');

const MIME_TYPE_ARRAY = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(req)
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(' ').join('-')
    const ext = MIME_TYPE_ARRAY[file.mimetype];
    callback(null, name.split('.jpg')[0] + '_' + Date.now() + '.' + ext);
  }
})

module.exports = (multer({storage: storage}).single('file'));