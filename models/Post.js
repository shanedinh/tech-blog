const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// class simply allow methods and data to be packaged together and used elsewhere in our code
// setting up models as classes gives developers much scalability for our table to have added methods, which act on the model data, when our app functionality grows
class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  },
  {
    sequelize
  }
);

module.exports = Post;
