const Campania = require('../db/models/campania');
const Donacion = require('../db/models/donacion');
const User = require('../db/models/user');
const session = require('express-session');
const moment = require('moment');
//const { transporter } = require('../config/mailer');

const mostrarCampanias = async (req, res) => {
    try {
        const campanias = await Campania.findAll({ raw: true, });
        const data = campanias.map(campania => {
            const fecha_fin = moment.tz(campania.fecha_fin, 'America/Argentina/Buenos_Aires').format('DD/MM/YYYY');
            return {
                id: campania.id,
                titulo: campania.titulo,
                descripcion: campania.descripcion,
                fecha_fin: fecha_fin
            };
        })
            .sort((a, b) => moment(a.fecha_fin, 'DD/MM/YYYY').diff(moment(b.fecha_fin, 'DD/MM/YYYY')));
        res.render('campanias_listado', { data: data, session: session });
    } catch (error) {
        console.log(error);
        res.render('campanias_listado', { data: [], session: session });
    }
}


module.exports = {
    mostrarCampanias,
}