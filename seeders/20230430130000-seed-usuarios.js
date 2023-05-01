'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      mail: 'lucia@gmail.com',
      name: 'Lucia Diaz',
      tel: "2116032221",
      DNI: "40227109",
      pass: '123',
      rol: 'admin',
    }], {});
    await queryInterface.bulkInsert('users', [{
      mail: 'pedro@gmail.com',
      name: 'Pedro Perez',
      tel: "21160322267",
      DNI: "31227109",
      pass: '123',
      rol: 'admin',
    }], {});
    await queryInterface.bulkInsert('users', [{
      mail: 'juancho@gmail.com',
      name: 'Juancho Perez',
      tel: "2116032221",
      DNI: "32227109",
      pass: '123456789',
      rol: 'cliente',
    }], {});
    for (let i = 0; i < 5; i++) {
      await queryInterface.bulkInsert('users', [{
        mail: faker.name.firstName()+"@gmail.com",
        name: faker.name.firstName()+ " " + faker.name.lastName(),
        tel: "2116030285",
        DNI: "30227100",
        pass: '12345678',
        rol: 'cliente',
      }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    // Comandos para revertir la inserción de datos
  }
};