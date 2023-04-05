const { DataTypes, Model } = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class Trabajador extends Model {}
  Trabajador.init({
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    apellido: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    zona: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    }, { sequelize, modelName: 'trabajador', tableName: 'trabajadores' });
 
  return Trabajador;
};