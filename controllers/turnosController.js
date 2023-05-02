const Turno = require('../db/models/turno');
const Mascota = require('../db/models/mascota');
const User = require('../db/models/user');
const session = require('express-session');

const mostrarTodosLosTurnos = async (req, res) => {
    const turnos = await Turno.findAll({
        raw: true,
        include: [
            { model: Mascota, as: 'Mascotum', attributes: ['nombre'] },
            { model: User, as: 'User', attributes: ['name','mail'] }]
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
            UserId: turno.UserId,
            MascotumId: turno.MascotumId,
            nombre: turno['Mascotum.nombre'],
            user: turno['User.name'],
            mailUser: turno['User.mail'] 
        };
    }).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    res.render('turnos_listado.ejs', { data });
};

const mostrarMisTurnos = async (req, res) => {
    const turnos = await Turno.findAll({
        raw: true,
        include: { model: Mascota, as: 'Mascotum', attributes: ['nombre'] },
        where: { UserId: session.usuario.id }
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
            MascotumId: turno.MascotumId,
            nombre: turno['Mascotum.nombre'],
        };
    }).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    res.render('turnos_listado_cliente.ejs', { data });
};

        
module.exports = {
    mostrarTodosLosTurnos,
    mostrarMisTurnos,
}
