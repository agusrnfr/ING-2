const { mostrarCamposContactoTrabajador , contactar } = require('../controllers/contactarTrabajadorController');
const { mostrarTablaUsers } = require('../controllers/userController');
const { validarLogin , mostrarLogin } = require('../controllers/loginController');
const { mostrarRegister, registrar } = require('../controllers/registerController');
const { mostrarTrabajadores } = require('../controllers/trabajadorController');
const { mostrarIndex } = require('../controllers/indexController');

//invocamos express
const app = require('express').Router()

////////////////////   RUTAS     //////////////////////////

app.get('/', mostrarIndex)

app.get('/contactar/trabajador/:id', mostrarCamposContactoTrabajador)
app.post('/contactar/trabajador/:id', contactar)

app.get('/table', mostrarTablaUsers)

app.get('/login', mostrarLogin)
app.post('/login', validarLogin)

app.get('/register', mostrarRegister)
app.post('/register', registrar)

app.get('/trabajadores', mostrarTrabajadores)

module.exports = app;

