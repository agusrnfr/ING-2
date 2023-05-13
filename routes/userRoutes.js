const { mostrarCamposContactoTrabajador, contactar } = require('../controllers/contactarTrabajadorController');
const { mostrarTablaUsers, filtrar } = require('../controllers/userController');
const { validarLogin, mostrarLogin, deslogear } = require('../controllers/loginController');
const { mostrarRegister, registrar, chequear_mail_duplicado } = require('../controllers/registerController');
const { mostrarTrabajadores } = require('../controllers/trabajadorController');
const { mostrarIndex } = require('../controllers/indexController');
const { comprobar_sesion, comprobar_sesion_admin } = require('../controllers/loginController');
const { verificaciones, solicitarTurno, mostrarTodosLosTurnos, mostrarMisTurnos, cambiarEstadoTurno, guardarTurno, turnoGuardado } = require('../controllers/turnosController');
const { mostrarAgregarMascota, registrarMascota } = require('../controllers/mascotasController');
const { mostrarCliente , mostrarClienteModificar , actualizarUsuario } = require('../controllers/clienteController')
const { mostrarAdopciones, cambiarEstado, mostrarPublicacion, guardarPublicacion, mostrarContacto, contactoAdoptante} = require('../controllers/adopcionController');
const { mostrarModificarPerfil , modificarMiPerfil } = require('../controllers/modificarPerfilController');

//invocamos express
const app = require('express').Router()

////////////////////   RUTAS     //////////////////////////

app.get('/', mostrarIndex)

app.get('/contactar/trabajador/:id', mostrarCamposContactoTrabajador)
app.post('/contactar/trabajador/:id', contactar)

app.get('/table', comprobar_sesion_admin, mostrarTablaUsers)
//app.post('/table',comprobar_sesion, filtrar)

app.get('/login', mostrarLogin)
app.post('/login', validarLogin)
app.post('/logout', deslogear)

app.get('/register', comprobar_sesion_admin, mostrarRegister)
app.post('/register', registrar)
app.post('/chequear_mail_duplicado', chequear_mail_duplicado)

app.get('/trabajadores', mostrarTrabajadores)

app.get('/modificar_mi_perfil',mostrarModificarPerfil)
app.post('/modificarMiPerfil', modificarMiPerfil)

//ADOPCION
app.get('/adopciones',mostrarAdopciones)
app.post('/adopcion/seAdopto',comprobar_sesion, cambiarEstado)
app.get('/publicacion',comprobar_sesion, mostrarPublicacion)
app.post('/publicacion',comprobar_sesion, guardarPublicacion)
app.get('/contactoAdoptante',mostrarContacto)
app.post('/contactoAdoptante', contactoAdoptante)

//TURNOS
app.get('/turnos', comprobar_sesion, solicitarTurno);
app.post('/turnos', comprobar_sesion, verificaciones, guardarTurno);
app.get('/turnos/listarTodosLosTurnos', comprobar_sesion_admin, mostrarTodosLosTurnos);
app.get('/turnos/misTurnos', comprobar_sesion, mostrarMisTurnos);
app.post('/turnos/listarTodosLosTurnos', comprobar_sesion_admin, cambiarEstadoTurno);
app.get('/turnos/turnoGuardado', comprobar_sesion, turnoGuardado);

//MASCOTAS
app.get('/agregar_mascota/cliente/:id', mostrarAgregarMascota)
app.post('/agregar_mascota/cliente/:id', registrarMascota)

//VER CLIENTE
app.get('/ver_cliente/:id', comprobar_sesion_admin, mostrarCliente)
app.get('/modificar/cliente/:id', comprobar_sesion_admin, mostrarClienteModificar)
app.post('/modificar/cliente/:id',comprobar_sesion_admin, actualizarUsuario)

module.exports = app;

