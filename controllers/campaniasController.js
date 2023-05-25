const Campania = require('../db/models/campania');
const Donacion = require('../db/models/donacion');
const User = require('../db/models/user');
const session = require('express-session');
const moment = require('moment');
//const { transporter } = require('../config/mailer');

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

module.exports = {
    mostrarCampanias,
}