'use strict';
const { sequelize, Sequelize } = require('../models');
const { Model } = require('sequelize');
const { DataTypes } = require("sequelize");
const Trabajador = require('../models/trabajador.js')(sequelize, Sequelize.DataTypes);


const mostrarTrabajadores = async(req,res) =>{
  const data = await getAllTrabajadoresDisponibles()
  if(data === null)
    res.send('no hay trabajadores cargados :(')
  res.render('trabajadores',{ data })
}

function getAllTrabajadores(req, res) {
  const data = Trabajador.findAll();
  return data
}

function getAllTrabajadoresDisponibles(req, res) {
  const data = Trabajador.findAll()//({where:{disponibilidad:true}})
  return data
}

module.exports = {
  getAllTrabajadores,
  getAllTrabajadoresDisponibles,
  mostrarTrabajadores,
};