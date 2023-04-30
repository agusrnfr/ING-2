'use strict';
module.exports = {
  /** @type {import('sequelize-cli').Migration} */
  async up (queryInterface, Sequelize) {
    const moment = require('moment');
    const User = require('../models/user')(queryInterface.sequelize, Sequelize.DataTypes);
    const user = await User.findByPk(3);
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Luna',
      raza: 'Golden Retriever',
      color: 'Dorado',
      fecha_nacimiento: moment('2018-07-15').toDate(),
      observaciones: 'Tiene una mancha blanca en la pata izquierda',
      foto: null,
      UserId: null, // SOLUCIONAR PONER UN FK
    }], {});
  },

  async down (queryInterface, Sequelize) {
    // Comandos para revertir la inserción de datos
  }
};
