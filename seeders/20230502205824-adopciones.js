 'use strict';
 const faker = require('faker');
 const moment = require('moment');
 const { Adopcion } = require('../db/models/adopcion');
 require('../globals.js');

 module.exports = {
   up: async (queryInterface, Sequelize) => {
    const excludeList = [4, 5];
    const nombres= ['Negro','Umi','Kira','Milaneso','Bobi','Eren','Zoro','Nami'];
    //const RAZA = ['Mestizo', 'Labrador', 'Caniche', 'Bulldog'];
    const colores = ['Negro', 'Marrón', 'Blanco', 'Gris'];
    const caracteristica = ['Juguetón', 'Cariñoso', 'Guardián', 'Activo', 'Asustadizo','Serio'];
    const sexos = ['Macho', 'Hembra'];
    const origenes = ['Abandonado', 'Rescatado', 'Entregado por dueño','Hijo de mi mascota'];
    const edades = [1, 2, 3,7,10,6,8]; 
    const seAdoptoOptions = [true,false];
    const vacunasv = [true, false];
    const tipos = ['meses', 'años'];


    await queryInterface.bulkInsert('adopciones', [{
      nombre: 'Luffy',
      raza: 'colly',
      color: 'Manteca',
      caracteristicas: 'Docil',
      sexo: 'Macho',
      origen: 'Rescatado',
      edad: '3',
      tipo_edad: 'años',
      se_adopto: false,
      vacunas: false,
      UserId: 7,
      mail: 'cordgoode@gmail.com',
      tel: 2213566567,
    }], {});

    await queryInterface.bulkInsert('adopciones', [{
      nombre: 'Zoro',
      raza: 'Dogo',
      color: 'blanco',
      caracteristicas: 'serio',
      sexo: 'Macho',
      origen: 'Refugiado',
      edad: '5',
      tipo_edad: 'años',
      se_adopto: false,
      vacunas: false,
      UserId: 9,
      mail: 'deanswift@gmail.com',
      tel: 2213432727,
    }], {});

    await queryInterface.bulkInsert('adopciones', [{
      nombre: 'Kira',
      raza: 'caniche',
      color: 'marron',
      caracteristicas: 'juguetona',
      sexo: 'Hembra',
      origen: 'refugiada',
      edad: '4',
      tipo_edad: 'meses',
      se_adopto: false,
      vacunas: true,
      UserId: 6,
      mail: 'agusrojasmc@gmail.com',
      tel: 2212212201,
    }], {});

    await queryInterface.bulkInsert('adopciones', [{
      nombre: 'Nami',
      raza: 'siberiano',
      color: 'blanco con gris',
      caracteristicas: 'juguetona',
      sexo: 'Hembra',
      origen: 'Rescatada',
      edad: '2',
      tipo_edad: 'Años',
      se_adopto: false,
      vacunas: true,
      UserId: 6,
      mail: 'agusrojasmc@gmail.com',
      tel: 2212212201,
    }], {});


    await queryInterface.bulkInsert('adopciones', [{
      nombre: 'chacha',
      raza: RAZA.CRUZA,
      color: 'gris',
      caracteristicas: 'frenetica',
      sexo: 'Hembra',
      origen: 'rescatada',
      edad: '2',
      tipo_edad: 'años',
      se_adopto: true,
      vacunas: true,
      UserId: 3,
      mail: 'agusrojasmc@gmail.com',
      tel: 2116032221,
      fecha_adopcion: moment().subtract(1, 'days').toDate(),
    }], {});

    await queryInterface.bulkInsert('adopciones', [{
      nombre: 'chicha',
      raza: RAZA.CRUZA,
      color: 'gris',
      caracteristicas: 'rabiosa',
      sexo: 'Hembra',
      origen: 'rescatada',
      edad: '1',
      tipo_edad: 'años',
      se_adopto: true,
      vacunas: true,
      UserId: 3,
      mail: 'agusrojasmc@gmail.com',
      tel: 2116032221,
      fecha_adopcion: moment().subtract(2, 'days').toDate(),
    }], {});

    await queryInterface.bulkInsert('adopciones', [{
      nombre: 'Umi',
      raza: RAZA.CRUZA,
      color: 'gris',
      caracteristicas: 'juguetona',
      sexo: SEXOS.MACHO,
      origen: 'rescatada',
      edad: '2',
      tipo_edad: 'años',
      se_adopto: true,
      vacunas: false,
      UserId: 3,
      mail: 'agusrojasmc@gmail.com',
      tel: 2116032221,
      fecha_adopcion: moment().subtract(3, 'days').toDate(),
    }], {});

  //   for (let i = 0; i < 1; i++) {
  //      let dueño = faker.datatype.number({ min: 3, max: 10 });
  //      let nombre = nombres.splice (Math.floor(Math.random() * nombres.length),1) [0];
  //      let edad = edades[Math.floor(Math.random() * edades.length)];
  //      let tipo_edad = tipos[Math.floor(Math.random() * tipos.length)];
  //      let sexo = sexos[Math.floor(Math.random() * sexos.length)];
  //      let origen = origenes[Math.floor(Math.random() * origenes.length)];
  //      let caracteristicas = caracteristica[Math.floor(Math.random() * caracteristica.length)];
  //      let raza = RAZA[Math.floor(Math.random() * RAZA.length)];
  //      let color = colores[Math.floor(Math.random() * colores.length)];
  //      let seAdopto = seAdoptoOptions[Math.floor(Math.random() * seAdoptoOptions.length)];
  //      let vacunas = vacunasv[Math.floor(Math.random() * vacunasv.length)];
  //      let mail = faker.internet.email();
  //      let tel = faker.phone.phoneNumber();

  //   await queryInterface.bulkInsert('adopciones',[{
  //     nombre: nombre,
  //     raza: raza,
  //     color: color,
  //     caracteristicas: caracteristicas,
  //     sexo: sexo,
  //     origen: origen,
  //     edad:edad,
  //     tipo_edad: tipo_edad,
  //     se_adopto: seAdopto,
  //     vacunas: vacunas,
  //     UserId: dueño,
  //     mail: mail,
  //     tel: tel,
  //  }], {});
  // }
},

  down: async (queryInterface, Sequelize) => {
     //await queryInterface.bulkDelete('adopciones', null, {});
  }
 };