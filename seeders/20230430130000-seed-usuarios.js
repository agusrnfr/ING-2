'use strict';
const { query } = require('express');
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      mail: 'lucia@gmail.com',
      name: 'lucia diaz',
      tel: "2116032221",
      DNI: "40227109",
      pass: '123',
      rol: 'admin',
    }], {});
    await queryInterface.bulkInsert('users', [{
      mail: 'pedro@gmail.com',
      name: 'pedro perez',
      tel: "21160322267",
      DNI: "31227109",
      pass: '123',
      rol: 'admin',
    }], {});
    await queryInterface.bulkInsert('users', [{
      mail: 'juancho@gmail.com',
      name: 'juancho perez',
      tel: "2116032221",
      DNI: "32227109",
      pass: '123456789',
      rol: 'cliente',
    }], {});
    for (let i = 0; i < 5; i++) {
      await queryInterface.bulkInsert('users', [{
        mail: faker.name.firstName()+"@gmail.com",
        name: faker.name.firstName()+faker.name.lastName(),
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