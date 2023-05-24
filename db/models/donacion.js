const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Donacion extends Model { }

Donacion.init({
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Donacion',
  tableName: 'donaciones',
});

module.exports = Donacion;