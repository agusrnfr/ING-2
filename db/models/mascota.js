const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Mascota extends Model { }

Mascota.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  raza: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  observaciones: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Mascota',
  tableName: 'mascotas',
});

module.exports = { Mascota };