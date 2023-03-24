const { DataTypes, Model } = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class Paseador extends Model {}
  Paseador.init({
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
    }, { sequelize, modelName: 'paseador', tableName: 'paseadores' });


  return Paseador;
};