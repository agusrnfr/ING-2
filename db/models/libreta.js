const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Libreta extends Model { }

Libreta.init({

    fecha: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    practica: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    sequelize,
    modelName: 'Libreta',
    tableName: 'libretas',
    timestamps: false,
});

module.exports = Libreta;