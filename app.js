const path = require('path');
//invocamos express
const express = require('express');
const app = express();

//seteamos url encode para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//motor plantillas
app.set('view engine', 'ejs');

//invocamos al modulo de la conexion DB
const connection = require('./database/server');
const { sequelize, Sequelize } = require('./models');

//invoco los require de los modelos
const User = require('./models/user')(sequelize, Sequelize.DataTypes);
const Trabajador = require('./models/trabajador')(sequelize, Sequelize.DataTypes);

//proyecto de rutas
app.use('/', require('./routes/userRoutes'))

// var de sesion
const session = require('express-session');

app.use(session({
    secret:'secret',
    resave:'true',
    saveUninitialized:'true',
}));

//para que las vistas(html/ejs) los busque en la carpeta views(pages).
app.set('views', path.join(__dirname,'views')) 
app.set('view engine', 'ejs')

//para que busque los archivos estaticos tengan la carpeta public.
app.use(express.static('public')); 



//servidor puerto
app.listen(PORT, function () {
    console.log("La app ha arranado en http://localhost:${PORT}");

    // Conectase a la base de datos
    // Force true: DROP TABLES
    sequelize.sync({ force: true }).then(() => {
        console.log("Nos hemos conectado a la base de datos");
    }).catch(error => {
        console.log('Se ha producido un error', error);
    })

});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Elimina todas las tablas y crea a partir de los models
sequelize.drop()
  .then(() => {
    console.log('Las tablas han sido eliminadas');
    return sequelize.sync({ force: true });
  })
  .then(() => {
    console.log('Las tablas han sido creadas nuevamente');
  })
  .catch((error) => {
    console.error('Error al eliminar o crear las tablas:', error);
  });


//Carga las tablas a partir del seeder
const { exec } = require('child_process');
exec('npx sequelize-cli db:seed:all', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error al cargar datos`);
    return;
  }
  else {
    console.log(`Datos cargados a partir del seeder`);
  }
});

// Export the sequelize instance
module.exports = sequelize;