const { Op } = require('sequelize');
const Mascota = require('../db/models/mascota');
const Cruza = require('../db/models/cruza');
const User = require('../db/models/user');
const session = require('express-session');
const { buscarMascotasCliente } = require('./turnosController');
const moment = require('moment');
const { transporter } = require('../config/mailer');

async function buscarMascotasClientesConPublicacionCruza(UserId) {
    const mascotas = await buscarMascotasCliente(UserId);
    for (let i = 0; i < mascotas.length; i++) {
        const tienePublicacion = await Cruza.findOne({ where: { MascotumId: mascotas[i].id } });
        mascotas[i].tienePublicacion = !!tienePublicacion;
    }
    return mascotas;
}


const mostrarIndexCruzas = async (req, res) => {
    const UserId = session.usuario.id;
    try {
        const mascotas = await buscarMascotasClientesConPublicacionCruza(UserId);
        res.render('cruzas', { mascotas , session });
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
        const { texto_libre, telefono, correo } = req.body;
        const cruza = await Cruza.findOne({ where: { MascotumId: id } })
        if (cruza) {
            return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('Ya existe una publicación para esta mascota')}`);
        }
        if (!texto_libre) {
            return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('Debe ingresar un texto libre')}`);
        }
        if (!telefono) {
            return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('Debe ingresar un teléfono')}`);
        }
        if (!correo) {
            return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('Debe ingresar un correo')}`);
        }
        next(); // Si pasa todas las verificaciones, pasa a la siguiente función
    }
    catch (error) {
        return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('Error al realizar la acción')}`);
    }
}

const guardarPublicacionCruza = async (req, res) => {
    try {
        const { id } = req.params;
        const { texto_libre, telefono, correo } = req.body;
        const mascota = await Mascota.findByPk(id);
        if (mascota) {
            await Cruza.create({
                texto_libre: texto_libre,
                tel: telefono,
                mail: correo,
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

const verificarPerroEsDeUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const mascota = await Mascota.findOne({ where: { id: id } });
        if (!mascota) {
            return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('No se encontró mascota')}`);
        }
        if (mascota.UserId != session.usuario.id) {
            return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('No se encontró mascota')}`);
        }
        next(); // Si pasa todas las verificaciones, pasa a la siguiente función
    }
    catch (error) {
        return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('Error al realizar la acción')}`);
    }
}

const verificacionesDeMascotasContacto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [mascotaId, contactanteId] = id.split('-');
        const mascota = await Mascota.findOne({ where: { id: mascotaId} });
        const contactante = await Mascota.findOne({ where: { id: contactanteId } });
        const cruzaMascota = await Cruza.findOne({ where: { MascotumId: mascotaId } });
        const cruzaContactante = await Cruza.findOne({ where: { MascotumId: contactanteId } });
        if (!mascota) {
            return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=500&mensaje=${encodeURIComponent('No se encontró mascota')}`);
        }
        if (!contactante) {
            return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=500&mensaje=${encodeURIComponent('No se encontró mascota')}`);
        }
        if (!cruzaMascota) {
            return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=500&mensaje=${encodeURIComponent('No se encontró mascota')}`);
        }
        if (!cruzaContactante) {
            return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=500&mensaje=${encodeURIComponent('No se encontró mascota')}`);
        }
        if (mascota.UserId == session.usuario.id) {
            return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=500&mensaje=${encodeURIComponent('No se puede contactar con usted mismo')}`);
        }
        if (contactante.UserId != session.usuario.id) {
            return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=500&mensaje=${encodeURIComponent('No se encontró mascota')}`);
        }
        if (mascota.sexo == contactante.sexo) {
            return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=500&mensaje=${encodeURIComponent('Las mascotas son del mismo sexo')}`);
        }
        if (mascota.raza != contactante.raza) {
            return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=500&mensaje=${encodeURIComponent('Las mascotas no son de la misma raza')}`);
        }
        next(); // Si pasa todas las verificaciones, pasa a la siguiente función
    }
    catch (error) {
        return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=500&mensaje=${encodeURIComponent('Error al realizar la acción')}`);
    }
}


const mostrarPublicacionMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const cruza = await Cruza.findOne({
            where: { MascotumId: id },
            raw: true,
            include: [
                { model: Mascota, attributes: ['nombre', 'sexo', 'foto', 'raza'] }]
        });
        if (!cruza) {
            return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('No se encontró publicación')}`);
        }
        res.render('verPerfilCruza', {
            cruza: {
                texto_libre: cruza.texto_libre,
                tel: cruza.tel,
                mail: cruza.mail,
                nombre: cruza['Mascotum.nombre'],
                sexo: cruza['Mascotum.sexo'],
                foto: cruza['Mascotum.foto'],
                raza: cruza['Mascotum.raza'],
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).render('verPerfilCruza', { cruza: null });
    }
}


async function obtenerDatosMascota(id) {
    const mascota = await Mascota.findOne({
        where: { id: id },
        raw: true,
        attributes: ['nombre','sexo', 'raza', 'UserId'],
    });

    return {
        nombre: mascota.nombre,
        sexo: mascota.sexo,
        raza: mascota.raza,
        UserId: mascota.UserId,
    }
}

const mostrarRecomendacionesCruza = async (req, res) => { //muestra la lista de cruzas de la misma raza y sexo opuesto
    try {
        const { id } = req.params;
        const mascota = await obtenerDatosMascota(id);
        const cruza = await Cruza.findOne({
            where: {
                MascotumId: id,
                se_muestra: true,
            },
        });
        if (!cruza) {
            return res.redirect(`/cruzas/publicacionGuardada?success=false&status=500&mensaje=${encodeURIComponent('No se encontró mascota')}`);
        }
        const cruzas = await Cruza.findAll({
            where: {
                se_muestra: true,
            },
            include: [
                {
                    model: Mascota,
                    attributes: ['nombre', 'sexo', 'foto', 'raza', 'UserId'],
                    where: {
                        sexo: mascota.sexo === 'Macho' ? 'Hembra' : 'Macho',
                        raza: mascota.raza,
                        UserId: {
                            [Op.ne]: mascota.UserId,
                        },
                    },
                },
            ],
            raw: true,
        });

        res.render('recomendacionesCruza', {
            cruzas: cruzas.map(cruza => {
                return {
                    nombre: cruza['Mascotum.nombre'],
                    sexo: cruza['Mascotum.sexo'],
                    foto: cruza['Mascotum.foto'],
                    texto_libre: cruza.texto_libre,
                    MascotumId: cruza.MascotumId,
                }
            }),
            idContactante: id,
            mascota,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).render('recomendacionesCruza', { cruzas: [] });
    }
}

const mostrarContactoCruza = async (req, res) => {
    try {
        const { id } = req.params;
        const mascotaId = id.split('-')[0];
        const usuario = await User.findByPk(session.usuario.id
            , { raw: true, attributes: ['name', 'mail', 'tel'] });
        const cruza = await Cruza.findOne({
            where: { MascotumId: mascotaId },
            raw: true,
            include: [
                { model: Mascota, attributes: ['nombre', 'sexo', 'foto', 'raza'] }]
        });
        if (!cruza) {
            return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=500&mensaje=${encodeURIComponent('No se encontró cruza para contactar')}`);
        }
        res.render('contactoCruza', {data:{
            nombreUsuario: usuario.name,
            mailUsuario: usuario.mail,
            telUsuario: usuario.tel,
            nombreMascota: cruza['Mascotum.nombre'],
            tel: cruza.tel,
            mail: cruza.mail,
        }});
    }
    catch (error) {
        console.log(error);
        res.status(500).render('contactoCruza', { data: null });
    }
}

const renderCruzasPage = (res, mascotas, servicio, success, mensajeDecodificado, status) => {
    let alertTitle = "";
    if (servicio === "publicacion") {
        alertTitle = "Publicación exitosa";
    } else if (servicio === "contacto") {
        alertTitle = "Contacto exitoso";
    } else {
        alertTitle = "Error";
    }

    if (success === 'true') {
        res.status(status).render('cruzas', {
            mascotas,
            alert: true,
            alertTitle,
            alertMessage: mensajeDecodificado,
            alertIcon: "success",
            showConfirmButton: false,
            timer: 2000,
        });
    } else if (success === 'false') {
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
};

const publicacionGuardadaCruza = async (req, res) => { // Muestra la alerta de que se guardó correctamente el turno o que hubo un error
    const success = req.query.success;
    const mensajeDecodificado = decodeURIComponent(req.query.mensaje);
    const status = Number(req.query.status);
    const UserId = session.usuario.id;

    try {
        const mascotas = await buscarMascotasClientesConPublicacionCruza(UserId);
        renderCruzasPage(res, mascotas, "publicacion", success, mensajeDecodificado, status);
    } catch (error) { // ERROR AL BUSCAR LAS MASCOTAS DEL CLIENTE
        console.log(error);
        renderCruzasPage(res, [], "publicacion", 'false', mensajeDecodificado, 500);
    }
};

const contactoCruzaGuardado = async (req, res) => {
    const success = req.query.success;
    const mensajeDecodificado = decodeURIComponent(req.query.mensaje);
    const status = Number(req.query.status);
    const UserId = session.usuario.id;

    try {
        const mascotas = await buscarMascotasClientesConPublicacionCruza(UserId);
        renderCruzasPage(res, mascotas, "contacto", success, mensajeDecodificado, status);
    } catch (error) { // ERROR AL BUSCAR LAS MASCOTAS DEL CLIENTE
        console.log(error);
        renderCruzasPage(res, [], "contacto", 'false', mensajeDecodificado, 500);
    }
};

const verificacionesContactoCruza = async (req, res, next) => {
    const { mailDuenio, nombreMascota, nombre, telefono, mail} = req.body;
    if (!mailDuenio){
        return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=400&mensaje=${encodeURIComponent('Error al enviar el mail')}`);
    }
    if (!nombreMascota){
        return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=400&mensaje=${encodeURIComponent('Error al enviar el mail')}`);
    }
    if (!nombre){
        return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=400&mensaje=${encodeURIComponent('Debe ingresar su nombre')}`);
    }
    if (!telefono){
        return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=400&mensaje=${encodeURIComponent('Debe ingresar su teléfono')}`);

    }
    if (!mail){
        return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=400&mensaje=${encodeURIComponent('Debe ingresar su mail')}`);
    }
    next();
}

const contactarCruza = async (req, res) => {
    const { mailDuenio, nombreMascota, nombre, telefono, mail} = req.body;
    const { id } = req.params;
    const contactanteId = id.split('-')[1];
    try {
        const cruzaContactante = await Cruza.findOne({
            where: { MascotumId: contactanteId },
            raw: true,
            include: [
                { model: Mascota, attributes: ['nombre', 'sexo', 'foto', 'raza'] }]
        });
        await transporter.sendMail({
            from: '"Contacto por cruza" <veterinaria.omd@gmail.com>',
            to: "laura.cuenca1@gmail.com", //deberia ser --> to: mailDuenio,
            subject: 'Contacto por cruza',
            text: 'El usuario ' + nombre + ' desea contactarse con usted por la cruza de su mascota ' + nombreMascota + '.\n' +
                'Sus datos son:\n' +
                'Nombre: ' + nombre + '\n' +
                'Teléfono: ' + telefono + '\n' +
                'Mail: ' + mail + '\n' +
                'Datos de la mascota:\n' +
                'Nombre: ' + cruzaContactante['Mascotum.nombre'] + '\n' +
                'Sexo: ' + cruzaContactante['Mascotum.sexo'] + '\n' +
                'Raza: ' + cruzaContactante['Mascotum.raza'] + '\n' +
                'Descripción: ' + cruzaContactante.texto_libre + '\n'
        })
            .catch(error => {
                console.log('Error al enviar mail');
                res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=500&mensaje=${encodeURIComponent('Error al enviar el mail')}`
                );
            });
        return res.redirect(`/cruzas/contactoCruzaGuardado?success=true&status=200&mensaje=${encodeURIComponent('Mail enviado correctamente')}`);
    } catch (error) {
        console.log(error);
        return res.redirect(`/cruzas/contactoCruzaGuardado?success=false&status=500&mensaje=${encodeURIComponent('Error con la base de datos')}`);
    }
}


module.exports = {
    mostrarIndexCruzas,
    publicarMascotaCruza,
    guardarPublicacionCruza,
    publicacionGuardadaCruza,
    verificacionesCruza,
    verificarPerroEsDeUsuario,
    verificacionesDeMascotasContacto,
    mostrarPublicacionMascota,
    mostrarRecomendacionesCruza,
    mostrarContactoCruza,
    contactoCruzaGuardado,
    verificacionesContactoCruza,
    contactarCruza
}