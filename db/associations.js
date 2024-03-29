const Adopcion = require ('./models/adopcion.js');
const Beneficio = require ('./models/beneficio.js');
const Busqueda = require ('./models/busqueda.js');
const Campania = require ('./models/campania.js');
const Cruza = require ('./models/cruza.js');
const Donacion = require('./models/donacion.js');
const Historial = require ('./models/historial.js');
const Libreta = require ('./models/libreta.js');
const Mascota = require ('./models/mascota.js');
const Perdida = require ('./models/perdida.js');
const Turno = require ('./models/turno.js');
const User = require ('./models/user.js');


User.hasMany(Turno)
Turno.belongsTo(User)
Mascota.hasMany(Turno)
Turno.belongsTo(Mascota)

User.hasMany(Mascota, { as: 'mascotas' });
Mascota.belongsTo(User);

Beneficio.belongsTo(User);
User.hasMany(Beneficio);

User.hasMany(Historial);
Historial.belongsTo(User);
Mascota.hasMany(Historial);
Historial.belongsTo(Mascota);

Mascota.hasMany(Libreta);
Libreta.belongsTo(Mascota);

User.hasMany(Busqueda);
Busqueda.belongsTo(User);

User.hasMany(Perdida);
Perdida.belongsTo(User);
Perdida.belongsTo(Mascota, { allowNull: true })

User.hasMany(Adopcion);
Adopcion.belongsTo(User);

Cruza.belongsTo(Mascota);
Mascota.hasOne(Cruza)

Campania.hasMany(Donacion);
Donacion.belongsTo(Campania);
