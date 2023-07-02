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
      comportamiento: 'camina en dos patas como persona',
      caracteristicas: 'aveces usa sombrero',
      mail: 'juancho@gmail.com',
      tel: "2216032221",
      se_encontro: false,
      UserId: USER_ID.JUANCHO,
    }], {});
    await queryInterface.bulkInsert('perdidas', [{
      zona: ZONAS.PASO,
      fecha_perdida: moment().subtract(2, 'days').toDate(),
      edad: 2,
      sexo: SEXOS.HEMBRA,
      foto: '123456789',
      comportamiento: 'se porta bien solo cuando lo miran',
      caracteristicas: 'es muy chico',
      mail: 'akus.g@gmail.com',
      tel: "2216032226",
      se_encontro: false,
      UserId: USER_ID.AGUSTIN,
    }], {});
    await queryInterface.bulkInsert('perdidas', [{
      zona: ZONAS.ITALIA,
      fecha_perdida: moment().subtract(3, 'days').toDate(),
      edad: 2,
      sexo: SEXOS.MACHO,
      foto: '123456789',
      comportamiento: 'se rasca todo el tiempo nose porque sera',
      caracteristicas: 'tiene olor a perro mojado',
      mail: 'cordgoode@gmail.com',
      tel: "2216032225",
      se_encontro: true,
      UserId: USER_ID.CORDELIA,
    }], {});
    await queryInterface.bulkInsert('perdidas', [{
      zona: ZONAS.MATEU,
      fecha_perdida: moment().subtract(1, 'days').toDate(),
      edad: 2,
      sexo: SEXOS.HEMBRA,
      foto: '123456789',
      comportamiento: 'me roba la comida todos los dias',
      caracteristicas: 'salta y rompe todos los muebles',
      mail: 'nami.w@gmail.com',
      tel: "2216032224",
      se_encontro: false,
      UserId: USER_ID.NAMI,
    }], {});
    await queryInterface.bulkInsert('perdidas', [{
      zona: ZONAS.ROCHA,
      fecha_perdida: moment().subtract(2, 'days').toDate(),
      edad: 2,
      sexo: SEXOS.MACHO,
      foto: '123456789',
      comportamiento: 'Baila cuando escucha musica',
      caracteristicas: 'rasgos de perro de hollywood',
      mail: 'mistyday@gmail.com',
      tel: "2216032223",
      se_encontro: true,
      UserId: USER_ID.MISTY,
    }], {});

 
  },

  async down (queryInterface, Sequelize) {
    // Comandos para revertir la inserción de datos
  }
};