'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const moment = require('moment');
    await queryInterface.bulkInsert('turnos', [{
      fecha: moment().add(7, 'days').toDate(),
      banda_horaria: 'Mañana',
      estado: 'Pendiente',
      practica: 'Desparasitacion',
      UserId: null, // SOLUCIONAR PONER UN FK
      MascotumId: null, // SOLUCIONAR PONER UN FK
    }], {});
    await queryInterface.bulkInsert('turnos', [{
      fecha: moment().add(124, 'days').toDate(),
      banda_horaria: 'Tarde',
      estado: 'Pendiente',
      practica: 'Vacuna A',
      UserId: null, // SOLUCIONAR PONER UN FK
      MascotumId: null, // SOLUCIONAR PONER UN FK
    }], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    // Comandos para revertir la inserción de datos
  }
};