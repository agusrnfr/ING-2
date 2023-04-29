const { sequelize, Sequelize } = require('../models');
const Turno = require('../models/turno.js')(sequelize);
const session = require('express-session');

const mostrarTodosLosTurnos = async (req, res) => {
    const data = await Turno.findAll();
    res.render('turnos_listado.ejs', {data});
};

module.exports = {
    mostrarTodosLosTurnos,
};
