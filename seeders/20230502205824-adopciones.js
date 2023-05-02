'use strict';
const faker = require('faker');
const moment = require('moment');
const { Adopcion } = require('../db/models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const excludeList = [4, 5];
    const razas = ['Mestizo', 'Labrador', 'Pitbull', 'Bulldog'];
    const colores = ['Negro', 'Marrón', 'Blanco', 'Gris'];
    const caracteristicas = ['Juguetón', 'Cariñoso', 'Guardián', 'Activo'];
    const sexos = ['Macho', 'Hembra'];
    const origenes = ['Abandonado', 'Rescatado', 'Entregado por dueño'];
    const edades = [1, 2, 3]; // 1 para cachorro, 2 para adulto, 3 para anciano
    const seAdoptoOptions = [true, false];

    const adopciones = [];

    for (let i = 0; i < 10; i++) {
      let nombre = faker.name.firstName();
      let edad = edades[Math.floor(Math.random() * edades.length)];
      let sexo = sexos[Math.floor(Math.random() * sexos.length)];
      let origen = origenes[Math.floor(Math.random() * origenes.length)];
      let caracteristica = caracteristicas[Math.floor(Math.random() * caracteristicas.length)];
      let raza = razas[Math.floor(Math.random() * razas.length)];
      let color = colores[Math.floor(Math.random() * colores.length)];
      let seAdopto = seAdoptoOptions[Math.floor(Math.random() * seAdoptoOptions.length)];
      let vacunas = faker.lorem.sentence();
      let mail = faker.internet.email();
      let tel = faker.phone.phoneNumber();

      let adopcion = {
        nombre,
        vacunas,
        edad,
        sexo,
        origen,
        caracteristicas,
        mail,
        tel,
        se_adopto: seAdopto,
        raza,
        color,
        createdAt: moment().subtract(i, 'days').toDate(),
        updatedAt: moment().subtract(i, 'days').toDate(),
        UserId: Math.floor(Math.random() * (excludeList[1] - excludeList[0] + 1)) + excludeList[0],
      };

      adopciones.push(adopcion);
    }

    await Adopcion.bulkCreate(adopciones);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('adopciones', null, {});
  }
};