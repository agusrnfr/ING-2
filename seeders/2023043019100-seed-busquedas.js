'use strict';
const faker = require('faker');
const User = require('../db/models/mascota.js');
const moment = require('moment');
require('../globals.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('busquedas', [{
      zona: ZONAS.MORENO,
      fecha_encuentro: moment().subtract(1, 'days').toDate(),
      edad: 2,
      sexo: SEXOS.MACHO,
      foto: '/img/perdidas_y_busquedas/busquedas/1.bmp',
      comportamiento: 'es tranquilo',
      caracteristicas: 'aulla a la luna por las noches',
      mail: 'juancho@gmail.com',
      tel: "2216032221",
      se_encontro: false,
      UserId: USER_ID.JUANCHO,
    }], {});
    await queryInterface.bulkInsert('busquedas', [{
      zona: ZONAS.PASO,
      fecha_encuentro: moment().subtract(2, 'days').toDate(),
      edad: 1,
      sexo: SEXOS.HEMBRA,
      foto: '/img/perdidas_y_busquedas/busquedas/2.bmp',
      comportamiento: 'come poquito',
      caracteristicas: 'flaco',
      mail: 'akus.g@gmail.com',
      tel: "2216032226",
      se_encontro: false,
      UserId: USER_ID.AGUSTIN,
    }], {});
    await queryInterface.bulkInsert('busquedas', [{
      zona: ZONAS.ITALIA,
      fecha_encuentro: moment().subtract(3, 'days').toDate(),
      edad: 3,
      sexo: SEXOS.MACHO,
      foto: '/img/perdidas_y_busquedas/busquedas/3.bmp',
      comportamiento: 'actua como bombero',
      caracteristicas: 'tiene manchas de pintura',
      mail: 'cordgoode@gmail.com',
      tel: "2216032225",
      se_encontro: false,
      UserId: USER_ID.CORDELIA,
    }], {});
    await queryInterface.bulkInsert('busquedas', [{
      zona: ZONAS.MATEU,
      fecha_encuentro: moment().subtract(1, 'days').toDate(),
      edad: 4,
      sexo: SEXOS.HEMBRA,
      foto: '/img/perdidas_y_busquedas/busquedas/4.bmp',
      comportamiento: 'le gusta esconderse detras de las cortinas',
      caracteristicas: 'es amarillo',
      mail: 'nami.w@gmail.com',
      tel: "2216032224",
      se_encontro: true,
      UserId: USER_ID.NAMI,
    }], {});
    await queryInterface.bulkInsert('busquedas', [{
      zona: ZONAS.ROCHA,
      fecha_encuentro: moment().subtract(2, 'days').toDate(),
      edad: 5,
      sexo: SEXOS.MACHO,
      foto: '/img/perdidas_y_busquedas/busquedas/5.bmp',
      comportamiento: 'mira memes por internet',
      caracteristicas: 'le gusta romper sillones',
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