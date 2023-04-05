const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

  class Mascota extends Model {}

  Mascota.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    raza: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_nacimiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Mascota',
    tableName: 'mascotas',
  });

  return Mascota;
};