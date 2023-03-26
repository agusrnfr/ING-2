const { contactarTrabajador } = require('../controllers/contactarTrabajadorController');
const { mostrarTablaUsers } = require('../controllers/userController');
const { validarLogin , mostrarLogin } = require('../controllers/loginController')

//invocamos express
const app = require('express').Router()

////////////////////   RUTAS     //////////////////////////


app.get('/contactar/trabajador/:id', contactarTrabajador)

app.get('/table', mostrarTablaUsers)

app.get('/login', mostrarLogin)
app.post('/login', validarLogin)

module.exports = app;

