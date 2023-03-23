/*'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  'login_s',
  'admin',
  '123',
   {
     host: 'localhost',
     dialect: 'mysql'
   }
 );

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

const User = sequelize.define("users", {
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pass: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

sequelize.sync().then(() => {
    console.log('User table created successfully!');
 
    User.create({
        user: "juan1",
        name: "Robert Cecil Martin",
        rol: "admin",
        pass: "123"
    }).then(res => {
        console.log(res)
    }).catch((error) => {
        console.error('Failed to create a new record : ', error);
    });
 
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 */