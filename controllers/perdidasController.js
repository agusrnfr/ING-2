
const session = require('express-session');
const User = require('../db/models/user.js');
const Mascota = require('../db/models/mascota');

const mostrarPerdidas = async(req, res) => {
    return res.render('../views/perdidas', { session })
}

const mostrarFormularioPerdida = async(req, res) => {
    const usuario = await User.findByPk(session.usuario.id)
    const mascotas = await usuario.getMascotas()
    return res.render('../views/crear_publicacion_perdida', { session , mascotas })
}

const generarPublicacionPerdida = async(req, res) => {
    res.send('Publicacion de perdida generada')
}

module.exports = {
    mostrarPerdidas,
    mostrarFormularioPerdida,
    generarPublicacionPerdida,
}