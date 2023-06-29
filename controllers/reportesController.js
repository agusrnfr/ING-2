//const Adopciones = require('../db/models/adopciones.js');
const Historial = require('../db/models/historial.js');

const mostrarReportes = async(req, res) => {
    //acordarse de incluir eliminadas
    const historial = await Historial.findAll()
    //const adopciones = await Adopciones.findAll()
    return res.render('../views/reportes', { practicas: historial.dataValues })
  }

  module.exports = {
      mostrarReportes
  }