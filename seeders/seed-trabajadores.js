'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let i = 0; i < 5; i++) {
      await queryInterface.bulkInsert('trabajadores', [{
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        zona: "Ensenada",
      }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    // Comandos para revertir la inserción de datos
  }
};