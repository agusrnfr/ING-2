const { mostrarCamposContactoTrabajador , contactar } = require('../controllers/contactarTrabajadorController');
const { mostrarTablaUsers , filtrar } = require('../controllers/userController');
const { validarLogin , mostrarLogin , deslogear } = require('../controllers/loginController');
const { mostrarRegister, registrar , chequear_mail_duplicado } = require('../controllers/registerController');
const { mostrarTrabajadores } = require('../controllers/trabajadorController');
const { mostrarIndex } = require('../controllers/indexController');
const { comprobar_sesion , comprobar_sesion_admin } = require('../controllers/loginController');
const { mostrarTodosLosTurnos } = require('../controllers/turnosController');
const { mostrarAgregarMascota , registrarMascota } = require('../controllers/mascotasController');

//invocamos express
const app = require('express').Router()

////////////////////   RUTAS     //////////////////////////

app.get('/', mostrarIndex)

app.get('/contactar/trabajador/:id', mostrarCamposContactoTrabajador)
app.post('/contactar/trabajador/:id', contactar)

app.get('/table',comprobar_sesion_admin, mostrarTablaUsers)
//app.post('/table',comprobar_sesion, filtrar)

app.get('/login', mostrarLogin)
app.post('/login', validarLogin)
app.post('/logout', deslogear)

app.get('/register', comprobar_sesion_admin , mostrarRegister)
app.post('/register', registrar)
app.post('/chequear_mail_duplicado', chequear_mail_duplicado)

app.get('/trabajadores', mostrarTrabajadores)


//TURNOS
app.get('/turnos/listarTodosLosTurnos', comprobar_sesion_admin, mostrarTodosLosTurnos);

//MASCOTAS
app.get('/agregar_mascota/cliente/:id', mostrarAgregarMascota)
app.post('/agregar_mascota/cliente/:id', registrarMascota)

module.exports = app;

