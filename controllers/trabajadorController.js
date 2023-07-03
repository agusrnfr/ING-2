'use strict';
const Trabajador = require('../db/models/trabajador.js');
const session = require('express-session');
const { Op } = require('sequelize');

const guardarTrabajador = (req, res) => {
  const nombre = req.body.nombre;
  const email = req.body.email;
  const servicio= req.body.servicio;
  const zona = req.body.zona;
  const estado = true;
  const diasArray = Array.isArray(req.body.dia) ? [...req.body.dia] : [req.body.dia];
  const dias = diasArray.join(',');
  const horaInicio = req.body.horaInicio;
  const horaFin = req.body.horaFin;

  const horario= horaInicio+ ','+ horaFin;

  if (!nombre || !email|| !servicio || !zona ) {
    console.error('Error al guardar trabajador, campos incompletos');
    return;
  }

  Trabajador.create({
    nombre: nombre,
    email: email,
    servicio: servicio,
    zona: zona,
    estado: estado,
    dias: dias,
    horario: horario,
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
      console.log(error);
      res.render('cargar_trabajador', {
        alert: true,
        alertTitle: 'Registro de trabajador fallido',
        alertMessage:'',
        alertIcon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
    });
};

let trabajadores = [];

async function obtenerTrabajadores() {
  trabajadores = await Trabajador.findAll();
  return trabajadores;
}

// Muestra de vistassss <3
const mostrarCargaTrabajador = (req,res) => {
  res.render('cargar_trabajador')
}

const mostrarTrabajadores = async (req, res) => {
  try{
  const trabajadores = await getAllTrabajadoresDisponibles();
  const trabajadoresOrdenados = ordenarTrabajadoresPorEstado(trabajadores);
  const guarderias = filtroGuarderias(trabajadoresOrdenados);
  const otrosTrabajadores = filtroTrabajadores(trabajadoresOrdenados);
  
  const numPagesGuarderias = Math.ceil(guarderias.length / 4);
  const numPagesOtrosTrabajadores = Math.ceil(otrosTrabajadores.length / 4);
  if (trabajadores.length === 0) {
    res.render('trabajadores',{
      guarderias,
      otrosTrabajadores,
      session: session,
      numPagesGuarderias,
      numPagesOtrosTrabajadores,
    });
  }
  else{
  res.render('trabajadores', {
    guarderias,
    otrosTrabajadores,
    session: session,
    numPagesGuarderias,
    numPagesOtrosTrabajadores,
  });
}
  }
  catch (error){
    console.error(error);
    res.send('Hubo un error al cargar las publicaciones de servicios de trabajo.');
  }
};

const mostrarGuarderiasFiltradas = async (req, res, guarderiasFiltradas) => {
  try {
    if (guarderiasFiltradas.length === 0) {
      return res.send('No hay guarderías disponibles en esta zona.');
    }

    res.render('guarderias', { guarderias: guarderiasFiltradas, session: session });
  } catch (error) {
    console.error('Error al obtener las guarderías:', error);
    res.send('Ocurrió un error al obtener las guarderías');
  }
};

//Filtrado
const mostrarFiltrado = async (req, res) => {
  const zonaSeleccionada = req.query.zona;
  const usuario = req.query.usuario;

  let resultadosFiltrados;

  if (trabajadores.length === 0) {
    await obtenerTrabajadores();
  }

  if (usuario === 'Guarderia') {
    guarderia = filtroGuarderias(trabajadores);
    resultadosFiltrados = filtroZona(guarderia,zonaSeleccionada)
    mostrarGuarderiasFiltradas(req, res, resultadosFiltrados, true, session);

  } else {
    paseadores = filtroTrabajadores(trabajadores);
    resultadosFiltrados = filtroZona(paseadores,zonaSeleccionada)
    mostrarPaseadores(res, resultadosFiltrados, true)
  }
}

function filtroZona(trab , zona){
  const TrabporZona= trab.filter(trabajador => trabajador.zona === zona)
  return TrabporZona;
}

function filtroGuarderias(trabajadoresOrdenados){
  const guarderias = trabajadoresOrdenados.filter(trabajador => trabajador.servicio === 'Guarderia');
  return guarderias;
}

function filtroTrabajadores(trabajadoresOrdenados){
  const otrosTrabajadores = trabajadoresOrdenados.filter(trabajador => trabajador.servicio !== 'Guarderia');
return otrosTrabajadores;
}

async function getAllTrabajadoresDisponibles() {
  const trabajadores = await Trabajador.findAll ({ where: { estado: true } });
  return trabajadores;
}

function ordenarTrabajadoresPorEstado(trabajadores) {
  return trabajadores.sort((a, b) => {
    const estadoA = a.estado ? 1 : 0;
    const estadoB = b.estado ? 1 : 0;

    return estadoB - estadoA;
  });
}

const mostrarPaseadores = async(req,res) => {
  const trabajadores = await Trabajador.findAll();
  const trabajadoresOrdenados = ordenarTrabajadoresPorEstado(trabajadores);
  const otrosTrabajadores = filtroTrabajadores(trabajadoresOrdenados);

  res.render('paseadores', {otrosTrabajadores, session: session })
}

const mostrarGuarderias = async(req,res) => {
  const trabajadores = await Trabajador.findAll();
  const trabajadoresOrdenados = ordenarTrabajadoresPorEstado(trabajadores);
  const guarderias = filtroGuarderias(trabajadoresOrdenados);

  res.render('guarderias',{guarderias, session: session })
}

const mostrarGuarderiasFiltradasPorZona = async(req,res) => {
  const trabajadores = await Trabajador.findAll({
    where: { zona : req.body.zona  },
  });
  const trabajadoresOrdenados = ordenarTrabajadoresPorEstado(trabajadores);
  const guarderias = filtroGuarderias(trabajadoresOrdenados);

  res.render('guarderias',{guarderias, session: session })
}

const mostrarPaseadoresFiltradosPorZona = async(req,res) => {
  const trabajadores = await Trabajador.findAll({
    where: { zona : req.body.zona  },
  });
  const trabajadoresOrdenados = ordenarTrabajadoresPorEstado(trabajadores);
  const otrosTrabajadores = filtroTrabajadores(trabajadoresOrdenados);

  res.render('paseadores', {otrosTrabajadores, session: session })
}



const cambiarEstadoTrabajador = async (req, res) => {
  const trabajadorId = req.body.id;
  const trabajador = await Trabajador.findOne({
    where: {
      id: trabajadorId
    }
  });
  
  if (trabajador) {
    try {
      await Trabajador.update(
        { estado: !trabajador.estado },
        { where: { id: trabajadorId } }
      );
  
      res.json({ success: true }); 
    } catch (error) {
      console.error(error);
      res.json({ success: false }); 
    }
  } else {
    res.json({ success: false });
  }
}

module.exports = {
  getAllTrabajadoresDisponibles,
  mostrarTrabajadores,
  mostrarCargaTrabajador,
  guardarTrabajador,
  mostrarPaseadores,
  mostrarGuarderias,
  cambiarEstadoTrabajador,
  mostrarGuarderiasFiltradasPorZona,
  mostrarPaseadoresFiltradosPorZona,
  mostrarFiltrado,
};