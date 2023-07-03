const Trabajador = require('../db/models/trabajador.js');
const session = require('express-session');
const { transporter } = require('../config/mailer');

const mostrarContactoTrabajador = async (req, res) => {
    try {
      let nombre = '';
      let mail = '';
      let telefono = '';
  
      const trabajador = await Trabajador.findByPk(req.params.id)
      
      if (!trabajador) {
        return res.status(400).send('El ID del trabajador no está definido');
      }
  
      if (session && session.usuario && session.loggedin) {
        // Si el usuario ha iniciado sesión, pre-cargamos los datos del usuario
        nombre = session.usuario.name;
        mail = session.usuario.mail;
        telefono = session.usuario.tel;
      }
  
      res.render('contactoTrabajador', {
        session: session,
        trabajador,
        nombre: nombre,
        mail: mail,
        telefono: telefono,
      });
    } catch (error) {
      console.error('Error al mostrar el contacto del trabajador:', error);
      res.status(500).send('Error interno del servidor');
    }
  };

// Se contacta y se envia el email
const contactar = async (req, res) => {

    const nombre = req.body.nombre;
    const horario = req.body.horario;
    const servicio = req.body.servicio;
    const fecha = req.body.fecha;
    const mail = req.body.mail;
    const telefono = req.body.telefono;
    const dias = req.body.dias;
   
    const trabajador = await Trabajador.findByPk(req.params.id)
      if (!trabajador) {
        return res.status(404).send('No se encontró el trabajador');
      }
  
    if (!nombre || !horario || !servicio || !mail || !telefono  || !fecha) {
      console.error('Error al crear publicación, campos incompletos');
      res.render('contactoTrabajador', {
        nombre:"",
        mail:"",
        telefono: "",
        trabajador,
        alert: true,
        alertTitle: 'Error al crear publicación',
        alertMessage: 'Por favor, completa todos los campos requeridos',
        alertIcon: 'error',
        showConfirmButton: false,
        timer: 2000, 
      });
  
    } else {
      // Aquí se realizaría el envío del correo electrónico
      // y se mostraría la alerta de éxito en caso de que el envío haya sido exitoso.
      res.render('contactoTrabajador', {
        nombre:"",
        mail:"",
        telefono: "",
        trabajador,
        session: session,
        alert: true,
        alertTitle: 'Mail Enviado!',
        alertMessage: '',
        alertIcon: 'success',
        showConfirmButton: false,
        timer: 1500, 
      });
      await transporter.sendMail({
        from: '"Interes en servicio" <veterinaria.omd@gmail.com>',
        to: "laura.cuenca1@gmail.com", //deberia ser --> to: mailTurno,
        subject: "Interes en servicio",
        text: "Estimado "+ trabajador.nombre + ","+" el cliente "+ nombre + " esta interesado en sus servicios " + servicio 
        + ". Tus horarios disponibles son:  "+horario+". Su mail es: "+ mail + ", su telefono es " + telefono 
        + " los dias requeridos son: " + fecha,
        })
           .catch(error => {
               console.log('Error al enviar mail');
           });
    }
  };
  

module.exports = {
    mostrarContactoTrabajador,
    contactar,
}