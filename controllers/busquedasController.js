const session = require('express-session');
const User = require('../db/models/user.js');
const Mascota = require('../db/models/mascota');
const Busqueda = require('../db/models/busqueda');
const { transporter } = require('../config/mailer');
const sequelize = require('../db/db');
const moment = require('moment');

const mostrarBusquedas = async(req, res) => {
    const busquedas = await Busqueda.findAll({
        order: [
          [sequelize.literal('NOT se_encontro'), 'DESC'],
          ['id', 'ASC'],
        ],
    });
    return res.render('../views/busquedas', { session , busquedas })
}

const mostrarFormularioBusqueda = async(req, res) => {
    return res.render('../views/crear_publicacion_busqueda', { session })
}

const generarPublicacionBusqueda = async(req, res) => {
    const usuario = await User.findByPk(session.usuario.id)
    if(!usuario){
        return res.send('no existe tu usuario')
    }
    const sexo = req.body.sexo;
    const edad = req.body.edad;
    const imagen = req.file.path.replace("public", "")//para q se guarde bien el path */
    const foto = imagen;
    const mail = req.body.mail;
    const caracteristicas = req.body.caracteristicas;
    const fecha_encuentro = req.body.fecha_encuentro;
    const telefono = req.body.telefono;
    const comportamiento = req.body.comportamiento;
    const zona = req.body.zona;

    const busquedas = await Busqueda.findAll({
        order: [
          [sequelize.literal('NOT se_encontro'), 'DESC'],
          ['id', 'ASC'],
        ],
    });

    try {
        await Busqueda.create({
            zona: zona,
            fecha_encuentro: fecha_encuentro,
            edad: edad,
            sexo: sexo,
            foto: foto,
            comportamiento: comportamiento,
            caracteristicas: caracteristicas,
            mail: mail,
            tel: telefono,
            se_encontro: false,
            UserId: session.usuario.id,
        });
        res.render('crear_publicacion_busqueda.ejs',{
            alert:true,
            alertTitle:"Publicacion creada",
            alertMessage:"",
            alertIcon:"success",
            showConfirmButton:false,
            timer:1500,
            session: session,
            ruta: 'busquedas',
            busquedas,
        })

    }
    catch (error) {
        console.log(error);
    }
}

const mostrarContactarBusqueda = async(req, res) => {
    res.render('../views/contactar_busqueda')
}

const contactarBusqueda = async(req, res) => {
}

const marcarBusquedaComoEncontrado = async(req, res) => {
    publicacionBusqueda = await Busqueda.findByPk(req.body.parametro1)
    if(!publicacionBusqueda){
        return res.send('No existe la publicacion')
    }
    publicacionBusqueda.se_encontro = true
    await publicacionBusqueda.save()
    return res.redirect('/busquedas')
}


module.exports = {
    mostrarBusquedas,
    mostrarFormularioBusqueda,
    generarPublicacionBusqueda,
    mostrarContactarBusqueda,
    contactarBusqueda,
    marcarBusquedaComoEncontrado,
}