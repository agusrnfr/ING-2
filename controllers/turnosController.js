const Turno = require('../db/models/turno');
const Mascota = require('../db/models/mascota');
const User = require('../db/models/user');

const mostrarTodosLosTurnos = async (req, res) => {
    const turnos = await Turno.findAll({
        raw: true,
        include: [
            { model: Mascota, as: 'Mascotum', attributes: ['nombre'] },
            { model: User, as: 'User', attributes: ['name'] }]
    })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Error al devolver los resultados' });
        });
    const data = turnos.map(turno => {
        return {
            id: turno.id,
            fecha: turno.fecha,
            banda_horaria: turno.banda_horaria,
            estado: turno.estado,
            practica: turno.practica,
            createdAt: turno.createdAt,
            updatedAt: turno.updatedAt,
            UserId: turno.UserId,
            MascotumId: turno.MascotumId,
            nombre: turno['Mascotum.nombre'],
            user: turno['User.name']
        };
    });
    res.render('turnos_listado.ejs', { data });
};

module.exports = {
    mostrarTodosLosTurnos,
}
