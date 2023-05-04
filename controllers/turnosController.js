const Turno = require('../db/models/turno');
const Mascota = require('../db/models/mascota');
const User = require('../db/models/user');
const session = require('express-session');
const moment = require('moment');
const { transporter } = require('../config/mailer');

const verificaciones = (req, res, next) => {
    let { fecha_turno, banda_horaria, practica, mascota } = req.body;

    if (!fecha_turno || !moment(fecha_turno).isValid()) { //Verifica que la fecha sea válida
        return res.status(404).json('La fecha de turno no es válida');
    }
    
    fecha_turno = moment(fecha_turno).startOf('day'); // Establece la fecha al inicio del día
    let dia = fecha_turno.day();

    if (!practica || !mascota || !banda_horaria) { // Verifica que no haya campos vacíos
        return res.status(404).json('No se puede solicitar turno con campos vacíos');
    }

    if (dia === 6 && banda_horaria.toLowerCase() === 'tarde' || dia === 0) { // Verifica que no se solicite turno para los sábados o domingos
        return res.status(404).json('No se puede solicitar turno para las tardes de los sábados o los domingos');
    }

    if (fecha_turno.isBefore(moment().startOf('day'))) { // Verifica que no se solicite turno para una fecha anterior a la actual
        return res.status(404).json('No se puede solicitar turno para una fecha anterior a la actual');
    }

    if (fecha_turno.isAfter(moment().startOf('day').add(2, 'years'))) { // Verifica que no se solicite turno para una fecha muy lejana
        return res.status(404).json('No se puede solicitar turno para una fecha muy lejana');
    }

    next(); //si pasa todas las verificaciones, pasa al siguiente middleware
}



const solicitarTurno = async (req, res) => {
    const id = session.usuario.id;
    const mascotas = await Mascota.findAll({ where: { UserId: id } })
        .catch(error => {
            console.log(error);
            res.status(500).json('Error al devolver los resultados: ' + error);
        });
    res.render('solicitar_turno.ejs', { mascotas });
};

const guardarTurno = async (req, res) => {
    const { fecha_turno, banda_horaria, practica, mascota } = req.body;
    const UserId = session.usuario.id;
    const mascotas = await Mascota.findAll({ where: { UserId: UserId } }) //    ESTO SE REPITE, DEBERIA ESTAR EN UNA FUNCION
        .catch(error => {
            console.log(error);
            res.status(500).json('Error al devolver los resultados: ' + error);
        });
    await Turno.create({
        fecha: moment(fecha_turno).toDate(),
        banda_horaria: banda_horaria,
        practica: practica,
        UserId: UserId,
        MascotumId: mascota,
        estado: "Pendiente"
    })
        .catch(error => {
            console.log(error);
            res.status(500).render('solicitar_turno.ejs', {
                mascotas,
                alert: true,
                alertTitle: "Error",
                alertMessage: "Error al guardar el turno, por favor reingrese los datos",
                alertIcon: "error",
                showConfirmButton: true,
                timer: false,
            });
        });
    res.render('solicitar_turno.ejs', {
        mascotas,
        alert: true,
        alertTitle: "Solicitud exitosa",
        alertMessage: "Su solicitud ha sido registrada, puede verificarla en su listado de turnos",
        alertIcon: "success",
        showConfirmButton: true,
        timer: 1500,
    });
};


const mostrarTodosLosTurnos = async (req, res) => {
    const turnos = await Turno.findAll({
        raw: true,
        include: [
            { model: Mascota, as: 'Mascotum', attributes: ['nombre'] },
            { model: User, as: 'User', attributes: ['name', 'mail'] }]
    })
        .catch(error => {
            console.log(error);
            res.status(500).json('Error al devolver los resultados: ' + error);
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
            res.status(500).json('Error al devolver los resultados: ' + error);
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

const cambiarEstadoTurno = async (req, res) => {
    const bool = req.body.estado;
    const idTurno = req.body.idTurno;
    const mailTurno = req.body.mailTurno;
    const estado = bool ? "Aceptado" : "Rechazado";
    const result = await Turno.update(
        { estado: estado },
        { where: { id: idTurno, estado: "Pendiente" } }
    )
        .catch(error => {
            console.log(error);
            res.status(500).json('Error al cambiar estado: ' + error) //ERROR AL CONECTARSE CON LA BASE DE DATOS
        });
    if (result[0] === 0) {
        res.status(400).json('No se pudo actualizar el estado del turno'); //ERROR AL ACTUALIZAR EL ESTADO YA SEA PORQUE NO SE ENCONTRO O PORQUE EL ESTADO NO ES PENDIENTE
    } else {
        /*
        await transporter.sendMail({
            from: '"Estado de turno actualizado" <veterinaria.omd@gmail.com>',
            to: "veterinaria.omd@gmail.com", //deberia ser --> to: mailTurno,
            subject: "Estado de turno actualizado",
            text: "Estimado cliente, el estado de su turno ha sido actualizado, por favor ingrese a la pagina para ver el estado del mismo.",
        })
            .catch(error => {
                console.log('Error al enviar mail');
            });
            */
        res.status(200).json('Estado del turno actualizado correctamente');
    }
}



module.exports = {
    verificaciones,
    solicitarTurno,
    guardarTurno,
    mostrarTodosLosTurnos,
    mostrarMisTurnos,
    cambiarEstadoTurno,
}
