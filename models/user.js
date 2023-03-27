const { DataTypes, Model } = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    user: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pass: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rol: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    }, { sequelize, modelName: 'user' });


  return User;
};