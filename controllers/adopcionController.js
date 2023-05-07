const Adopcion = require('../db/models/adopcion.js');

const session = require('express-session');

const mostrarAdopciones = async (req, res) => {
    try {
      const data = await Adopcion.findAll()
      const esDuenio = session.usuario && session.usuario.tipo === 'duenio';
      if(data.length === 0) {
        res.send('No hay publicaciones cargadas.')
      } else {
        res.render('adopciones', { data , esDuenio , session: session})
      }
    } catch (error) {
      console.error(error)
      res.send('Hubo un error al cargar las publicaciones de adopción.')
    }
}

const esDuenio = async (req, res) => {
  const publicacionId = req.params.id;
  const usuarioId = session.usuario.id; 
  
  const publicacion = await Publicacion.findOne({
    where: {
      id: publicacionId,
      userid: usuarioId
    }
  });

  if (publicacion) {
    // el usuario es el dueño de la publicación
    res.send(true);
  } else {
    // el usuario no es el dueño de la publicación
    res.send(false);
  }
}

const cambiarEstado = async (req, res) => {
  const publicacionId = req.params.id;
  const usuarioId = req.session.UserId;
  
  // Verificar si el usuario es el dueño de la publicación
  const publicacion = await Adopcion.findOne({
    where: {
      id: publicacionId,
      UserId: usuarioId
    }
  });
  
  if (publicacion) {
    // Actualizar el estado de adopción de la publicación
    await Adopcion.update(
      { se_adopto: !publicacion.se_adopto },
      { where: { id: publicacionId } }
    );

    res.send(true);
  } else {
    res.send(false);
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
  const caracteristicas = req.body.caracteristicas;
  const mail= session.usuario.mail;
  const tel = session.usuario.tel; //se va a llenar con el email y tel de cliente
  const id = session.usuario.id;
  const se_adopto = false;


  if(!nombre || !edad || !raza || !color || !sexo || !origen || !vacunas || !caracteristicas ){
      console.error('Error al crear publicación,campos incompletos');
      return
  }

  
  Adopcion.create({
      nombre:nombre,
      vacunas:vacunas,
      edad:edad,
      sexo: sexo,
      origen:origen,
      caracteristicas:caracteristicas,
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
  
}