'use strict';
const { sequelize, Sequelize } = require('../models');
const { Model } = require('sequelize');
const { DataTypes } = require("sequelize");
const User = require('../models/user.js')(sequelize, Sequelize.DataTypes);


function getAllUsers(req, res) {
  // Código para obtener todos los usuarios
  const data = User.findAll();
  return data
}

module.exports = {
  getAllUsers 
};