const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// sequelize associations go here

//post has a relation to user
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//post has a relation to comment
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//comment has a relation to user
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});
// the correct relation code is up to you

// when an eport is surrounded by curly brakets they are called named exports. In order to require them in another file you must require them useing the specific exported name. It is not the same for defaut export nor exporting the entire file in one veriable
module.exports = {
  User,
  Comment,
  Post,
};
