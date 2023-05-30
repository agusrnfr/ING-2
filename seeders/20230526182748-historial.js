'use strict';
const moment = require('moment');


module.exports = {
  up: async  (queryInterface, Sequelize) => {
 
      await queryInterface.bulkInsert('historiales', [{
      fecha: moment().subtract(8, 'days').toDate(),
      practica: 'Consulta general',
      observacion: 'Tiene muchas pulgas',
      monto_abonado: '3700',
      monto_beneficio: '3',
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
