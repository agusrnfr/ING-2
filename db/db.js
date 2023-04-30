const { Sequelize } = require('sequelize');
const { database } = require('../config/config.json');

const sequelize = new Sequelize(
  'veterinaria_db',
  'root',
  '',
   {
     host: 'localhost',
     dialect: 'mysql'
   }
 );

module.exports = sequelize;