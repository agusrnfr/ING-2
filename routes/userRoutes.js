const { mostrarCamposContactoTrabajador, contactar } = require('../controllers/contactarTrabajadorController');
const { mostrarTablaUsers, filtrar } = require('../controllers/userController');
const { validarLogin, mostrarLogin, deslogear } = require('../controllers/loginController');
const { mostrarRegister, registrar, chequear_mail_duplicado } = require('../controllers/registerController');
const { mostrarTrabajadores } = require('../controllers/trabajadorController');
const { mostrarIndex } = require('../controllers/indexController');
const { comprobar_sesion, comprobar_sesion_admin } = require('../controllers/loginController');
const { verificaciones, solicitarTurno, mostrarTodosLosTurnos, mostrarMisTurnos, cambiarEstadoTurno, guardarTurno, turnoGuardado } = require('../controllers/turnosController');
const { mostrarAgregarMascota, registrarMascota , mostrarMascota } = require('../controllers/mascotasController');
const { mostrarCliente , mostrarClienteModificar , actualizarUsuario , actualizarPasswordUsuario , mostrarClienteModificarPassword } = require('../controllers/clienteController')
const { mostrarModificarPerfil , modificarMiPerfil , mostrarModificarMiPassword, modificarMiPassword} = require('../controllers/modificarPerfilController');
const { mostrarAdopciones, cambiarEstado, mostrarPublicacion, guardarPublicacion, mostrarContacto, contactoAdoptante} = require('../controllers/adopcionController');
const { mostrarCupones } = require('../controllers/cuponesController');
const { mostrarCampanias, publicarCampania, verificacionesCampania, guardarPublicacionCampania, publicacionGuardada, verificacionesDonacion, realizarDonacion} = require('../controllers/campaniasController');


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

app.get('/modificar_mi_perfil',comprobar_sesion, mostrarModificarPerfil)
app.post('/modificarMiPerfil', comprobar_sesion, modificarMiPerfil)

app.get('/modificar_mi_password', comprobar_sesion, mostrarModificarMiPassword)
app.post('/modificar_mi_password', comprobar_sesion, modificarMiPassword)

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
app.get('/ver_mascota/:id', comprobar_sesion, mostrarMascota)

//VER CLIENTE
app.get('/ver_cliente/:id', comprobar_sesion , mostrarCliente)
app.get('/modificar/cliente/:id', comprobar_sesion_admin, mostrarClienteModificar)
app.get('/modificar/cliente/password/:id', mostrarClienteModificarPassword)
app.post('/modificar/cliente/:id',comprobar_sesion_admin, actualizarUsuario)
app.post('/modificar/cliente/password/:id',comprobar_sesion_admin, actualizarPasswordUsuario)
app.get('/ver_cliente/cupones/:id', comprobar_sesion, mostrarCupones)

//CAMPANIAS
app.get('/campanias', mostrarCampanias);
app.get('/campanias/publicarCampania', comprobar_sesion_admin, publicarCampania);
app.post('/campanias/publicarCampania', comprobar_sesion_admin, verificacionesCampania, guardarPublicacionCampania);
app.get('/campanias/publicacionGuardada', comprobar_sesion_admin, publicacionGuardada);
app.post('/campanias', verificacionesDonacion, realizarDonacion);


module.exports = app;

