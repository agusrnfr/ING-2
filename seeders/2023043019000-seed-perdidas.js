'use strict';
const faker = require('faker');
const User = require('../db/models/mascota.js');
const moment = require('moment');
require('../globals.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('perdidas', [{
      nombre: "Mimi",
      zona: ZONAS.MORENO,
      fecha_perdida: moment().subtract(1, 'days').toDate(),
      edad: 2,
      sexo: SEXOS.MACHO,
      foto: '/img/perdidas_y_busquedas/perdidas/1.bmp',
      comportamiento: 'camina en dos patas como persona',
      caracteristicas: 'aveces usa sombrero',
      mail: 'juancho@gmail.com',
      tel: "2216032221",
      se_encontro: false,
      UserId: USER_ID.JUANCHO,
    }], {});
    await queryInterface.bulkInsert('perdidas', [{
      nombre: "Diana",
      zona: ZONAS.PASO,
      fecha_perdida: moment().subtract(2, 'days').toDate(),
      edad: 1,
      sexo: SEXOS.HEMBRA,
      foto: '/img/perdidas_y_busquedas/perdidas/2.bmp',
      comportamiento: 'se porta bien solo cuando lo miran',
      caracteristicas: 'le gustan los lujos, solo come cabiar. Recompensa en USD',
      mail: 'akus.g@gmail.com',
      tel: "2216032226",
      se_encontro: false,
      UserId: USER_ID.AGUSTIN,
    }], {});
    await queryInterface.bulkInsert('perdidas', [{
      nombre: "Morocho",
      zona: ZONAS.ITALIA,
      fecha_perdida: moment().subtract(3, 'days').toDate(),
      edad: 3,
      sexo: SEXOS.MACHO,
      foto: '/img/perdidas_y_busquedas/perdidas/3.bmp',
      comportamiento: 'se rasca todo el tiempo nose porque sera',
      caracteristicas: 'tiene olor a perro mojado y ladra a todo lo que produzca sombra',
      mail: 'cordgoode@gmail.com',
      tel: "2216032225",
      se_encontro: false,
      UserId: USER_ID.CORDELIA,
    }], {});
    await queryInterface.bulkInsert('perdidas', [{
      nombre: "Chicha",
      zona: ZONAS.MATEU,
      fecha_perdida: moment().subtract(1, 'days').toDate(),
      edad: 4,
      sexo: SEXOS.HEMBRA,
      foto: '/img/perdidas_y_busquedas/perdidas/4.bmp',
      comportamiento: 'me roba la comida todos los dias',
      caracteristicas: 'salta y rompe todos los muebles, mejor que no lo encuentren',
      mail: 'nami.w@gmail.com',
      tel: "2216032224",
      se_encontro: true,
      UserId: USER_ID.NAMI,
    }], {});
    await queryInterface.bulkInsert('perdidas', [{
      nombre: "Simba",
      zona: ZONAS.ROCHA,
      fecha_perdida: moment().subtract(2, 'days').toDate(),
      edad: 5,
      sexo: SEXOS.MACHO,
      foto: '/img/perdidas_y_busquedas/perdidas/5.bmp',
      comportamiento: 'Baila cuando escucha musica',
      caracteristicas: 'es un perro de hollywood, actuo en varias peliculas',
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