'use strict';
module.exports = {
  /** @type {import('sequelize-cli').Migration} */
  async up (queryInterface, Sequelize) {
    const moment = require('moment');
    const faker = require('faker');
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Luna',
      raza: 'Golden Retriever',
      color: 'Dorado',
      fecha_nacimiento: moment('2018-07-15').toDate(),
      observaciones: 'Tiene una mancha blanca en la pata izquierda',
      foto: null,
      UserId: 3,
    }], {});
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Diana',
      raza: 'Pitbull',
      color: 'Blanco',
      fecha_nacimiento: moment('2019-05-17').toDate(),
      observaciones: 'Es juguetona y le gusta correr',
      foto: null,
      UserId: 4,
    }], {});
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Leona',
      raza: 'Cruza',
      color: 'Negra',
      fecha_nacimiento: moment('2018-01-12').toDate(),
      observaciones: 'Es panzona y le gusta dormir',
      foto: null,
      UserId: 6,
    }], {});
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Mimi',
      raza: 'Caniche',
      color: 'Blanca',
      fecha_nacimiento: moment('2018-01-12').toDate(),
      observaciones: 'Ladra mucho y le gusta comer',
      foto: null,
      UserId: 3,
    }], {});
    await queryInterface.bulkInsert('mascotas', [{
      nombre: 'Bart',
      raza: 'Salchicha',
      color: 'Marron',
      fecha_nacimiento: moment('2018-01-12').toDate(),
      observaciones: 'Es muy cariñoso y le gusta jugar con la pelota',
      foto: null,
      UserId: 5,
    }], {});
    for (let i = 0; i < 10; i++) {
      await queryInterface.bulkInsert('mascotas', [{
        nombre: faker.name.firstName(),
        raza: faker.random.arrayElement(['Golden Retriever', 'Caniche', 'Labrador', 'Bulldog', 'Pitbull', 'Pastor Aleman', 'Cruza']),
        color: faker.random.arrayElement(['Negro', 'Blanco', 'Amarillo', 'Marron', 'Blanco y Negro', 'Amarillo y Marron', 'Gris', 'Gris y Blanco']),
        fecha_nacimiento: faker.date.future(),
        observaciones: faker.random.arrayElement(['Es muy jugueton', 'Es muy nervioso', 'Agresivo','Calmado']),
        foto: null,
        UserId: faker.datatype.number({ min: 3, max: 8 }),
      }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    // Comandos para revertir la inserción de datos
  }
};