const util = require('util');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

let storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/imagesUploads',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ['image/png', 'image/jpg', 'image/jpeg'];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-sandesh-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: 'photos',
      filename: `${Date.now()}-sandesh-${file.originalname}`
    };
  }
});
var uploadFiles = multer({ storage: storage }).single('file');
var upload = util.promisify(uploadFiles);
module.exports = upload;
