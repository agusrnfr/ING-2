'use strict';
module.exports = {
  /** @type {import('sequelize-cli').Migration} */
  async up (queryInterface, Sequelize) {
    const moment = require('moment');
    const UserModel = require('../db/models/user');
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Luna',
      raza: 'Golden Retriever',
      color: 'Dorado',
      fecha_nacimiento: moment('2018-07-15').toDate(),
      observaciones: 'Tiene una mancha blanca en la pata izquierda',
      foto: null,
      UserId: 3,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    // Comandos para revertir la inserción de datos
  }
};
