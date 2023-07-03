
const session = require('express-session');
const User = require('../db/models/user.js');
const Mascota = require('../db/models/mascota');
const Perdida = require('../db/models/perdida');

const mostrarPerdidas = async(req, res) => {
    const perdidas = await Perdida.findAll()
    return res.render('../views/perdidas', { session , perdidas })
}

const mostrarFormularioPerdida = async(req, res) => {
    const usuario = await User.findByPk(session.usuario.id)
    const mascotas = await usuario.getMascotas()
    return res.render('../views/crear_publicacion_perdida', { session , mascotas })
}

const generarPublicacionPerdida = async(req, res) => {
    res.send('Publicacion de perdida generada')
}

const mostrarContactarPerdida = async(req, res) => {
    if(session && session.usuario){
        return res.render('../views/contactar_perdida', { session })
    }
    return res.render('../views/contactar_perdida', { session: null })
}

const contactarPerdida = async(req, res) => {
}


module.exports = {
    mostrarPerdidas,
    mostrarFormularioPerdida,
    generarPublicacionPerdida,
    mostrarContactarPerdida,
    contactarPerdida,
}