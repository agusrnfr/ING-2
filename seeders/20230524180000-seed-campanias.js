'use strict';
const faker = require('faker');
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('campanias', [{
            titulo: 'Donación a la veterinaria ¡Oh my dog!',
            descripcion: '¡Oh my dog! es una veterinaria comprometida con el bienestar animal. Tu donación apoyará a refugios locales, proporcionándoles los recursos necesarios para rescatar, cuidar y encontrar hogares amorosos a animales abandonados. Únete a nuestra causa y ayúdanos a hacer una diferencia en la vida de estos adorables seres. ¡Dona hoy para salvar vidas!',
        }], {});
        await queryInterface.bulkInsert('campanias', [{
            titulo: 'Campaña de donación de alimentos',
            descripcion: 'Ayuda a los que más lo necesitan donando alimentos a los refugios de la ciudad',
            fecha_fin: moment().clone().subtract(1, 'days').toDate(),
        }], {});
        await queryInterface.bulkInsert('campanias', [{
            titulo: 'Ayudemos a Bart',
            descripcion: 'Ayuda a Bart a conseguir su operación',
            fecha_fin: moment().toDate(),
        }], {});
    },

    async down(queryInterface, Sequelize) {
        // Comandos para revertir la inserción de datos
    }
};