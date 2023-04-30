//invocamos express
const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./db/db');

//seteamos url encode para capturar los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//motor plantillas
app.set('view engine', 'ejs');

//proyecto de rutas
app.use('/', require('./routes/userRoutes'))

// var de sesion
const session = require('express-session');

app.use(session({
  secret: 'secret',
  resave: 'true',
  saveUninitialized: 'true',
}));

//para que las vistas(html/ejs) los busque en la carpeta views(pages).
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//para que busque los archivos estaticos tengan la carpeta public.
app.use(express.static('public'));

//servidor puerto
app.listen(3000, (req, res) => {
  console.log('SERVER RUNNING IN  localhost:3000')
});
require('./db/associations');
require('./db/models/campania');
require('./db/models/trabajador');
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

  /*
  

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

   sequelize.sync({ force: true }).then(() => {
   console.log("Nos hemos conectado a la base de datos");
 }).catch(error => {
   console.log('Se ha producido un error', error);
 })


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
});

 */

module.exports = sequelize;