const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class Busqueda extends Model {} 

    Busqueda.init({
        zona: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha_encuentro: {
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
        modelName: 'Busqueda',
        tableName: 'busquedas',
    });
    return Busqueda;  
};