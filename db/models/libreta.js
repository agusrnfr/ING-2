const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Libreta extends Model { }

Libreta.init({
    desparacitacion_aplicada: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vacuna_aplicada: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fecha_desparacitacion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fecha_vacuna: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Libreta',
    tableName: 'libretas',
});

module.exports = { Libreta };