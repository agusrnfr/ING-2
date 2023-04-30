const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Beneficio extends Model { }

Beneficio.init({
    monto_beneficio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Beneficio',
    tableName: 'beneficios',
});

module.exports = Beneficio;