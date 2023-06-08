'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const excludeList = [4, 5];
    const moment = require('moment');
    const Mascota = require('../db/models/mascota.js');
    const faker = require('faker');
/*     await queryInterface.bulkInsert('turnos', [{
      fecha: moment().add(7, 'days').toDate(),
      banda_horaria: 'Mañana',
      estado: 'Pendiente',
      practica: 'Desparasitacion',
      UserId: 3,
      MascotumId: 1,
    }], {}); */
    await queryInterface.bulkInsert('turnos', [{
      fecha: moment().add(8, 'days').toDate(),
      banda_horaria: 'Tarde',
      estado: 'Pendiente',
      practica: 'Consulta general',
      UserId: 6,
      MascotumId: 3,
    }], {});
    await queryInterface.bulkInsert('turnos', [{
      fecha: moment().add(9, 'days').toDate(),
      banda_horaria: 'Tarde',
      estado: 'Pendiente',
      practica: 'Castracion',
      UserId: 4,
      MascotumId: 2,
    }], {});
    await queryInterface.bulkInsert('turnos', [{
      fecha: moment().add(12, 'days').toDate(),
      banda_horaria: 'Tarde',
      estado: 'Pendiente',
      practica: 'Desparasitacion',
      motivoDeRechazo: 'No se puede vacunar porque tiene una enfermedad',
      UserId: 7,
      MascotumId: 10,
    }], {});
    await queryInterface.bulkInsert('turnos', [{
      fecha: moment().add(124, 'days').toDate(),
      banda_horaria: 'Tarde',
      estado: 'Rechazado',
      practica: 'Vacuna A',
      motivoDeRechazo: '',
      UserId: 7,
      MascotumId: 10,
    }], {});

    await queryInterface.bulkInsert('turnos', [{
      fecha: moment('2023-06-01').toDate(),
      banda_horaria: 'Tarde',
      estado: 'Rechazado',
      practica: 'Consulta general',
      motivoDeRechazo: 'Ese dia cerramos',
      UserId: 4,
      MascotumId: 2,
    }], {});

    await queryInterface.bulkInsert('turnos', [{
      fecha: moment().hour(9).minute(30).toDate(),
      banda_horaria: 'Mañana',
      estado: 'Aceptado',
      practica: 'Consulta general',
      UserId: 3,
      MascotumId: 1,
    }], {});

    await queryInterface.bulkInsert('turnos', [{
      fecha: moment().hour(9).minute(30).toDate(),
      banda_horaria: 'Mañana',
      estado: 'Aceptado',
      practica: 'Desparasitacion',
      UserId: 3,
      MascotumId: 1,
    }], {});

    await queryInterface.bulkInsert('turnos', [{
      fecha:  moment().hour(10).minute(30).toDate(),
      banda_horaria: 'Mañana',
      estado: 'Aceptado',
      practica: 'Vacuna A',
      UserId: 3,
      MascotumId: 1,
    }], {});

    await queryInterface.bulkInsert('turnos', [{
      fecha:  moment().hour(10).minute(30).toDate(),
      banda_horaria: 'Mañana',
      estado: 'Aceptado',
      practica: 'Vacuna A',
      UserId: 3,
      MascotumId: 8,
    }], {});

    await queryInterface.bulkInsert('turnos', [{
      fecha: moment().hour(9).minute(30).toDate(),
      banda_horaria: 'Mañana',
      estado: 'Aceptado',
      practica: 'Vacuna B',
      UserId: 3,
      MascotumId: 1,
    }], {});

    await queryInterface.bulkInsert('turnos', [{
      fecha:  moment().hour(14).minute(30).toDate(),
      banda_horaria: 'Tarde',
      estado: 'Aceptado',
      practica: 'Consulta general',
      UserId: 4,
      MascotumId: 2,
    }], {});

/*     await queryInterface.bulkInsert('turnos', [{
      fecha: moment().add(124, 'days').toDate(),
      banda_horaria: 'Tarde',
      estado: 'Aceptado',
      practica: 'Consulta general',
      UserId: 3,
      MascotumId: 1,
    }], {}); 
    for (let i = 0; i < 2; i++) {
      let dueño = faker.datatype.number({ min: 3, max: 10 });
      if (excludeList.includes(dueño)) continue; // valido si el dueño está en la lista de exclusiones
      let mascota = await Mascota.findAll({ where: { UserId: dueño } });
      if (mascota.length == 0) continue; //valido que el dueño tenga mascotas
      await queryInterface.bulkInsert('turnos', [{
        fecha: faker.date.future(),
        banda_horaria: faker.random.arrayElement(['Mañana', 'Tarde']),
        estado: faker.random.arrayElement(['Pendiente', 'Aceptado', 'Rechazado']),
        practica: faker.random.arrayElement(['Consulta general', 'Vacuna A', 'Vacuna B', 'Desparasitacion', 'Castracion']),
        UserId: dueño,
        MascotumId: faker.random.arrayElement(mascota).id,
        motivoDeRechazo:
      }], {});
    }
      */
  },

  down: async (queryInterface, Sequelize) => {
    // Comandos para revertir la inserción de datos
  }
};