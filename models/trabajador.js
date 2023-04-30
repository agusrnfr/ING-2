const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

  class Trabajador extends Model {}

  Trabajador.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zona: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
  }, {
    sequelize,
    modelName: 'Trabajador',
    tableName: 'trabajadores',
  });

  return Trabajador;
};