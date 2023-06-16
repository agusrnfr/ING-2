const Turno = require('../db/models/turno');
const Mascota = require('../db/models/mascota');
const Cruza = require('../db/models/cruza');
const User = require('../db/models/user');
const session = require('express-session');
const { buscarMascotasCliente } = require('./turnosController');
const moment = require('moment');
const { transporter } = require('../config/mailer');

const mostrarIndexCruzas = async (req, res) => {
    const UserId = session.usuario.id;
    try {
        const mascotas = await buscarMascotasCliente(UserId);
        res.render('cruzas', { mascotas });
    }
    catch (error) {
        console.log(error);
        res.status(500).render('cruzas', { mascotas: [] });
    }
}

const publicarMascotaCruza = async (req, res) => {
    try {
        const mascota = await Mascota.findByPk(req.params.id);
        const usuario = await User.findByPk(session.usuario.id);

        res.render('publicar_cruza', { mascota, usuario });
    }
    catch (error) {
        console.log(error);
        res.status(500).render('publicar_cruza', { mascota: null, usuario: null });
    }
}

const verificacionesCruza = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { telefono, correo, fecha_celo } = req.body;
        const mascota = await Mascota.findOne({ where: { id: id } });
        if (!mascota) {
            return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('No se encontró mascota')}`);
        }
        const cruza = await Cruza.findOne({ where: { MascotumId: id } });
        if (cruza) {
            return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('Ya existe una publicación para esta mascota')}`);
        }
        if (!telefono){
            return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('Debe ingresar un teléfono')}`);
        }
        if (!correo){
            return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('Debe ingresar un correo')}`);
        }
        if (!fecha_celo){
            return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('Debe ingresar una fecha de celo')}`);
        }
        next(); // Si pasa todas las verificaciones, pasa a la siguiente función
    }
    catch (error) {
        return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('Error al conectar con la base de datos')}`);
    }  
}

const guardarPublicacionCruza = async (req, res) => {
    try {
        const { id } = req.params;
        const { texto_libre, telefono, correo, fecha_celo } = req.body;
        const mascota = await Mascota.findByPk(id);
        if (mascota) {
            await Cruza.create({
                texto_libre: texto_libre,
                tel: telefono,
                mail: correo,
                fecha_celo: fecha_celo,
                MascotumId: id,
                se_muestra: true,
            });
        }
        res.redirect(`/cruzas/publicacionGuardada?success=true&status=200&mensaje=${encodeURIComponent('Publicación exitosa')}`);
    }
    catch (error) {
        console.log(error);
        res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('Error al publicar')}`);
    }
}

    const publicacionGuardadaCruza = async (req, res) => { // Muestra la alerta de que se guardó correctamente el turno o que hubo un error
        const success = req.query.success;
        const mensajeDecodificado = decodeURIComponent(req.query.mensaje);
        const status = Number(req.query.status);
        const UserId = session.usuario.id;

        try {
            const mascotas = await buscarMascotasCliente(UserId);
            if (success == 'true') {
                res.status(status).render('cruzas', {
                    mascotas,
                    alert: true,
                    alertTitle: "Publicación exitosa",
                    alertMessage: mensajeDecodificado,
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
            else if (success == 'false') {
                res.status(status).render('cruzas', {
                    mascotas,
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: mensajeDecodificado,
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        }
        catch (error) { // ERROR AL BUSCAR LAS MASCOTAS DEL CLIENTE
            console.log(error);
            res.status(500).render('cruzas', {
                mascotas: [],
                alert: true,
                alertTitle: "Error",
                alertMessage: mensajeDecodificado,
                alertIcon: "error",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    }





    module.exports = {
        mostrarIndexCruzas,
        publicarMascotaCruza,
        guardarPublicacionCruza,
        publicacionGuardadaCruza,
        verificacionesCruza,
    }