const { DataTypes, Model } = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    user: Sequelize.STRING,
    name: Sequelize.STRING,
    rol:  Sequelize.STRING,
    pass: Sequelize.STRING
    }, { sequelize, modelName: 'user' });


  return User;
};