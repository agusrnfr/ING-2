'use strict';
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      mail: 'lucia@gmail.com',
      name: 'Lucia Diaz',
      tel: "2216032221",
      DNI: "40227109",
      pass: '123456789',
      rol: 'admin',
    }], {});
    await queryInterface.bulkInsert('users', [{
      mail: 'pedro@gmail.com',
      name: 'Pedro Perez',
      tel: "2216032267",
      DNI: "31227109",
      pass: '123456789',
      rol: 'admin',
    }], {});
    await queryInterface.bulkInsert('users', [{
      mail: 'juancho@gmail.com',
      name: 'Juancho Perez',
      tel: "2216032221",
      DNI: "32227109",
      pass: '123456789',
      rol: 'cliente',
    }], {});
    await queryInterface.bulkInsert('users', [{
      mail: 'akus.g@gmail.com',
      name: 'Agustin Garcia',
      tel: "2216473789",
      DNI: "442573678",
      pass: '123456789',
      rol: 'cliente',
    }], {});
    await queryInterface.bulkInsert('users', [{
      mail: 'nami.w@gmail.com',
      name: 'Naomi Diaz',
      tel: "2216469589",
      DNI: "37257378",
      pass: '123456789',
      rol: 'cliente',
    }], {});
    await queryInterface.bulkInsert('users', [{
      mail: 'agusrojasmc@gmail.com',
      name: 'Agustina Rojas',
      tel: "2212212201",
      DNI: "44444444",
      pass: '123456789',
      rol: 'cliente',
    }], {});
    await queryInterface.bulkInsert('users', [{
      mail: 'cordgoode@gmail.com',
      name: 'Cordelia Goode',
      tel: "2212172211",
      DNI: "44542424",
      pass: '123456789',
      rol: 'cliente',
    }], {});
    await queryInterface.bulkInsert('users', [{
      mail: 'mistyday@gmail.com',
      name: 'Misty Day',
      tel: "2212166131",
      DNI: "37542212",
      pass: '123456789',
      rol: 'cliente',
    }], {});
    await queryInterface.bulkInsert('users', [{
      mail: 'ldr1985@gmail.com',
      name: 'Lana Del Rey',
      tel: "2216785218",
      DNI: "44565422",
      pass: '123456789',
      rol: 'cliente',
    }], {});
    for (let i = 0; i < 0; i++) {
      let name = faker.name.firstName();
      let lastName = faker.name.lastName();
      await queryInterface.bulkInsert('users', [{
        mail: name.toLowerCase()+lastName.toLowerCase()+"@gmail.com",
        name: name + " " + lastName,
        tel: faker.datatype.number({ min: 2210000000, max: 2219999999 }),
        DNI: faker.datatype.number({ min: 30000000, max: 50000000 }),
        pass: '123456789',
        rol: 'cliente',
      }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    // Comandos para revertir la inserción de datos
  }
};