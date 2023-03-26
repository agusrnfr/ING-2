'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    //USUARIOS
    for (let i = 0; i < 5; i++) {
      await queryInterface.bulkInsert('users', [{
        
        user: faker.name.firstName(),
        name: faker.name.firstName()+faker.name.lastName(),
        rol: 'user',
        pass: '123'
      }], {});
      }

    //TRABAJADORES
    for (let i = 0; i < 5; i++) {
      await queryInterface.bulkInsert('trabajadores', [{
  
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        zona: "Ensenada",
      }], {});
      }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
