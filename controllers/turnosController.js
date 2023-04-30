const { sequelize} = require('../models');

const mostrarTodosLosTurnos = async (req, res) => {
    const Turno = require('../models/turno.js')(sequelize)
    const data = await Turno.findAll();
    res.render('turnos_listado.ejs', {data});
};

module.exports = {
    mostrarTodosLosTurnos,
};
