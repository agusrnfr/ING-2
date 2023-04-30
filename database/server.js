const express = require('express');
const Sequelize = require("sequelize");


const sequelize = new Sequelize(
 'veterinaria_db',
 'root',
 '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);



// Inicializar la aplicación de Express
const app = express();  

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });


