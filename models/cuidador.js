const { DataTypes, Model } = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class Cuidador extends Model {}
  Cuidador.init({
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    apellido: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    disponibilidad: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
    },
    }, { sequelize, modelName: 'cuidador',tableName: 'cuidadores' });


  return Cuidador;
};

