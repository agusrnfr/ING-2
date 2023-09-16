'use strict';
const faker = require('faker');
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('campanias', [{
            titulo: 'Donación a la veterinaria ¡Oh my dog!',
            descripcion: '¡Oh my dog! es una veterinaria comprometida con el bienestar animal. Tu donación apoyará a refugios locales!',
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