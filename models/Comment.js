const { Sequelize, Model, DataTypes } = require('sequelize');
// sequeize documentation recommends to only require the specific parts of the sequelize library that you need
const sequelize = require('../config/config');
// config is the new place for the database connection in an MVC folder structure, sometimes the db folder will also be used.

class Comment extends Model {}

Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

module.exports = Comment;
