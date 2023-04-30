'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

////////////////////////////////
//todas cosas de configuracion de sequelize (NO TOCAR!)
////////////////////////////////
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
////////////////////////////////
////////////////////////////////
////////////////////////////////


// DB
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//ASOCIATIONS,  (CLAVES FORANEAS)
db.User.hasMany(db.Turno, {foreignKey: 'UserId'});
db.Turno.belongsTo(db.User, {foreignKey: 'UserId'});
db.Mascota.hasMany(db.Turno, { foreignKey: 'MascotumId'});
db.Turno.belongsTo(db.Mascota, { foreignKey: 'MascotumId'});

db.User.hasMany(db.Mascota);
db.Mascota.belongsTo(db.User);

db.Beneficio.belongsTo(db.User);
db.User.hasMany(db.Beneficio);

db.User.hasMany(db.Historial);
db.Historial.belongsTo(db.User);
db.Mascota.hasMany(db.Historial);
db.Historial.belongsTo(db.Mascota);

db.Mascota.hasMany(db.Libreta);
db.Libreta.belongsTo(db.Mascota);

db.User.hasMany(db.Busqueda);
db.Busqueda.belongsTo(db.User);

db.User.hasMany(db.Perdida);
db.Perdida.belongsTo(db.User);

db.User.hasMany(db.Adopcion);
db.Adopcion.belongsTo(db.User);

db.User.hasMany(db.Cruza);
db.Cruza.belongsTo(db.User);

db.Cruza.belongsTo(db.Mascota);
db.Mascota.hasOne(db.Cruza)

// no tocar esto
module.exports = db;

