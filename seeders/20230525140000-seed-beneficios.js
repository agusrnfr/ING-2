'use strict';
const faker = require('faker');
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('beneficios', [{
            monto_beneficio: 10,
            usado: false,
            UserId: 3,
        }], {});
        await queryInterface.bulkInsert('beneficios', [{
            monto_beneficio: 200,
            usado: false,
            UserId: 3,
        }], {});
   
        await queryInterface.bulkInsert('beneficios', [{
            monto_beneficio: 10000,
            usado: false,
            UserId: 3,
        }], {});
        await queryInterface.bulkInsert('beneficios', [{
            monto_beneficio: 3000,
            usado: true,
            UserId: 3,
        }], {});

    },
    async down(queryInterface, Sequelize) {
        // Comandos para revertir la inserción de datos
    }
};