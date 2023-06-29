const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Cruza extends Model { }

Cruza.init({
    texto_libre: {
        type: DataTypes.TEXT,
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
    se_muestra: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Cruza',
    tableName: 'cruzas',
});

module.exports = Cruza;