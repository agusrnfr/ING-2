'use strict';
const Trabajador = require('../db/models/trabajador.js');

const mostrarCargaTrabajador = (req,res) => {
  res.render('cargar_trabajador')
}

const guardarTrabajador = (req, res) => {
  const nombre = req.body.nombre;
  const servicios = Array.isArray(req.body.servicio) ? [...req.body.servicio] : [req.body.servicio];
  const servicio = servicios.join(',');
  const zona = req.body.zona;
  const estado = req.body.estado;

  if (!nombre || !servicio || !zona) {
    console.error('Error al guardar trabajador, campos incompletos');
    return;
  }

  Trabajador.create({
    nombre: nombre,
    servicio: servicio,
    zona: zona,
    estado: estado,
  })
    .then((Trabajador) => {
      res.render('cargar_trabajador', {
        alert: true,
        alertTitle: 'Trabajador cargado exitosamente',
        alertMessage: '',
        alertIcon: 'success',
        showConfirmButton: false,
        timer: 1500,
        ruta: 'cargar_trabajador',
      });
    })
    .catch((error) => {
      console.error('Error al crear trabajador:', error);
      res.render('cargar_trabajador', {
        alert: true,
        alertTitle: 'Registro de trabajador fallido',
        alertMessage: '',
        alertIcon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
    });
};

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
  mostrarCargaTrabajador,
  guardarTrabajador,
};