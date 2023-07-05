const { mostrarContactoTrabajador, contactar } = require('../controllers/contactarTrabajadorController');
const { mostrarTablaUsers, filtrar } = require('../controllers/userController');
const { validarLogin, mostrarLogin, deslogear } = require('../controllers/loginController');
const { mostrarRegister, registrar, chequear_mail_duplicado } = require('../controllers/registerController');
const { mostrarTrabajadores, mostrarCargaTrabajador, guardarTrabajador,mostrarPaseadores, mostrarGuarderias,cambiarEstadoTrabajador} = require('../controllers/trabajadorController');
const { mostrarGuarderiasFiltradasPorZona , mostrarPaseadoresFiltradosPorZona} = require('../controllers/trabajadorController');
const { mostrarIndex, mostrarComingSoon } = require('../controllers/indexController');
const { comprobar_sesion, comprobar_sesion_admin } = require('../controllers/loginController');
const { mostrarAgregarMascota, registrarMascota , mostrarMascota , eliminarMascota} = require('../controllers/mascotasController');
const { verificaciones, solicitarTurno, mostrarTodosLosTurnos, mostrarMisTurnos, cambiarEstadoTurno, guardarTurno, turnoGuardado ,mostrarTurnosDia} = require('../controllers/turnosController');
const { mostrarCliente , mostrarClienteModificar , actualizarUsuario , actualizarPasswordUsuario , mostrarClienteModificarPassword } = require('../controllers/clienteController')
const { mostrarModificarPerfil , modificarMiPerfil , mostrarModificarMiPassword, modificarMiPassword} = require('../controllers/modificarPerfilController');
const { mostrarAdopciones, cambiarEstado, mostrarPublicacion, guardarPublicacion, mostrarContacto, contactoAdoptante} = require('../controllers/adopcionController');
const { mostrarHistorial , crearHistorial,mostrarCarga, mostrarLibreta} = require('../controllers/historialController');
const { mostrarCupones } = require('../controllers/cuponesController');
const { mostrarPerdidas, mostrarFormularioPerdida, generarPublicacionPerdida, mostrarContactarPerdida, contactarPerdida, marcarPerdidaComoEncontrado } = require('../controllers/perdidasController');
const { mostrarBusquedas, mostrarFormularioBusqueda, generarPublicacionBusqueda, mostrarContactarBusqueda, contactarBusqueda, marcarBusquedaComoEncontrado } = require('../controllers/busquedasController');
const { mostrarCampanias, publicarCampania, verificacionesCampania, guardarPublicacionCampania, publicacionGuardada, verificacionesDonacion, realizarDonacion} = require('../controllers/campaniasController');
const { mostrarIndexCruzas, publicarMascotaCruza, guardarPublicacionCruza, publicacionGuardadaCruza, verificacionesCruza, verificarPerroEsDeUsuario, verificacionesDeMascotasContacto, mostrarPublicacionMascota, mostrarRecomendacionesCruza, mostrarContactoCruza, contactoCruzaGuardado, verificacionesContactoCruza, contactarCruza} = require('../controllers/cruzasController');
const { mostrarVeterinarias } = require('../controllers/veterinariasController');

const { mostrarReportes, generarReporte, generarReporteAdopciones} = require('../controllers/reportesController');
//invocamos express
const app = require('express').Router()

//manejo de imagenes de perfil
const upload = require('./multer');

////////////////////   RUTAS     //////////////////////////

app.get('/', mostrarIndex)

app.get('/table', comprobar_sesion_admin, mostrarTablaUsers)
//app.post('/table',comprobar_sesion, filtrar)

app.get('/login', mostrarLogin)
app.post('/login', validarLogin)
app.post('/logout', deslogear)

app.get('/register', comprobar_sesion_admin, mostrarRegister)
app.post('/register', registrar)
app.post('/chequear_mail_duplicado', chequear_mail_duplicado)

//TRABAJADORES
app.get('/cargar_trabajador',comprobar_sesion_admin, mostrarCargaTrabajador)
app.post('/registrar_trabajador',comprobar_sesion_admin, guardarTrabajador)
app.get('/trabajadores', mostrarTrabajadores)
app.post('/trabajador/estado', comprobar_sesion_admin,cambiarEstadoTrabajador)
app.get('/paseadores',mostrarPaseadores)
app.get('/guarderias',mostrarGuarderias)
app.get('/contactar/trabajador/:id', mostrarContactoTrabajador)
app.post('/contactar/trabajador/:id', contactar)
app.post('/mostrarGuarderiasFiltradasPorZona', mostrarGuarderiasFiltradasPorZona)
app.post('/mostrarPaseadoresFiltradosPorZona', mostrarPaseadoresFiltradosPorZona)

app.get('/modificar_mi_perfil',comprobar_sesion, mostrarModificarPerfil)
app.post('/modificarMiPerfil', comprobar_sesion, modificarMiPerfil)

//HISTORIAL
app.get('/historial/:id', comprobar_sesion, mostrarHistorial)
app.get('/registrarVisita/cliente/:id', comprobar_sesion_admin, mostrarCarga)
app.post('/registrarVisita/cliente/:id', comprobar_sesion_admin, crearHistorial)

//LIBRETA SANITARIA
app.get('/libreta_sanitaria/:id',comprobar_sesion, mostrarLibreta)

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
app.get('/turnos_dia',comprobar_sesion_admin, mostrarTurnosDia);

//MASCOTAS
app.get('/agregar_mascota/cliente/:id', mostrarAgregarMascota)
app.post('/agregar_mascota/cliente/:id', upload.single('imagen'), registrarMascota)
app.get('/ver_mascota/:id', comprobar_sesion, mostrarMascota)
app.post('/eliminar_mascota/:id', comprobar_sesion_admin, eliminarMascota)

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

//CRUZAS
app.get('/cruzas', comprobar_sesion, mostrarIndexCruzas);
app.get('/cruzas/publicarMascota/:id', comprobar_sesion, verificarPerroEsDeUsuario, publicarMascotaCruza);
app.post('/cruzas/publicarMascota/:id', comprobar_sesion, verificarPerroEsDeUsuario, verificacionesCruza, guardarPublicacionCruza);
app.get('/cruzas/publicacionGuardada', comprobar_sesion, publicacionGuardadaCruza);
app.get('/cruzas/verRecomendaciones/:id', comprobar_sesion, verificarPerroEsDeUsuario, mostrarRecomendacionesCruza);
app.get('/cruzas/verPublicacionDeMascota/:id', comprobar_sesion, verificarPerroEsDeUsuario, mostrarPublicacionMascota);
app.get('/cruzas/contactoCruza/:id', comprobar_sesion, verificacionesDeMascotasContacto, mostrarContactoCruza);
app.post('/cruzas/contactoCruza/:id', comprobar_sesion, verificacionesDeMascotasContacto, verificacionesContactoCruza, contactarCruza);
app.get('/cruzas/contactoCruzaGuardado', comprobar_sesion, contactoCruzaGuardado);

//VETERINARIAS DE TURNO
app.get('/veterinariasDeTurno', mostrarVeterinarias);

//REPORTES
app.get('/reportes', comprobar_sesion, comprobar_sesion_admin, mostrarReportes);
app.post('/generar_reporte_practicas', comprobar_sesion, comprobar_sesion_admin, generarReporte)
app.post('/generar_reporte_adopciones', comprobar_sesion, comprobar_sesion_admin, generarReporteAdopciones)

//PERDIDAS
app.get('/perdidas', mostrarPerdidas);
app.get('/crear_publicacion_perdida', comprobar_sesion, mostrarFormularioPerdida)
app.post('/crear_publicacion_perdida', comprobar_sesion, upload.single('imagen'), generarPublicacionPerdida)
app.get('/contacto_perdida/:id', mostrarContactarPerdida)
app.post('/contacto_perdida/contactarPerdida/:id', contactarPerdida)
app.post('/marcarPerdidaComoEncontrado', marcarPerdidaComoEncontrado);

//BUSQUEDAS
app.get('/busquedas', mostrarBusquedas);
app.get('/crear_publicacion_busqueda', comprobar_sesion, mostrarFormularioBusqueda)
app.post('/crear_publicacion_busqueda', comprobar_sesion, upload.single('imagen'), generarPublicacionBusqueda)
app.get('/contacto_busqueda/:id', mostrarContactarBusqueda)
app.post('/contacto_busqueda/contactarBusqueda/:id', contactarBusqueda)
app.post('/marcarBusquedaComoEncontrado', marcarBusquedaComoEncontrado);

app.get('/coming_soon', mostrarComingSoon)

module.exports = app;

