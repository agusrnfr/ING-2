const path = require('path');
//invocamos express
const express = require('express');
const app = express();

//seteamos url encode para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//invocamos dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'})

//motor plantillas
app.set('view engine', 'ejs');

//invocamos bcrypt
const bcrypt = require('bcryptjs')

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
app.listen(3000,(req,res)=>{
    console.log('SERVER RUNNING IN  localhost:3000')
  })


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
