'use strict';
const { sequelize, Sequelize } = require('../models');
const { Model } = require('sequelize');
const { DataTypes } = require("sequelize");
const Paseador = require('../models/paseador.js')(sequelize, Sequelize.DataTypes);


function getAllPaseadores(req, res) {
  // Código para obtener todos los usuarios
  const data = Paseador.findAll();
  return data
}

module.exports = {
  getAllPaseadores
};