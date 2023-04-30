const mostrarTodosLosTurnos = async (req, res) => {
    const { sequelize, Sequelize, } = require('../models');
    const Turno = require('../models/turno.js')(sequelize)
    //const User = require('../models/user.js')(sequelize)
    const data = await Turno.findAll({
        raw: true,
        attributes: ['id', 'fecha','banda_horaria',, 'estado', 'UserId', 'MascotumId'],
      })
       // .then (turnos => User.findByPk(turnos.UserId))
        .catch(error => {
            console.log(error);
        });
    console.log(data);
    res.render('turnos_listado.ejs', { data });
};

module.exports = {
    mostrarTodosLosTurnos,
}
