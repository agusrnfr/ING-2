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
    defaultValue: "Ninguna",
    allowNull: true,
  },
  foto: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eliminada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Mascota',
  tableName: 'mascotas',
  timestamps: false,
});

//eliminado logico
Mascota.addScope('defaultScope', {
  where: {
    eliminada: false
  }
});

module.exports = Mascota;