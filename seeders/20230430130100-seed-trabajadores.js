 'use strict';
 require('../globals.js');
 /** @type {import('sequelize-cli').Migration} */
 module.exports = {
   async up (queryInterface, Sequelize) {

    
    await queryInterface.bulkInsert('trabajadores', [{
     nombre: "Nicolas Robin",
     email: "nicoRobin@gmail.com",
     servicio: "Paseador|Cuidador",
     zona: ZONAS.PASO,
     dias: "Lunes,Martes",
     horario: "9:00,14:00",
     estado: true,
    }], {});

    await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Agustin Legorburu",
      email: "aguslegor@gmail.com",
      servicio: "Paseador|Cuidador",
      zona: ZONAS.MORENO,
      dias: "Lunes,Martes",
      horario: "9:00,14:00",
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Virginia Fernandez",
      email: "virgi.g@gmail.com",
      servicio: "Paseador|Cuidador",
      zona: ZONAS.MORENO,
      dias: "Lunes,Martes",
      horario: "9:00,14:00",
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Franchesco Puan",
      email: "puan@gmail.com",
      servicio: "Paseador|Cuidador",
      zona: ZONAS.MORENO,
      dias: "Lunes,Martes",
      horario: "9:00,14:00",
      estado: true,
     }], {});
 

    await queryInterface.bulkInsert('trabajadores', [{
     nombre: "Jessica Vaisman",
     email: "jessVaisman@gmail.com",
     servicio: "Paseador|Cuidador",
     zona: ZONAS.MORENO,
     dias: "Lunes,Martes",
     horario: "9:00,14:00",
     estado: true,
      }], {});

    await queryInterface.bulkInsert('trabajadores', [{
     nombre: "Victoria Paz",
     email: "vickypeace@gmail.com",
     servicio: "Paseador|Cuidador",
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
      nombre: "Callejeritos",
      email: "callejeritos@gmail.com",
      servicio: "Guarderia",
      zona: ZONAS.ISLAS_MALVINAS,
      dias: "Lunes,Martes,Jueves",
      horario: "9:00,14:00",
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Mascotas a salvo",
      email: "mascotas@gmail.com",
      servicio: "Guarderia",
      zona: ZONAS.MORENO,
      dias: "Lunes,Martes,Jueves",
      horario: "9:00,14:00",
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Puppys & Co",
      email: "puppys@gmail.com",
      servicio: "Guarderia",
      zona: ZONAS.PASO,
      dias: "Lunes,Martes,Jueves",
      horario: "9:00,14:00",
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Orejitas contentas",
      email: "orejitas@gmail.com",
      servicio: "Guarderia",
      zona: ZONAS.ROCHA,
      dias: "Lunes,Martes,Jueves",
      horario: "9:00,14:00",
      estado: true,
     }], {});

     await queryInterface.bulkInsert('trabajadores', [{
      nombre: "Huellitas la plata",
      email: "Huellitas@gmail.com",
      servicio: "Guarderia",
      zona: ZONAS.ISLAS_MALVINAS,
      dias: "Lunes,Martes,Jueves",
      horario: "9:00,14:00",
      estado: true,
     }], {});

},

   async down (queryInterface, Sequelize) {
     // Comandos para revertir la inserción de datos
   }

 };
