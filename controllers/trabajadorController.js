'use strict';
const Trabajador = require('../db/models/trabajador.js');


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