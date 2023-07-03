 'use strict';
 require('../globals.js');
 /** @type {import('sequelize-cli').Migration} */
 module.exports = {
   async up (queryInterface, Sequelize) {

    
    await queryInterface.bulkInsert('trabajadores', [{
     nombre: "Nicolas Robin",
     email: "nicoRobin@gmail.com",
     servicio: "Paseador",
     zona: ZONAS.PASO,
     dias: "Lunes,Martes",
     horario: "9:00,14:00",
     estado: true,
    }], {});

    await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Nicolas Robin",
      email: "nicoRobin@gmail.com",
      servicio: "Paseador",
      zona: ZONAS.MORENO,
      dias: "Lunes,Martes",
      horario: "9:00,14:00",
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Nicolas Robin",
      email: "nicoRobin@gmail.com",
      servicio: "Paseador",
      zona: ZONAS.MORENO,
      dias: "Lunes,Martes",
      horario: "9:00,14:00",
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Nicolas Robin",
      email: "nicoRobin@gmail.com",
      servicio: "Paseador",
      zona: ZONAS.MORENO,
      dias: "Lunes,Martes",
      horario: "9:00,14:00",
      estado: true,
     }], {});
 

    await queryInterface.bulkInsert('trabajadores', [{
     nombre: "Jessica Vaisman",
     email: "jessVaisman@gmail.com",
     servicio: "Cuidador,Paseador",
     zona: ZONAS.MORENO,
     dias: "Lunes,Martes",
     horario: "9:00,14:00",
     estado: true,
      }], {});

    await queryInterface.bulkInsert('trabajadores', [{
     nombre: "Victoria Paz",
     email: "vickypeace@gmail.com",
     servicio: "Paseador",
     zona: ZONAS.SAN_MARTIN,
     dias: "Lunes,Martes",
     horario: "9:00,14:00",
     estado: true,
    }], {});

    await queryInterface.bulkInsert('trabajadores', [{
     nombre: "Patitas Felices",
     email: "patitasFe@gmail.com",
     servicio: "Guarderia",
     zona: ZONAS.ISLAS_MALVINAS,
     dias: "Lunes,Martes,Jueves",
     horario: "9:00,14:00",
     estado: true,
    }], {});

    await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Patitas Felices",
      email: "patitasFe@gmail.com",
      servicio: "Guarderia",
      zona: ZONAS.ISLAS_MALVINAS,
      dias: "Lunes,Martes,Jueves",
      horario: "9:00,14:00",
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Patitas Felices",
      email: "patitasFe@gmail.com",
      servicio: "Guarderia",
      zona: ZONAS.MORENO,
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Patitas Felices",
      email: "patitasFe@gmail.com",
      servicio: "Guarderia",
      zona: ZONAS.PASO,
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Patitas Felices",
      email: "patitasFe@gmail.com",
      servicio: "Guarderia",
      zona: ZONAS.ROCHA,
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Patitas Felices",
      email: "patitasFe@gmail.com",
      servicio: "Guarderia",
      zona: ZONAS.ISLAS_MALVINAS,
      estado: true,
     }], {});

},

   async down (queryInterface, Sequelize) {
     // Comandos para revertir la inserción de datos
   }

 };
