'use strict';
const { sequelize, Sequelize } = require('../models');
const { Model } = require('sequelize');
const { DataTypes } = require("sequelize");
const Paseador = require('../models/paseador.js')(sequelize, Sequelize.DataTypes);


const mostrarPaseadores = async(req,res) =>{
  const data = await getAllPaseadoresDisponibles()
  res.render('paseadores',{ data })
}

function getAllPaseadores(req, res) {
  const data = Paseador.findAll();
  return data
}

function getAllPaseadoresDisponibles(req, res) {
  const data = Paseador.findAll({where:{disponibilidad:true}})
  return data
}

module.exports = {
  getAllPaseadores,
  getAllPaseadoresDisponibles,
  mostrarPaseadores,
};