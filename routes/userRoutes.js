const { contactarTrabajador } = require('../controllers/contactarTrabajadorController');
const { mostrarTablaUsers } = require('../controllers/userController');
const { validarLogin , mostrarLogin } = require('../controllers/loginController');
const { mostrarRegister, registrar } = require('../controllers/registerController');

//invocamos express
const app = require('express').Router()

////////////////////   RUTAS     //////////////////////////


app.get('/contactar/trabajador/:id', contactarTrabajador)

app.get('/table', mostrarTablaUsers)

app.get('/login', mostrarLogin)
app.post('/login', validarLogin)

app.get('/register', mostrarRegister)
app.post('/register', registrar)

module.exports = app;

