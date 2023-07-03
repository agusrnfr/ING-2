/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('cruzas', [{
            texto_libre: 'Busco novia para mi perro',
            mail: 'mistyday@gmail.com',
            tel: '2212166131',
            se_muestra: true,
            MascotumId: 12,
        }], {});
        await queryInterface.bulkInsert('cruzas', [{
            texto_libre: 'Es un Golden muy lindo',
            mail: 'cordgoode@gmail.com',
            tel: '2212172211',
            se_muestra: true,
            MascotumId: 11,
        }], {});
    },
    async down(queryInterface, Sequelize) {
        // Comandos para revertir la inserción de datos
    }
};