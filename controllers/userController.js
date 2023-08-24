'use strict';
const User = require('../db/models/user.js');
const { Op } = require('sequelize');
const session = require('express-session');

/**
 * Muestra la tabla de usuarios
 * excluyendo los admines
 */
const mostrarTablaUsers = async (req, res) => {    
  const data = await User.findAll({
    where: { rol: 'cliente' }
  });
  res.render('../views/table_usuarios.ejs', {data , session})
}

/**
 * Filtrar
 * Esta funcion aun no esta disponible -no usar-
 */
const filtrar = async (req, res) => {
  const ingresado = req.body.searchTerm;
  
  if (!ingresado) {   //campos incompletos, muestro todos los usuarios
    const data = await User.findAll();
    res.render('../views/table_usuarios.ejs', { data })
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