 'use strict';

 /** @type {import('sequelize-cli').Migration} */
 module.exports = {
   async up (queryInterface, Sequelize) {

    
    await queryInterface.bulkInsert('trabajadores', [{
     nombre: "Nicolas Robin",
     email: "nicoRobin@gmail.com",
     servicio: "Paseador",
     zona: "Tolosa",
     dias: "Lunes,Martes",
     horario: "9:00,14:00",
     estado: true,
    }], {});

    await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Nicolas Robin",
      email: "nicoRobin@gmail.com",
      servicio: "Paseador",
      zona: "Tolosa",
      dias: "Lunes,Martes",
      horario: "9:00,14:00",
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Nicolas Robin",
      email: "nicoRobin@gmail.com",
      servicio: "Paseador",
      zona: "Tolosa",
      dias: "Lunes,Martes",
      horario: "9:00,14:00",
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Nicolas Robin",
      email: "nicoRobin@gmail.com",
      servicio: "Paseador",
      zona: "Tolosa",
      dias: "Lunes,Martes",
      horario: "9:00,14:00",
      estado: true,
     }], {});
 

    await queryInterface.bulkInsert('trabajadores', [{
     nombre: "Jessica Vaisman",
     email: "jessVaisman@gmail.com",
     servicio: "Cuidador,Paseador",
     zona: "Centro",
     dias: "Lunes,Martes",
     horario: "9:00,14:00",
     estado: true,
      }], {});

    await queryInterface.bulkInsert('trabajadores', [{
     nombre: "Victoria Paz",
     email: "vickypeace@gmail.com",
     servicio: "Paseador",
     zona: "Barrio Aeropuerto",
     dias: "Lunes,Martes",
     horario: "9:00,14:00",
     estado: true,
    }], {});

    await queryInterface.bulkInsert('trabajadores', [{
     nombre: "Patitas Felices",
     email: "patitasFe@gmail.com",
     servicio: "Guarderia",
     zona: "Barrio Malvinas",
     dias: "Lunes,Martes,Jueves",
     horario: "9:00,14:00",
     estado: true,
    }], {});

    await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Patitas Felices",
      email: "patitasFe@gmail.com",
      servicio: "Guarderia",
      zona: "Barrio Malvinas",
      dias: "Lunes,Martes,Jueves",
      horario: "9:00,14:00",
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Patitas Felices",
      email: "patitasFe@gmail.com",
      servicio: "Guarderia",
      zona: "Plaza Italia",
      dias: "Lunes,Martes,Jueves",
      horario: "9:00,14:00",
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Patitas Felices",
      email: "patitasFe@gmail.com",
      servicio: "Guarderia",
      zona: "Barrio Malvinas",
      dias: "Lunes,Martes,Jueves",
      horario: "9:00,14:00",
      estado: true,
     }], {});

},

   async down (queryInterface, Sequelize) {
     // Comandos para revertir la inserción de datos
   }

 };
