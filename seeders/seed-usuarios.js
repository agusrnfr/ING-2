'use strict';
const { query } = require('express');
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      mail: 'lucia@gmail.com',
      name: 'lucia diaz',
      rol: 'admin',
      pass: '123',
    }], {});
    for (let i = 0; i < 5; i++) {
      await queryInterface.bulkInsert('users', [{
        mail: faker.name.firstName()+"@gmail.com",
        name: faker.name.firstName()+faker.name.lastName(),
        rol: 'user',
        pass: '123'
      }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    // Comandos para revertir la inserción de datos
  }
};