const { sequelize, Sequelize } = require('../models');

const mostrarTodosLosTurnos = async (req, res) => {
    const Turno = require('../models/turno.js')(sequelize)
    const User = require('../models/user.js')(sequelize)
    const Mascota = require('../models/mascota.js')(sequelize)
    const data = await Turno.findAll({
        raw: true,
        attributes: { include: ['UserId', 'MascotumId'] },
    })
        .catch(error => {
            console.log(error);
        });
    console.log(data);
    res.render('turnos_listado.ejs', { data });
};

module.exports = {
    mostrarTodosLosTurnos,
}