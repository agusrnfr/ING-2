'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const excludeList = [4, 5];
    const moment = require('moment');
    const Mascota = require('../db/models/mascota.js');
    const faker = require('faker');
    await queryInterface.bulkInsert('turnos', [{
      fecha: moment().add(7, 'days').toDate(),
      banda_horaria: 'Mañana',
      estado: 'Pendiente',
      practica: 'Desparasitacion',
      UserId: 3,
      MascotumId: 1,
    }], {});
    await queryInterface.bulkInsert('turnos', [{
      fecha: moment().add(124, 'days').toDate(),
      banda_horaria: 'Tarde',
      estado: 'Rechazado',
      practica: 'Vacuna A',
      UserId: 3,
      MascotumId: 1,
    }], {});
    await queryInterface.bulkInsert('turnos', [{
      fecha: moment('2023-06-01').toDate(),
      banda_horaria: 'Tarde',
      estado: 'Rechazado',
      practica: 'Consulta general',
      UserId: 4,
      MascotumId: 2,
    }], {});
    await queryInterface.bulkInsert('turnos', [{
      fecha: moment().add(124, 'days').toDate(),
      banda_horaria: 'Tarde',
      estado: 'Aceptado',
      practica: 'Consulta general',
      UserId: 3,
      MascotumId: 1,
    }], {});
    for (let i = 0; i < 20; i++) {
      let dueño = faker.datatype.number({ min: 3, max: 10 });
      if (excludeList.includes(dueño)) continue; // valido si el dueño está en la lista de exclusiones
      let mascota = await Mascota.findAll({ where: { UserId: dueño } });
      if (mascota.length == 0) continue; //valido que el dueño tenga mascotas
      await queryInterface.bulkInsert('turnos', [{
        fecha: faker.date.future(),
        banda_horaria: faker.random.arrayElement(['Mañana', 'Tarde']),
        estado: faker.random.arrayElement(['Pendiente', 'Aceptado', 'Rechazado']),
        practica: faker.random.arrayElement(['Consulta general', 'Vacuna A', 'Vacuna B', 'Desparasitacion']),
        UserId: dueño,
        MascotumId: faker.random.arrayElement(mascota).id,
      }], {});
    }
      
  },

  down: async (queryInterface, Sequelize) => {
    // Comandos para revertir la inserción de datos
  }
};