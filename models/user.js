const { DataTypes, Model } = require('sequelize');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    user: Sequelize.STRING,
    name: Sequelize.STRING,
    rol:  Sequelize.STRING,
    pass: Sequelize.STRING
    }, { sequelize, modelName: 'user' });

  // Define tus métodos de modelo personalizados aquí
  User.crear = function() {
    console.log('Hola, soy un usuario de la base de datos');
  };

  return User;
};