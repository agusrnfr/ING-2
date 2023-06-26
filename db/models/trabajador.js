const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Trabajador extends Model { }

Trabajador.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  servicio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zona: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  dias: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  sequelize,
  modelName: 'Trabajador',
  tableName: 'trabajadores',
});

module.exports = Trabajador;