const { contactarTrabajador } = require('../controllers/contactarTrabajadorController');

//invocamos express
const app = require('express').Router()

////////////////////   RUTAS     //////////////////////////


app.get('/contactar/trabajador/:id', contactarTrabajador)



module.exports = app;