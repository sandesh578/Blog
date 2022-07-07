const express = require('express');
const blogPostsRouter = require('./blogPostsRouter');
const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter');
const fileRouter = require('./fileRouter');

const Router = express.Router({ caseSensitive: true });

Router.use('/api/blogs/', blogPostsRouter);
Router.use('/api/auth/', registerRouter);
Router.use('/api/auth/', loginRouter);
Router.use('/api', fileRouter);

module.exports = Router;
