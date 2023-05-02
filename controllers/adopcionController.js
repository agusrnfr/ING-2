const Adopcion = require('../db/models/adopcion.js');
const session = require('express-session');

const mostrarAdopciones = async (req, res) => {
    try {
      const data = await Adopcion.findAll()
      if(data.length === 0) {
        res.send('No hay publicaciones cargadas.')
      } else {
        res.render('adopciones', { data })
      }
    } catch (error) {
      console.error(error)
      res.send('Hubo un error al cargar las publicaciones de adopción.')
    }
}

module.exports = {
    mostrarAdopciones,
}