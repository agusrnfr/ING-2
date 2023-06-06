'use strict';
require('../globals.js');
module.exports = {
  /** @type {import('sequelize-cli').Migration} */
  async up(queryInterface, Sequelize) {
    const moment = require('moment');
    const faker = require('faker');
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Luna',
      raza: RAZA.GOLDEN_RETRIEVER,
      color: 'Dorado',
      fecha_nacimiento: moment('2018-07-15').toDate(),
      observaciones: 'Tiene una mancha blanca en la pata izquierda',
      foto: '/img/profile_pets/imagen-1685981294467',
      UserId: USER_ID.JUANCHO,
    }], {});
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Diana',
      raza: RAZA.PITBULL,
      color: 'Blanco',
      fecha_nacimiento: moment('2019-05-17').toDate(),
      observaciones: 'Es juguetona y le gusta correr',
      foto: null,
      UserId: USER_ID.AGUSTIN,
    }], {});
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Leona',
      raza: RAZA.CRUZA,
      color: 'Negra',
      fecha_nacimiento: moment('2018-01-12').toDate(),
      observaciones: 'Es panzona y le gusta dormir',
      foto: null,
      UserId: USER_ID.AGUSTINA,
    }], {});
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Mimi',
      raza: RAZA.CHIHUAHUA,
      color: 'Blanca',
      fecha_nacimiento: moment('2018-01-12').toDate(),
      observaciones: 'Ladra mucho y le gusta comer',
      foto: '/img/profile_pets/imagen-1685981332488',
      UserId: USER_ID.JUANCHO,
    }], {});
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Bart',
      raza: RAZA.SALCHICHA,
      color: 'Marron',
      fecha_nacimiento: moment('2018-01-12').toDate(),
      observaciones: 'Es muy cariñoso y le gusta jugar con la pelota',
      foto: null,
      UserId: USER_ID.NAMI,
    }], {});
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Chuchi',
      raza: RAZA.SALCHICHA,
      color: 'Marron',
      fecha_nacimiento: moment().clone().subtract(5, 'months').toDate(),
      observaciones: 'Es muy cariñoso y le gusta jugar con la pelota',
      foto: null,
      UserId: USER_ID.AGUSTINA,
    }], {});
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Vani',
      raza: RAZA.BULLDOG,
      color: 'Negro',
      fecha_nacimiento: moment().clone().subtract(1, 'months').toDate(),
      observaciones: 'Es muy cariñoso y le gusta jugar con la pelota',
      foto: '/img/profile_pets/imagen-1685981344093',
      UserId: USER_ID.JUANCHO,
    }], {});
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Rudo',
      raza: RAZA.GOLDEN_RETRIEVER,
      color: 'Negro',
      fecha_nacimiento: moment().clone().subtract(3, 'months').toDate(),
      observaciones: 'Es muy cariñoso y le gusta jugar con la pelota',
      foto: '/img/profile_pets/imagen-1685981322357',
      UserId: USER_ID.JUANCHO,
    }], {});
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Syndra',
      raza: RAZA.CRUZA,
      color: 'Negro',
      fecha_nacimiento: moment().clone().subtract(6, 'months').toDate(),
      observaciones: 'Es muy cariñoso y le gusta jugar con la pelota',
      foto: null,
      UserId: USER_ID.AGUSTINA,
    }], {});
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Salem',
      raza: RAZA.CRUZA,
      color: 'Negro',
      fecha_nacimiento: moment().clone().subtract(3, 'months').toDate(),
      observaciones: 'Es muy cariñoso y le gusta jugar con la pelota',
      foto: null,
      UserId: USER_ID.CORDELIA,
    }], {});
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Stevie',
      raza: RAZA.GOLDEN_RETRIEVER,
      color: 'Amarillo',
      fecha_nacimiento: moment().clone().subtract(5, 'months').toDate(),
      observaciones: 'Es muy cariñoso y activo',
      foto: '/img/profile_pets/imagen-1685981322357',
      UserId: USER_ID.MISTY,
    }], {});
    for (let i = 0; i < 0; i++) {
      const today = new Date();
      const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
      await queryInterface.bulkInsert('mascotas', [{
        nombre: faker.name.firstName(),
        raza: faker.random.arrayElement([RAZA.GOLDEN_RETRIEVER, RAZA.CANICHE, RAZA.LABRADOR , RAZA.BULLDOG, RAZA.PITBULL, RAZA.PASTOR_ALEMAN, RAZA.CRUZA]),
        color: faker.random.arrayElement(['Negro', 'Blanco', 'Amarillo', 'Marron', 'Blanco y Negro', 'Amarillo y Marron', 'Gris', 'Gris y Blanco']),
        fecha_nacimiento: faker.date.between(minDate, today),
        observaciones: faker.random.arrayElement(['Es muy jugueton', 'Es muy nervioso', 'Agresivo', 'Calmado']),
        foto: null,
        UserId: faker.datatype.number({ min: 3, max: 8 }),
      }], {});
    }
  },

  async down(queryInterface, Sequelize) {
    // Comandos para revertir la inserción de datos
  }
};