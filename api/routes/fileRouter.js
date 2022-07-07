const Router = require('express').Router();
const upload = require('../middleware/upload');
const { catchErrors } = require('../utils/custom-helpers');
const MongoClient = require('mongodb').MongoClient;
const GridFSBucket = require('mongodb').GridFSBucket;
const mongoClient = new MongoClient('mongodb://localhost:27017', {
  useUnifiedTopology: true,
  useUnifiedTopology: true
});

Router.post(
  '/upload',
  catchErrors(async (req, res, next) => {
    try {
      await upload(req, res);
      const imageUrl = `http://localhost:5025/api/file/${req.file.filename}`;
      if (req.file == undefined) {
        return res.send({
          success: false,
          message: 'You must select a file.'
        });
      }
      return res.send({
        success: true,
        message: 'File has been uploaded.',
        file: imageUrl
      });
    } catch (error) {
      if (err.code == 'LIMIT_FILE_SIZE') {
        return res.status(500).send({
          success: false,
          message: 'File size cannot be larger than 2MB!'
        });
      }
      return res.send({
        success: false,
        message: `Error when trying upload image: ${error}`
      });
    }
  })
);

Router.get(
  '/files',
  catchErrors(async (req, res, next) => {
    try {
      await mongoClient.connect({
        useUnifiedTopology: true,
        useUnifiedTopology: true
      });
      const database = mongoClient.db('imagesUploads');
      const images = database.collection('photos' + '.files');
      const cursor = images.find({});
      if ((await cursor.count()) === 0) {
        return res.status(500).send({
          succes: false,
          message: 'No files found!'
        });
      }
      let fileInfos = [];
      await cursor.forEach((doc) => {
        fileInfos.push({
          name: doc.filename,
          url: 'http://localhost:5025/api/file/' + doc.filename
        });
      });
      return res.status(200).send({
        success: true,
        message: 'Images retrieved successfully',
        images: fileInfos
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message
      });
    }
  })
);

Router.delete(
  '/file/:filename',
  catchErrors(async (req, res, next) => {
    try {
      await mongoClient.connect({
        useUnifiedTopology: true,
        useUnifiedTopology: true
      });
      const database = mongoClient.db('imagesUploads');
      const images = database.collection('photos' + '.files');
      await images.deleteMany({ filename: req.params.filename });
      return res.status(200).send({
        success: true,
        message: 'Image deleted successfully'
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message
      });
    }
  })
);

Router.get(
  '/file/:filename',
  catchErrors(async (req, res, next) => {
    try {
      await mongoClient.connect({
        useUnifiedTopology: true,
        useUnifiedTopology: true
      });
      const database = mongoClient.db('imagesUploads');
      const bucket = new GridFSBucket(database, {
        bucketName: 'photos'
      });
      let downloadStream = bucket.openDownloadStreamByName(req.params.filename);
      downloadStream.on('data', function (data) {
        return res.status(200).write(data);
      });
      downloadStream.on('error', function (err) {
        return res
          .status(404)
          .send({ success: false, message: 'Cannot download the Image!' });
      });
      downloadStream.on('end', () => {
        return res.end();
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error.message
      });
    }
  })
);

module.exports = Router;
