const Router = require('express').Router();
const Blog = require('../Modals/BlogPost');
const { catchErrors } = require('../utils/custom-helpers.js');
const { verify } = require('../controllers/verifyToken.js');

//create
Router.post(
  '/',
  // verify,
  catchErrors(async (req, res, next) => {
    if (/**req.user.isAdmin ||**/ true) {
      try {
        console.log(req.body);
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        console.log(savedBlog);
        return res.status(200).json({
          success: true,
          message: 'New Blog added successfully',
          savedBlog
        });
      } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to add new Blog'
      });
    }
  })
);

//update
Router.put(
  '/:id',
  // verify,
  catchErrors(async (req, res, next) => {
    if (req.user.isAdmin || true) {
      try {
        const updatedBlog = await Blog.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body
          },
          {
            new: true
          }
        );
        return res.status(200).json({
          success: true,
          message: 'New Blog updated successfully',
          updatedBlog
        });
      } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to update  Blog'
      });
    }
  })
);

//delete
Router.delete(
  '/:id',
  // verify,
  catchErrors(async (req, res, next) => {
    if (/**req.user.id === req.params.id ||**/ req.user.isAdmin || true) {
      try {
        await Blog.findByIdAndDelete(req.params.id);
        return res
          .status(200)
          .json({ success: true, message: 'Blog deleted successfully' });
      } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
      }
    } else {
      return res
        .status(403)
        .json({ success: false, message: 'You are not allowed to delete' });
    }
  })
);

//get
Router.get(
  'find/:id',
  // verify,
  catchErrors(async (req, res, next) => {
    try {
      const blog = await Blog.findById(req.params.id);
      return res
        .status(200)
        .json({ success: true, message: 'Blog fetched successfully', blog });
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  })
);

//get all
Router.get(
  '/',
  // verify,
  catchErrors(async (req, res, next) => {
    if (/**!req.user.isAdmin ||**/ true) {
      try {
        const blogs = await Blog.find();
        return res.status(200).json({
          success: true,
          message: 'Blogs fetched successfully',
          blogs: blogs.reverse()
        });
      } catch (e) {
        res.status(500).json({ success: false, message: e.message });
      }
    } else {
      res.status(403).json({
        success: false,
        message: 'You are not allowed to see all Blogs'
      });
    }
  })
);

module.exports = Router;
