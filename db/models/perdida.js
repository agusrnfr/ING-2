const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Perdida extends Model { }

Perdida.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    zona: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_perdida: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    comportamiento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    caracteristicas: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    se_encontro: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Perdida',
    tableName: 'perdidas',
    timestamps: false,
});

module.exports = Perdida;