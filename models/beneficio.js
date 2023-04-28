const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class Beneficio extends Model {}

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

    return Beneficio;
};