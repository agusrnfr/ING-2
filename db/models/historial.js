const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');



class Historial extends Model { }

Historial.init({
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    practica: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observacion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    monto_abonado: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    monto_beneficio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Historial',
    tableName: 'historiales',
});

module.exports = { Historial };