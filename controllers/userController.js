'use strict';
const { sequelize, Sequelize } = require('../models');
const { Model } = require('sequelize');
const { DataTypes } = require("sequelize");
const User = require('../models/user.js')(sequelize, Sequelize.DataTypes);
const { Op } = require('sequelize');

/* function getAllUsers(req, res) {
  const data = User.findAll();
  return data
} */

const mostrarTablaUsers = async (req, res) => {    
  const data = await User.findAll();
  if (data.length === 0){
    res.send('No hay usuarios cargados :(')
  } 
  else {
      return res.render('../views/table.ejs', {data})
  }
}

const filtrar = async (req, res) => {
  const ingresado = req.body.searchTerm;

  //campos incompletos, muestro todos los usuarios
  if (!ingresado) {
    const data = await User.findAll();
    res.render('../views/table.ejs', { data })
    return
  }

  const data = await User.findAll({ //contains y or
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${ingresado}%` } },
        { mail: { [Op.like]: `%${ingresado}%` } }
      ]
    }
  });
  
  if (data.length === 0){
    res.send('No se encontraron resultados :(')
  } 
  else {
      return res.render('../views/table.ejs', { data })
  }
}


module.exports = {
  mostrarTablaUsers,
  filtrar
};