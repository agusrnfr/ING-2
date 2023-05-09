'use strict';
const faker = require('faker');
const moment = require('moment');
const { Adopcion } = require('../db/models/adopcion');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const excludeList = [4, 5];
    const nombres= ['Negro','Umi','Kira','Milaneso','Bobi','Eren','Zoro','Nami'];
    const razas = ['Mestizo', 'Labrador', 'Caniche', 'Bulldog'];
    const colores = ['Negro', 'Marrón', 'Blanco', 'Gris'];
    const caracteristica = ['Juguetón', 'Cariñoso', 'Guardián', 'Activo', 'Asustadizo','Serio'];
    const sexos = ['Macho', 'Hembra'];
    const origenes = ['Abandonado', 'Rescatado', 'Entregado por dueño','Hijo de mi mascota'];
    const edades = [1, 2, 3,7,10,6,8]; 
    const seAdoptoOptions = [true,false];
    const vacunasv = ['antirrabica','vacuna A','vacuna B'];

    const adopciones = [];

    for (let i = 0; i < 5; i++) {
      let dueño = faker.datatype.number({ min: 3, max: 10 });
      let nombre = nombres.splice (Math.floor(Math.random() * nombres.length),1) [0];
      let edad = edades[Math.floor(Math.random() * edades.length)];
      let sexo = sexos[Math.floor(Math.random() * sexos.length)];
      let origen = origenes[Math.floor(Math.random() * origenes.length)];
      let caracteristicas = caracteristica[Math.floor(Math.random() * caracteristica.length)];
      let raza = razas[Math.floor(Math.random() * razas.length)];
      let color = colores[Math.floor(Math.random() * colores.length)];
      let seAdopto = seAdoptoOptions[Math.floor(Math.random() * seAdoptoOptions.length)];
      let vacunas = vacunasv[Math.floor(Math.random() * vacunasv.length)];
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
        UserId: dueño,
      };

      adopciones.push(adopcion);
    }

    await queryInterface.bulkInsert('adopciones', adopciones);
  },

  down: async (queryInterface, Sequelize) => {
    //await queryInterface.bulkDelete('adopciones', null, {});
  }
};