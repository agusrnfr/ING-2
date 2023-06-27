'use strict';
const Trabajador = require('../db/models/trabajador.js');
const session = require('express-session');

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
      numPagesGuarderias,
      numPagesOtrosTrabajadores,
    });
  }
  else{
  res.render('trabajadores', {
    guarderias,
    otrosTrabajadores,
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
  if (trabajadores.length === 0) {
    return res.send('No hay trabajadores cargados');
  }
  const trabajadoresOrdenados = ordenarTrabajadoresPorEstado(trabajadores);
  const otrosTrabajadores = filtroTrabajadores(trabajadoresOrdenados);

  res.render('paseadores', {otrosTrabajadores, session: session })
}

const mostrarGuarderias = async(req,res) => {
  const trabajadores = await Trabajador.findAll();
  if (trabajadores.length === 0) {
    return res.send('No hay trabajadores cargados');
  }
  const trabajadoresOrdenados = ordenarTrabajadoresPorEstado(trabajadores);
  const guarderias = filtroGuarderias(trabajadoresOrdenados);

  res.render('guarderias',{guarderias, session: session })
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
  
      res.json({ success: true }); // Envía una respuesta JSON indicando que el cambio de estado se realizó correctamente
    } catch (error) {
      console.error(error);
      res.json({ success: false }); // Envía una respuesta JSON indicando que hubo un error al cambiar el estado
    }
  } else {
    res.json({ success: false }); // Envía una respuesta JSON indicando que el usuario no es el dueño de la publicación
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
};