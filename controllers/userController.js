'use strict';
const { sequelize, Sequelize } = require('../models');
const { Model } = require('sequelize');
const { DataTypes } = require("sequelize");
const User = require('../models/user.js')(sequelize, Sequelize.DataTypes);


function getAllUsers(req, res) {
  const data = User.findAll();
  return data
}

const mostrarTablaUsers = async (req, res) => {    
  const data = await getAllUsers()
  if(User === null){
      res.send('No hay usuarios cargados :(')
  } 
  else {
      return res.render('../views/table.ejs', {data})
  }
}



module.exports = {
  getAllUsers,
  mostrarTablaUsers,
};