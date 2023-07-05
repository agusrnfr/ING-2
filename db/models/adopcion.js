const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Adopcion extends Model { }

Adopcion.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vacunas: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo_edad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    origen: {
        type: DataTypes.STRING,
        allowNull: false,
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
    se_adopto: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    raza: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_adopcion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Adopcion',
    tableName: 'adopciones',
});

module.exports = Adopcion;