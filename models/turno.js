const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class Turno extends Model { }

    Turno.init({
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        banda_horaria: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        practica: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Turno',
        tableName: 'turnos',
    });
    return Turno;
};
    