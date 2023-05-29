'use strict';
const faker = require('faker');
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('donaciones', [{
            monto: 350.50,
            fecha: moment().toDate(),
            CampaniumId: 1,
        }], {});
        await queryInterface.bulkInsert('donaciones', [{
            monto: 200,
            fecha: moment().toDate(),
            CampaniumId: 1,
        }], {});
        await queryInterface.bulkInsert('donaciones', [{
            monto: 500,
            fecha: moment().clone().subtract(5, 'days').toDate(),
            CampaniumId: 1,
        }], {});
        await queryInterface.bulkInsert('donaciones', [{
            monto: 1500,
            fecha: moment().clone().subtract(3, 'days').toDate(),
            CampaniumId: 1,
        }], {});
        await queryInterface.bulkInsert('donaciones', [{
            monto: 200,
            fecha: moment().subtract(3, 'days').toDate(),
            CampaniumId: 2,
        }], {});
        await queryInterface.bulkInsert('donaciones', [{
            monto: 450,
            fecha: moment().toDate(),
            CampaniumId: 3,
        }], {});
    },

    async down(queryInterface, Sequelize) {
        // Comandos para revertir la inserción de datos
    }
};