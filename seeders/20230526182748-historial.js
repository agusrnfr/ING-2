'use strict';
const moment = require('moment');


module.exports = {
  up: async  (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('historiales', [{
      fecha: moment().subtract(1, 'year').toDate(),
      practica: 'Vacuna A',
      observacion: '-',
      monto_abonado: '6700',
      monto_beneficio: '2000',
      UserId: 3,
      MascotumId: 1,
      }], {});
 
      await queryInterface.bulkInsert('historiales', [{
      fecha: moment().subtract(8, 'days').toDate(),
      practica: 'Consulta general',
      observacion: 'Tiembla mucho',
      monto_abonado: '3700',
      monto_beneficio: '3000',
      UserId: 3,
      MascotumId: 4,
      }], {});
  
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
