'use strict';
const faker = require('faker');
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('campanias', [{
            titulo: 'Donación a la veterinaria ¡Oh my dog!',
            descripcion: '¡Oh My Dog! es una veterinaria comprometida con el bienestar animal. Tu donación apoyará a refugios locales, proporcionándoles los recursos necesarios para rescatar, cuidar y encontrar hogares amorosos a animales abandonados. Únete a nuestra causa y ayúdanos a hacer una diferencia en la vida de estos adorables seres. ¡Dona hoy para salvar vidas!',
        }], {});
        await queryInterface.bulkInsert('campanias', [{
            titulo: 'Campaña de donación de alimentos',
            descripcion: 'Ayuda a los que más lo necesitan donando alimentos a los refugios de la ciudad',
            fecha_fin: moment('2023-12-12').toDate(),
        }], {});
        await queryInterface.bulkInsert('campanias', [{
            titulo: 'Ayudemos a Bart',
            descripcion: 'Ayuda a Bart a conseguir su operación',
            fecha_fin: moment('2022-07-12').toDate(),
        }], {});
        await queryInterface.bulkInsert('campanias', [{
            titulo: 'Campaña para el refugio de Huellitas',
            descripcion: 'Campaña para el refugio de Huellitas',
            fecha_fin: moment('2024-01-12').toDate(),
        }], {});
    },

    async down(queryInterface, Sequelize) {
        // Comandos para revertir la inserción de datos
    }
};