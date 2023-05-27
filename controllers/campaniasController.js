const Campania = require('../db/models/campania');
const Donacion = require('../db/models/donacion');
const Beneficio = require('../db/models/beneficio');
const session = require('express-session');
const moment = require('moment');

const verificacionesCampania = async (req, res, next) => {
    const { titulo, descripcion, fecha_fin } = req.body;
    if (!titulo) {
        return res.redirect(`/campanias/publicacionGuardada?success=false&status=400&mensaje=${encodeURIComponent('Debe ingresar un título')}`);
    }
    if (!descripcion) {
        return res.redirect(`/campanias/publicacionGuardada?success=false&status=400&mensaje=${encodeURIComponent('Debe ingresar una descripción')}`);
    }
    if (!fecha_fin) {
        return res.redirect(`/campanias/publicacionGuardada?success=false&status=400&mensaje=${encodeURIComponent('Debe ingresar una fecha de finalización')}`);
    }
    if (titulo.trim.length > 256) {
        return res.redirect(`/campanias/publicacionGuardada?success=false&status=400&mensaje=${encodeURIComponent('El título no puede tener más de 256 caracteres')}`);
    }
    if (descripcion.trim.length > 500) {
        return res.redirect(`/campanias/publicacionGuardada?success=false&status=400&mensaje=${encodeURIComponent('La descripción no puede tener más de 500 caracteres')}`);
    }
    next();
};

const mostrarCampanias = async (req, res) => {
    try {
        const campanias = await Campania.findAll({ raw: true, });
        const donaciones = await Donacion.findAll({ raw: true, });
        const data = campanias.map(campania => {
            const fecha_fin = moment.tz(campania.fecha_fin, 'America/Argentina/Buenos_Aires').format('DD/MM/YYYY');
            const donacionesCampania = donaciones
                .filter(donacion => donacion.CampaniumId === campania.id)
                .map(donacion => {
                    const fechaDonacion = moment.tz(donacion.fecha, 'America/Argentina/Buenos_Aires').format('DD/MM/YYYY');
                    return {
                        id: donacion.id,
                        monto: donacion.monto,
                        fecha: fechaDonacion,
                    };
                })
                .sort((a, b) => moment(a.fecha, 'DD/MM/YYYY').diff(moment(b.fecha, 'DD/MM/YYYY')));
            ;
            const total = donacionesCampania.reduce((acc, donacion) => acc + donacion.monto, 0);
            return {
                id: campania.id,
                titulo: campania.titulo,
                descripcion: campania.descripcion,
                fecha_fin: fecha_fin,
                total: total,
                donaciones: donacionesCampania
            };
        })
            .sort((a, b) => moment(b.fecha_fin, 'DD/MM/YYYY').diff(moment(a.fecha_fin, 'DD/MM/YYYY')));
        res.render('campanias_listado', { data: data, session: session });
    } catch (error) {
        console.log(error);
        res.render('campanias_listado', { data: [], session: session });
    }
}

const publicarCampania = async (req, res) => {
    res.render('publicar_campania');
}

const guardarPublicacionCampania = async (req, res) => {
    const { titulo, descripcion, fecha_fin } = req.body;
    try {
        await Campania.create({
            titulo: titulo,
            descripcion: descripcion,
            fecha_fin: moment(fecha_fin).toDate(),
        });
        return res.redirect(`/campanias/publicacionGuardada?success=true&status=200&mensaje=${encodeURIComponent('La campaña se publicó correctamente')}`);
    }
    catch (error) {
        console.log(error);
        return res.redirect(`/campanias/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('Hubo un error al publicar la campaña')}`);
    }
}

const publicacionGuardada = async (req, res) => { // Muestra la alerta de que se guardó correctamente el turno o que hubo un error
    const success = req.query.success;
    const mensajeDecodificado = decodeURIComponent(req.query.mensaje);
    const status = Number(req.query.status);

    if (success == 'true') {
        res.status(status).render('publicar_campania', {
            alert: true,
            alertTitle: "Publicación exitosa",
            alertMessage: mensajeDecodificado,
            alertIcon: "success",
            showConfirmButton: false,
            timer: 2000,
        });
    }
    else if (success == 'false') {
        res.status(status).render('publicar_campania', {
            alert: true,
            alertTitle: "Error",
            alertMessage: mensajeDecodificado,
            alertIcon: "error",
            showConfirmButton: false,
            timer: 2000,
        });
    }
}

const verificacionesDonacion = async (req, res, next) => {
    const { id, monto, tarjeta } = req.body;
    if (!id) {
        return res.status(400).json('No se ingreso id de campaña');
    }
    const campania = await Campania.findOne({ where: { id: id } });
    if (!campania) {
        return res.status(404).json('No se encontró la campaña');
    }
    if (moment().startOf('day').isAfter(moment(campania.fecha_fin).startOf('day'))) {
        return res.status(400).json('La campaña ya finalizó');
    }
    if (!monto) {
        return res.status(400).json('Debe ingresar un monto');
    }
    if (monto <= 0) {
        return res.status(400).json('El monto debe ser mayor a 0');
    }
    if (!tarjeta) {
        return res.status(400).json('Debe ingresar una tarjeta');
    }
    if (tarjeta.length < 16 || tarjeta.length > 16) {
        return res.status(400).json('Problemas con el pago: Tarjeta inválida');
    }

    next();
}


const realizarDonacion = async (req, res) => {
    const id = req.body.id;
    const monto = req.body.monto;
    try {
        await Donacion.create({
            fecha: moment().toDate(),
            monto: monto,
            CampaniumId: id,
        });
        if (session.loggedin) {
            await Beneficio.create({
                monto_beneficio: monto * 0.2,
                estado: false,
                UserId: session.usuario.id,
            });
        }
        res.status(200).json('Donación realizada correctamente');
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Hubo un error al realizar la donación');
    }
}

module.exports = {
    mostrarCampanias,
    publicarCampania,
    verificacionesCampania,
    guardarPublicacionCampania,
    publicacionGuardada,
    verificacionesDonacion,
    realizarDonacion,
}