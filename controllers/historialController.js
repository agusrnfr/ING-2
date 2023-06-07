const { error } = require('jquery');
const Historial = require('../db/models/historial.js');
const session = require('express-session');
const Mascota = require('../db/models/mascota');
const User = require('../db/models/user');
const moment = require('moment');
const Libreta = require('../db/models/libreta.js');
const Beneficio= require('../db/models/beneficio.js');
const Turno = require('../db/models/turno')
//const puppeteer = require('puppeteer');


const getMonto = async (monto) => {
    try {
      const beneficio = await Beneficio.findOne({
        where: {
          monto_beneficio: monto
        }
      });
      return beneficio ? beneficio.monto_beneficio : null;
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener el monto del beneficio');
    }
  };

let data;

const mostrarHistorial = async (req, res) => {
    try {
      const usuario = await User.findByPk(req.params.id)
      const visitas = await Historial.findAll({
        raw: true,
        include: { model: Mascota, as: 'Mascotum', attributes: ['nombre'] },
        where: { UserId: usuario.id }
        
      });
  
      const dataPromises = visitas.map(async visita => {
        const fechaHoraZonaHoraria = moment.tz(visita.fecha, 'America/Argentina/Buenos_Aires');
        const montoBeneficio = await getMonto(visita.monto_beneficio);
        return {
          id: visita.id,
          fecha: fechaHoraZonaHoraria.format('DD/MM/YYYY HH:mm'),
          MascotumId: visita.MascotumId,
          nombre: visita['Mascotum.nombre'],
          practica: visita.practica,
          observacion: visita.observacion,
          monto_abonado: visita.monto_abonado,
          monto_beneficio: montoBeneficio,
        };
      });
  
      const data = await Promise.all(dataPromises);
  
      const sortedData = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      res.render('historial', { data: sortedData, session: session });
    }
    catch (error) {
        console.log(error);
        res.status(500).render('historial', { data: [] });
    };
};

const buscarMascotasCliente = async (id) => { // Busca las mascotas del cliente
    try {
        const mascotas = await Mascota.findAll({ raw: true, where: { UserId: id } });
        return mascotas;
    } catch (error) {
        console.log(error);
        throw new Error('Error al buscar las mascotas del cliente');
    }
};

const buscarBeneficios = async (id) => { // Busca los cupones del cliente
    try {
        const usuario = await User.findByPk(id)
        const beneficios =  await usuario.getBeneficios()
        return beneficios;
    } catch (error) {
        console.log(error);
        throw new Error('Error al buscar los cupones');
    }
};

const mostrarCarga = async(req,res) => { //Muestra el formulario para carga de visitas
    const turno = await Turno.findByPk(req.query.turno_id)
    let usuario = await User.findByPk(req.params.id)
try {
    const mascotaId = req.query.mascota;
    const mascota = await Mascota.findByPk(mascotaId);
    const nombreMascota = mascota ? mascota.nombre : '';
    let practica = req.query.practica || ''; // Obtener el valor del parámetro 'practica' o establecer un valor por defecto

    const beneficios= await buscarBeneficios(usuario.id);
    const mascotas = await buscarMascotasCliente(usuario.id);
    res.render('cargar_historial', { mascotas, usuario: usuario.dataValues, beneficios, nombreMascota, practica , turno });
    
}
catch (error) {
    console.log(error);
    res.status(500).render('cargar_historial', { mascotas: [] });
}
};


const crearHistorial = async (req, res) => {  //Crea un historial
    const fecha= new Date();
    const turno = await Turno.findByPk(req.query.turno_id)
    const mascota = await Mascota.findByPk(turno.MascotumId)
    const usuario = await User.findByPk(turno.UserId)
    if(!turno){
      console.error("Error: No se encontro el turno")
      return
    }
    if(!mascota){
      console.error("Error: No se encontro la mascota asociada al turno")
      return
    }
    if(!usuario){
      console.error("Error: no se encontro al usuario asociado al turno")
      return
    }
    turno.visitado = true; //sirve para deshabilitar el boton de registrar
    await turno.save();

    const practica = req.body.practica;
    const observacion = req.body.observacion;
    const monto = req.body.monto;
    const monto_b = req.body.monto_b;
    const id = req.params.id;
    const mascotas = await usuario.getMascotas()
    const beneficios = await usuario.getBeneficios();
    const beneficio = beneficios.find((b) => b.monto_beneficio == monto_b);
    if(beneficio){
      beneficio.usado = true;
      await beneficio.save();
    }

    if (global.PRACTICAS_QUE_GENERAN_LIBRETA.includes(practica)){
        crearLibreta(fecha,mascota,practica, id)
    }

    Historial.create({
        fecha: fecha,
        MascotumId: mascota.id,
        practica: practica,
        observacion: observacion,
        monto_abonado: monto,
        monto_beneficio:monto_b,
        UserId: id,   
    })
    
    .then( async Historial => {
      res.render('cargar_historial', {
        turno: turno,
        usuario: (usuario && usuario.dataValues) ? usuario.dataValues : null,
        mascotas: mascotas,
        beneficios,
        nombreMascota: mascota.name,
        practica,
        alert: true,
        alertTitle: "Registro de visita exitoso",
        alertMessage: "",
        alertIcon: "success",
        showConfirmButton: false,
        timer: 1500,
        ruta: 'turnos_dia',
      });
        const { crearTurnoBD } = require('./turnosController')
        if(practica === global.PRACTICA.VACUNA_A){
          const dosis_dadas_A = await Libreta.findAll({where:{ practica : global.PRACTICA.VACUNA_A }})
          if(dosis_dadas_A.length < 2){ //cuando llega aca ya se dio la dosis
            await crearTurnoBD(fecha, turno.banda_horaria, turno.practica, turno.UserId, mascota)
          }
        }
        if(practica === global.PRACTICA.VACUNA_B){
          const dosis_dadas_B = await Libreta.findAll({where:{ practica : global.PRACTICA.VACUNA_B }})
          if(dosis_dadas_B.length < 2){
            await crearTurnoBD(fecha, turno.banda_horaria, turno.practica, turno.UserId, mascota)
          }
        } 
    })
  
    .catch(error => {
      console.error("Error: en la carga de turno "+ error);
      })
  }

//Zona libreta baby

const mostrarLibreta = async (req, res) => {
  try {
      const mascotaId = req.params.id;
      const mascota = await Mascota.findByPk(mascotaId);

      if (!mascota) {
          // Si la mascota no se encuentra, puedes manejar el caso de error o redirigir a una página de error
          return res.render('error', { error: 'Mascota no encontrada' });
      }

      const libretas = await Libreta.findAll({
          raw: true,
          where: { MascotumId: mascotaId }, // Filtrar por el ID de la mascota
          include: { model: Mascota, as: 'Mascotum', attributes: ['nombre'] },
      });

      const data = libretas.map(libreta => {
          const fechaHoraZonaHoraria = moment.tz(libreta.fecha, 'America/Argentina/Buenos_Aires');
          return {
              id: req.params.id,
              fecha: fechaHoraZonaHoraria.format('DD/MM/YYYY HH:mm'),
              MascotumId: libreta.MascotumId,
              nombre: libreta['Mascotum.nombre'],
              practica: libreta.practica,
          };
      }).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      res.render('libreta_sanitaria', { data, mascota, session: session });
  } catch (error) {
      console.log(error);
      res.status(500).render('libreta_sanitaria', { data: [] });
  }
};


const crearLibreta = async(fecha, mascota, practica,id) =>{  //Crea la libreta
    try {
        await Libreta.create({
            fecha: fecha,
            practica: practica,
            MascotumId: mascota.id,
        });
        return true;

    } catch (error) {
        console.log(error);
        throw new Error('Error al crear la libreta');
    }
}

// const createPDF = async (req,res) => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     const id = req.params.id; 

//      const url = `http://localhost:3000/libreta_sanitaria/${id}`;
  
//     // Carga el contenido del archivo EJS en la página
//     // await page.goto('http://localhost:3000/libreta_sanitaria/:id', { waitUntil: 'networkidle0' });
  
//     // Genera el archivo PDF a partir del contenido de la página
//     // await page.pdf({ path: 'ruta/del/archivo.pdf', format: 'A4' });
  
//     // Cierra el navegador
//     await browser.close();
//   };
  
//   // Llama a la función para crear el PDF
//   createPDF();

  
module.exports = {
    mostrarHistorial,
    crearHistorial,
    mostrarCarga,
    mostrarLibreta,
}