const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

  class Campania extends Model {}

  Campania.init({
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Campania',
    tableName: 'campanias',
  });

  return Campania;
};