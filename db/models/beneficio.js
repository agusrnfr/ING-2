const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Beneficio extends Model { }

Beneficio.init({
    monto_beneficio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    usado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Beneficio',
    tableName: 'beneficios',
    timestamps: false,
});

module.exports = Beneficio;