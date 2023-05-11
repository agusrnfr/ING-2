const Turno = require('../db/models/turno');
const Mascota = require('../db/models/mascota');
const User = require('../db/models/user');
const session = require('express-session');
const moment = require('moment');
const { transporter } = require('../config/mailer');

const verificaciones = async (req, res, next) => { // Verifica que los datos ingresados sean válidos
    let { fecha_turno, banda_horaria, practica, mascota, opcion } = req.body;
    let { id, fechaNacimiento } = obtenerIdyFechaDeMascota(mascota);

    try {
        const mascotasCliente = await buscarMascotasCliente(session.usuario.id);
        const mascotaSeleccionada = mascotasCliente.find(m => m.id == id);
        if (!mascotaSeleccionada) { // Verifica que la mascota exista y pertenezca al usuario
            return res.redirect(`/turnos/turnoGuardado?success=false&status=400&mensaje=${encodeURIComponent('La mascota seleccionada no existe o no pertenece al usuario logueado')}`);
        }
    } catch (error) {
        console.log(error);
        return res.redirect(`/turnos/turnoGuardado?success=false&status=500&mensaje=${encodeURIComponent('Error al buscar las mascotas del usuario')}`);
    }

    if (practica == 'Castracion' || practica == 'Desparasitacion' || practica == 'Consulta general' || practica == 'Urgencia') { // Verifica que la fechea sea validad

        if (!fecha_turno || !moment(fecha_turno).isValid()) { //Verifica que la fecha sea válida
            return res.redirect(`/turnos/turnoGuardado?success=false&status=400&mensaje=${encodeURIComponent('La fecha de turno no es válida')}`);
        }

        fecha_turno = moment(fecha_turno).startOf('day'); // Establece la fecha al inicio del día
        let dia = fecha_turno.day();

        if (!practica || !mascota || !banda_horaria) { // Verifica que no haya campos vacíos
            return res.redirect(`/turnos/turnoGuardado?success=false&status=400&mensaje=${encodeURIComponent('No se puede solicitar turno con campos vacíos')}`);

        }

        if (dia === 6 && banda_horaria.toLowerCase() === 'tarde' || dia === 0) { // Verifica que no se solicite turno para los sábados o domingos
            return res.redirect(`/turnos/turnoGuardado?success=false&status=400&mensaje=${encodeURIComponent('No se puede solicitar turno para las tardes de los sábados o los domingos')}`);

        }

        if (fecha_turno.isBefore(moment().startOf('day').add(1, 'day'))) { // Verifica que no se solicite turno para una fecha anterior o igual a la actual
            return res.redirect(`/turnos/turnoGuardado?success=false&status=400&mensaje=${encodeURIComponent('No se puede solicitar turno para una fecha anterior o igual a la actual')}`);
        }

        if (fecha_turno.isAfter(moment().startOf('day').add(2, 'years'))) { // Verifica que no se solicite turno para una fecha muy lejana
            return res.redirect(`/turnos/turnoGuardado?success=false&status=400&mensaje=${encodeURIComponent('No se puede solicitar turno para una fecha muy lejana')}`);
        }

        if (practica == 'Castracion') {
            if (calcularEdadMasco(fechaNacimiento) < 6 && opcion == "no") { // Verifica que la mascota tenga al menos 6 meses o haya tenido su primer celo
                return res.redirect(`/turnos/turnoGuardado?success=false&status=400&mensaje=${encodeURIComponent('La mascota debe tener al menos 6 meses o haber tenido su primer celo para solicitar la castración')}`);

            }
        }
    }
    if (practica == 'Vacuna A') {
        if (calcularEdadMasco(fechaNacimiento) < 2) { // Verifica que la mascota tenga al menos 2 meses}
            return res.redirect(`/turnos/turnoGuardado?success=false&status=400&mensaje=${encodeURIComponent('La mascota debe tener al menos 2 meses para solicitar la vacuna A')}`);

        }
    }
    if (practica == 'Vacuna B') {
        if (calcularEdadMasco(fechaNacimiento) < 4) { // Verifica que la mascota tenga al menos 4 meses
            return res.redirect(`/turnos/turnoGuardado?success=false&status=400&mensaje=${encodeURIComponent('La mascota debe tener al menos 4 meses para solicitar la vacuna B')}`);

        }
    }
    next(); //si pasa todas las verificaciones, pasa al siguiente middleware
}

const obtenerIdyFechaDeMascota = (str) => { // Obtiene el id y la fecha de nacimiento de la mascota
    const parts = str.split("-");
    const front = parts[0];
    const dateParts = parts[1].split("/");
    const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    return { id: front, fechaNacimiento: date };
}

const calcularEdadMasco = (fechaNacimiento) => { // Calcula la edad de la mascota en meses
    const edad = moment().startOf('day').diff(moment(fechaNacimiento).startOf('day'), 'months');
    return edad;
}

const buscarMascotasCliente = async (id) => { // Busca las mascotas del cliente
    try {
        const mascotas = await Mascota.findAll({ raw: true, where: { UserId: id } });
        return mascotas;
    } catch (error) {
        console.log(error);
        throw new Error('Error al buscar las mascotas del cliente');
    }
};


const solicitarTurno = async (req, res) => { // Muestra el formulario para solicitar turno
    const UserId = session.usuario.id;
    try {
        const mascotas = await buscarMascotasCliente(UserId);
        res.render('solicitar_turno.ejs', { mascotas });
    }
    catch (error) {
        console.log(error);
        res.status(500).render('solicitar_turno.ejs', { mascotas: [] });
    }
};

const calcularFechaVacuna = (fecha, practica, mascota, banda_horaria) => { // Calcula la fecha de la vacuna
    const edadMascota = calcularEdadMasco(mascota.fechaNacimiento); // Calcula la edad de la mascota en meses
    if (practica == 'Vacuna A' && edadMascota < 4) { // Si la mascota tiene menos de 4 meses, se le asigna la fecha de la vacuna A a 21 días de la fecha actual
        fecha = moment().add(21, 'days').startOf('day');
        if (fecha.day() == 6 && banda_horaria.toLowerCase() == 'tarde') { // Si la fecha es sábado y la banda horaria es tarde, se le asigna la fecha de la vacuna A a 23 días de la fecha actual
            return fecha.add(2, 'days'); // 
        } else if (fecha.day() == 0) { // Si la fecha es domingo, se le asigna la fecha de la vacuna A a 22 días de la fecha actual
            return fecha.add(1, 'days'); // 
        } else {
            return fecha; // Si la fecha no es sábado ni domingo, se le asigna la fecha de la vacuna A a 21 días de la fecha actual
        }
    } else if ((practica == 'Vacuna A' && edadMascota >= 4) || practica == 'Vacuna B') { // Si la mascota tiene 4 meses o más o es la vacuna B , se le asigna la fecha de la vacuna a 1 año de la fecha actual
        fecha = moment().add(1, 'year').startOf('day');
        if (fecha.day() == 6 && banda_horaria.toLowerCase() == 'tarde') { // Si la fecha es sábado y la banda horaria es tarde, se le asigna la fecha de la vacuna a 1 año y 2 días de la fecha actual
            return fecha.add(2, 'days');
        } else if (fecha.day() == 0) { // Si la fecha es domingo, se le asigna la fecha de la vacuna a 1 año y 1 día de la fecha actual
            return fecha.add(1, 'days');
        } else {
            return fecha; // Si la fecha no es sábado ni domingo, se le asigna la fecha de la vacuna a 1 año de la fecha actual
        }
    } else {
        return moment(fecha).startOf('day'); // Si la práctica es castración, desparasitación, consulta general o urgencia, se le asigna la fecha ingresada
    }
}

const crearTurnoBD = async (fecha, banda_horaria, practica, UserId, mascota) => { // Crea el turno en la base de datos
    let fechaBD = calcularFechaVacuna(fecha, practica, mascota, banda_horaria).toDate();
    if (!fechaBD) {
        throw new Error('No se pudo calcular la fecha del turno');
    }
    try {
        await Turno.create({
            fecha: fechaBD,
            banda_horaria: banda_horaria,
            estado: 'Pendiente',
            practica: practica,
            UserId: UserId,
            MascotumId: mascota.id,
        });
        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Error al crear el turno');
    }
};

const guardarTurno = async (req, res) => { // Si se guardó correctamente el turno, se manda que se guardó correctamente, sino, se manda que hubo un error, esto se realiza mediante la query string redireccionando a la misma página
    const { fecha_turno, banda_horaria, practica, mascota } = req.body;
    const mascotaObj = obtenerIdyFechaDeMascota(mascota)
    const UserId = session.usuario.id;
    try {
        const turnoCreado = await crearTurnoBD(fecha_turno, banda_horaria, practica, UserId, mascotaObj);
        if (turnoCreado) {
            res.redirect(`/turnos/turnoGuardado?success=true&status=200&mensaje=${encodeURIComponent('Su solicitud ha sido registrada, puede verificarla en su listado de turnos')}`);
        } else {
            res.redirect(`/turnos/turnoGuardado?success=false&status=500&mensaje=${encodeURIComponent('Error al guardar el turno, por favor reingrese los datos')}`);
        }
    } catch (error) {
        console.log(error);
        res.redirect(`/turnos/turnoGuardado?success=false&status=500&mensaje=${encodeURIComponent('Error al guardar el turno, por favor reingrese los datos')}`);
    }
};


const mostrarTodosLosTurnos = async (req, res) => { // Muestra todos los turnos
    try {
        const turnos = await Turno.findAll({
            raw: true,
            include: [
                { model: Mascota, as: 'Mascotum', attributes: ['nombre'] },
                { model: User, as: 'User', attributes: ['name', 'mail'] }]
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
    } catch (error) {
        console.log(error);
        res.status(500).render('turnos_listado.ejs', { data: [] });
    };
};

const mostrarMisTurnos = async (req, res) => { // Muestra los turnos del usuario logueado
    try {
        const turnos = await Turno.findAll({
            raw: true,
            include: { model: Mascota, as: 'Mascotum', attributes: ['nombre'] },
            where: { UserId: session.usuario.id }
        })
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
    }
    catch (error) {
        console.log(error);
        res.status(500).render('turnos_listado_cliente.ejs', { data: [] });
    };
};

const cambiarEstadoTurno = async (req, res) => { // Cambia el estado del turno y envía un mail al cliente
    const bool = req.body.estado;
    const idTurno = req.body.idTurno;
    const mailTurno = req.body.mailTurno;
    const estado = bool ? "Aceptado" : "Rechazado";
    let result;
    if (bool) {
        const horas = req.body.horas;
        const minutos = req.body.minutos;
        const turno = await Turno.findByPk(idTurno)
            .catch(error => {
                console.log(error);
                res.status(500).json('Error al cambiar estado: ' + error) //ERROR AL CONECTARSE CON LA BASE DE DATOS
            });

        const fechaTurno = new Date(turno.fecha);
        fechaTurno.setHours(horas, minutos, 0, 0);
        result = await Turno.update(
            {
                estado: estado,
                fecha: fechaTurno
            },
            { where: { id: idTurno, estado: "Pendiente" } }
        )
            .catch(error => {
                console.log(error);
                res.status(500).json('Error al cambiar estado: ' + error) //ERROR AL CONECTARSE CON LA BASE DE DATOS
            });
    } else {
        const motivoRechazo = req.body.motivoRechazo;
        result = await Turno.update(
            {
                estado: estado,
                motivoDeRechazo: motivoRechazo
            },
            { where: { id: idTurno, estado: "Pendiente" } }
        )
            .catch(error => {
                console.log(error);
                res.status(500).json('Error al cambiar estado: ' + error) //ERROR AL CONECTARSE CON LA BASE DE DATOS
            });
    }
    if (result[0] === 0) {
        res.status(400).json('No se pudo actualizar el estado del turno'); //ERROR AL ACTUALIZAR EL ESTADO YA SEA PORQUE NO SE ENCONTRO O PORQUE EL ESTADO NO ES PENDIENTE
    } else {
        /*
        await transporter.sendMail({
            from: '"Estado de turno actualizado" <veterinaria.omd@gmail.com>',
            to: "agusrojastfm@gmail.com", //deberia ser --> to: mailTurno,
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

const turnoGuardado = async (req, res) => { // Muestra la alerta de que se guardó correctamente el turno o que hubo un error
    const success = req.query.success;
    const mensajeDecodificado = decodeURIComponent(req.query.mensaje);
    const status = Number(req.query.status);
    const UserId = session.usuario.id;

    try {
        const mascotas = await buscarMascotasCliente(UserId);
        if (success == 'true') {
            res.status(status).render('solicitar_turno.ejs', {
                mascotas,
                alert: true,
                alertTitle: "Solicitud exitosa",
                alertMessage: mensajeDecodificado,
                alertIcon: "success",
                showConfirmButton: true,
                timer: 1500,
            });
        }
        else if (success == 'false') {
            res.status(status).render('solicitar_turno.ejs', {
                mascotas,
                alert: true,
                alertTitle: "Error",
                alertMessage: mensajeDecodificado,
                alertIcon: "error",
                showConfirmButton: true,
                timer: false,
            });
        }
    }
    catch (error) { // ERROR AL BUSCAR LAS MASCOTAS DEL CLIENTE
        console.log(error);
        res.status(500).render('solicitar_turno.ejs', {
            mascotas: [],
            alert: true,
            alertTitle: "Error",
            alertMessage: mensajeDecodificado,
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
        });
    }
}

/* ATENCION, PARA MOSTRAR LA HORA CORRECTA QUE SE LE SETEO A UN TURNO HAY QUE HACER LO SIGUIENTE, YA QUE EN LA BD NO SE TIENE EL HORARIO LOCAL, SINO QUE SE TIENE EL HORARIO UTC
const moment = require('moment-timezone');

// fechaHora es la fecha y hora almacenada en la base de datos
const fechaHora = '2022-05-12T15:30:00';

// Convertir a la zona horaria deseada
const fechaHoraZonaHoraria = moment.tz(fechaHora, 'America/Argentina/Buenos_Aires');

// Formatear la fecha y hora en el formato deseado (por ejemplo, DD/MM/YYYY HH:mm:ss)
const fechaHoraFormateada = fechaHoraZonaHoraria.format('DD/MM/YYYY HH:mm:ss');

// Mostrar la fecha y hora formateada
console.log(fechaHoraFormateada); // Salida: "12/05/2022 15:30:00"
*/

module.exports = {
    verificaciones,
    solicitarTurno,
    guardarTurno,
    mostrarTodosLosTurnos,
    mostrarMisTurnos,
    cambiarEstadoTurno,
    turnoGuardado,
}
