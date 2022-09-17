const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// http://localhost:3000/api/users
router.use('/user', userRoutes);
// http://localhost:3000/api/post
router.use('/post', postRoutes);
// http://localhost:3000/api/comment
router.use('/comment', commentRoutes);

module.exports = router;