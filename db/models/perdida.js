const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Perdida extends Model { }

Perdida.init({
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
        allowNull: false,
    },
    caracteristicas: {
        type: DataTypes.STRING,
        allowNull: false,
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
});

module.exports = { Perdida };