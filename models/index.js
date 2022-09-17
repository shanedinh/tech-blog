const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// sequelize associations go here

//post has a relation to user
//post has a relation to comment
//comment has a relation to user

// the correct relation code is up to you

// when an eport is surrounded by curly brakets they are called named exports. In order to require them in another file you must require them useing the specific exported name. It is not the same for defaut export nor exporting the entire file in one veriable
module.exports = {
  User,
  Comment,
  Post
};