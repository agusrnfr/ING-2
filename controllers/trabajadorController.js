'use strict';
const Trabajador = require('../db/models/trabajador.js');
const session = require('express-session');
const { Op } = require('sequelize');

const guardarTrabajador = (req, res) => {
  const nombre = req.body.nombre;
  const email = req.body.email;
  const servicios = Array.isArray(req.body.servicio) ? [...req.body.servicio] : [req.body.servicio];
  const servicio = servicios.join(',');
  const zona = req.body.zona;
  const estado = req.body.estado;

  if (!nombre || !email|| !servicio || !zona) {
    console.error('Error al guardar trabajador, campos incompletos');
    return;
  }

  Trabajador.create({
    nombre: nombre,
    email: email,
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


const mostrarCargaTrabajador = (req,res) => {
  res.render('cargar_trabajador')
}

const mostrarTrabajadores = async (req, res) => {
  try{
  const trabajadores = await getAllTrabajadoresDisponibles();
  const trabajadoresOrdenados = ordenarTrabajadoresPorServicio(trabajadores);
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

function ordenarTrabajadoresPorServicio(trabajadores) {
  return trabajadores.sort((a, b) => {
    const serviciosA = a.servicio.split(',').map(servicio => servicio.trim().toLowerCase());
    const serviciosB = b.servicio.split(',').map(servicio => servicio.trim().toLowerCase());

    const ordenServicio = {
      cuidador: 1,
      paseador: 2,
      'cuidador,paseador': 3
    };

    const estadoA = a.estado ? 1 : 0;
    const estadoB = b.estado ? 1 : 0;

    if (estadoA === estadoB) {
      // Ambos tienen el mismo estado, se verifica el estado "disponible" o "no disponible"
      if (estadoA === 1) {
        // Ambos están disponibles, se procede a comparar los servicios
        if (serviciosA.length === 1 && serviciosB.length === 1) {
          // Ambos tienen solo un rol, se ordenan por el orden definido en el objeto ordenServicio
          return ordenServicio[serviciosA[0]] - ordenServicio[serviciosB[0]];
        } else if (serviciosA.length === 1) {
          // A tiene solo un rol, se coloca antes que B
          return -1;
        } else if (serviciosB.length === 1) {
          // B tiene solo un rol, se coloca antes que A
          return 1;
        } else {
          // Ambos tienen ambos roles, se ordenan por el orden definido en el objeto ordenServicio
          return ordenServicio[serviciosA[0]] - ordenServicio[serviciosB[0]];
        }
      } else {
        // Ambos están no disponibles, se mantiene el orden actual
        return 0;
      }
    } else {
      // Diferentes estados, se coloca al final el estado "no disponible"
      return estadoB - estadoA;
    }
  });
}

const mostrarPaseadores = async(req,res) => {
  const trabajadores = await Trabajador.findAll();
  const trabajadoresOrdenados = ordenarTrabajadoresPorServicio(trabajadores);
  const otrosTrabajadores = filtroTrabajadores(trabajadoresOrdenados);

  res.render('paseadores', {otrosTrabajadores, session: session })
}

const mostrarGuarderias = async(req,res) => {
  const trabajadores = await Trabajador.findAll();
  const trabajadoresOrdenados = ordenarTrabajadoresPorServicio(trabajadores);
  const guarderias = filtroGuarderias(trabajadoresOrdenados);

  res.render('guarderias',{guarderias, session: session })
}

const mostrarGuarderiasFiltradasPorZona = async(req,res) => {
  const trabajadores = await Trabajador.findAll({
    where: { zona : req.body.zona  },
  });
  const trabajadoresOrdenados = ordenarTrabajadoresPorServicio(trabajadores);
  const guarderias = filtroGuarderias(trabajadoresOrdenados);

  res.render('guarderias',{guarderias, session: session })
}

const mostrarPaseadoresFiltradosPorZona = async(req,res) => {
  const trabajadores = await Trabajador.findAll({
    where: { zona : req.body.zona  },
  });
  const trabajadoresOrdenados = ordenarTrabajadoresPorServicio(trabajadores);
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
  mostrarGuarderiasFiltradasPorZona,
  mostrarPaseadoresFiltradosPorZona,
};