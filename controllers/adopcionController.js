const { error } = require('jquery');
const Adopcion = require('../db/models/adopcion.js');

const session = require('express-session');

const mostrarAdopciones = async (req, res) => {
    try {
      const data = await Adopcion.findAll()
      const esDuenio = session.usuario && session.usuario.tipo === 'duenio';

      if(data.length === 0) {
        res.send('No hay publicaciones de adopción disponibles.')
      } else {
        res.render('adopciones', { data , esDuenio , session: session , adopcionId: data[0].id})
      }
    } catch (error) {
      console.error(error)
      res.send('Hubo un error al cargar las publicaciones de adopción.')
    }
}


//Devuelve si es el dueño de la publicacion
const esDuenio = async (req, res) => {
  const adopcionId = req.params.id;
  const usuarioId = session.usuario.id; 

  console.log('adopcionId:', adopcionId);
  console.log('usuarioId:', usuarioId);
  
  const publicacion = await Adopcion.findOne({
    where: {
      id: adopcionId,
      userid: usuarioId
    }
  });

  if (publicacion) {
    res.send(true); // El usuario es el dueño de la publicación
  } else {
    res.send(false); // El usuario no es el dueño de la publicación
  }
}

  const resultado = async (req, res) => {
   const adopcion = await Adopcion.findByPk(req.params.id);
   const esDuenio = req.esDuenio; // Obtener el valor de req.esDuenio
   res.render('adopciones', { adopcion, esDuenio }); // Enviar resultados a la plantilla
  };


const cambiarEstado = async (req, res) => {
  const adopcionId = req.body.id;
  const usuarioId = session.usuario.id;

  console.log('adopcionId:', adopcionId);
  console.log('usuarioId:', usuarioId);
  
  // Verificar si el usuario es el dueño de la publicación
  const adopcion = await Adopcion.findOne({
    where: {
      id: adopcionId,
      UserId: usuarioId
    }
  });
  
  if (adopcion) {
    // Actualizar el estado de adopción de la publicación
    await Adopcion.update(
      { se_adopto: !adopcion.se_adopto },
      { where: { id: adopcionId } }
    );

    res.send(true);
    console.log('Se cambio el estado')
  } else {
    res.send(false);
    console.log('No se cambio el estado :(')
  }
}

const mostrarPublicacion = (req, res) => {

    res.render('publicacion')
}

//Guarda publicacion de adopcion
const guardarPublicacion = async (req, res) => {    
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const raza = req.body.raza;
  const color = req.body.color;
  const sexo = req.body.sexo;
  const origen = req.body.origen;
  const vacunas = req.body.vacunas;
  const mail= session.usuario.mail;
  const tel = session.usuario.tel; //se va a llenar con el email y tel de cliente
  const id = session.usuario.id;
  const se_adopto = false;


  if(!nombre || !edad || !raza || !color || !sexo || !origen || !vacunas ){
      console.error('Error al crear publicación,campos incompletos');
      return
  }

  
  Adopcion.create({
      nombre:nombre,
      vacunas:vacunas,
      edad:edad,
      sexo: sexo,
      origen:origen,
      mail:mail,
      tel: tel,
      se_adopto: se_adopto,
      raza: raza,
      color: color,
      UserId: id,
  
  })
  .then( Adopcion => {
      res.render('publicacion',{
          alert:true,
          alertTitle:"Publicación exitosa",
          alertMessage:"",
          alertIcon:"success",
          showConfirmButton:false,
          timer:1500,
      })
  })

  .catch(error => {
    console.error(error);
      res.render('publicacion',{
          alert:true,
          alertTitle:"Publicacion fallida",
          alertMessage:"",
          alertIcon:"error",
          showConfirmButton:false,
          timer:2000,
      })
  });
  
}



module.exports = {
    mostrarAdopciones,
    esDuenio,
    cambiarEstado,
    mostrarPublicacion,
    guardarPublicacion,
    resultado,
  
}