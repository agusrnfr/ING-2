const express = require('express');
const Sequelize = require("sequelize");


const sequelize = new Sequelize(
 'login_s',
 'admin',
 '123',
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