//const Adopciones = require('../db/models/adopciones.js');
const Historial = require('../db/models/historial.js');
const User = require('../db/models/user.js');
const Adopciones = require('../db/models/adopcion.js');
const { Sequelize } = require('sequelize');
const moment = require('moment');
const session = require('express-session');

const mostrarReportes = async(req, res) => {
    return res.render('../views/reportes', {mostrarPagina: 1, session})
}



const generarReporte = async(req, res) => {
    const año = req.body.fecha_name.split("-")[0];
    const mes = req.body.fecha_name.split("-")[1];

    const fecha = new Date(2023, req.body.fecha_name.split("-")[1] - 1);
    const mes_elegido = fecha.toLocaleString('es-ES', { month: 'long' });
    
    //el unscoped es para incluir eliminados
    const historial = await Historial.unscoped().findAll({
        where: Sequelize.and(
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('fecha')), mes),
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('fecha')), año)
          )
      });
      const data = await Promise.all(historial.map(async (historial) => {
        const fechaHoraZonaHoraria = moment.tz(historial.fecha, 'America/Argentina/Buenos_Aires');
        const monto_total = historial.monto_abonado - historial.monto_beneficio;
        const cliente = await User.findByPk(historial.UserId);
        return {
          fecha: fechaHoraZonaHoraria.format('DD/MM/YYYY'),
          practica: historial.practica,
          cliente: cliente.name,
          monto_total: monto_total,
          monto_beneficio: historial.monto_beneficio,
          monto_abonado: historial.monto_abonado,
        };
      }));

    return res.render('../views/reportes', { historiales: data , mes_elegido, mostrarPagina: 1})
}

const generarReporteAdopciones = async(req, res) => {
  const año = req.body.fecha_name_adopciones.split("-")[0];
  const mes = req.body.fecha_name_adopciones.split("-")[1];

  const fecha = new Date(2023, req.body.fecha_name_adopciones.split("-")[1] - 1);
  const mes_elegido = fecha.toLocaleString('es-ES', { month: 'long' });

  const adopciones = await Adopciones.unscoped().findAll({
    where: Sequelize.and(
      {
        se_adopto: true, // Filtrar los registros con se_adopto en true
        fecha_adopcion: {
          [Sequelize.Op.and]: [
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('fecha_adopcion')), mes),
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('fecha_adopcion')), año)
          ]
        }
      }
    )
  });
  
  return res.render('../views/reportes', { adopciones , mes_elegido , mostrarPagina: 2})
}

  module.exports = {
      mostrarReportes,
      generarReporte,
      generarReporteAdopciones,
  }