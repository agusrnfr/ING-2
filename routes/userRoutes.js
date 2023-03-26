const { contactarTrabajador } = require('../controllers/contactarTrabajadorController');
const { mostrarTablaUsers } = require('../controllers/userController');

//invocamos express
const app = require('express').Router()

////////////////////   RUTAS     //////////////////////////


app.get('/contactar/trabajador/:id', contactarTrabajador)

app.get('/table', mostrarTablaUsers)



module.exports = app;