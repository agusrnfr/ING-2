'use strict';
const faker = require('faker');
const User = require('../db/models/mascota.js');
const moment = require('moment');
require('../globals.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('perdidas', [{
      zona: ZONAS.MORENO,
      fecha_perdida: moment().subtract(1, 'days').toDate(),
      edad: 2,
      sexo: SEXOS.MACHO,
      foto: '123456789',
      comportamiento: 'inquieto',
      caracteristicas: 'ladra mucho',
      mail: 'juancho@gmail.com',
      tel: "2216032221",
      se_encontro: false,
      UserId: USER_ID.JUANCHO,
    }], {});

 
  },

  async down (queryInterface, Sequelize) {
    // Comandos para revertir la inserción de datos
  }
};