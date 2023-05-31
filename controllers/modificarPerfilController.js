const User = require('../db/models/user.js');
const session = require('express-session');
const { convertirNombre } = require('./registerController.js');
const { validarCampos } = require('./registerController.js');

const mostrarModificarPerfil = async(req, res) => {
    const usuario = await User.findByPk(session.usuario.id)
    if(usuario === null){
        console.error('Error: No existe tu user, esto nunca deberia ocurrir');
        return
    }
    return res.render('../views/modificar_mi_perfil', { usuario: session.usuario })
}

const modificarMiPerfil = async(req, res) => {
    const mail = req.body.mail.toLowerCase();
    const name = convertirNombre(req.body.name);
    const tel = req.body.tel;
    const DNI = req.body.DNI;
    const pass = session.usuario.pass;// soy lazy pero esto no deberia estar

    if(!validarCampos(mail , pass , name , tel , DNI)){
        res.render('modificar_mi_perfil', 
        { usuario: session.usuario,
          alert:true,
          alertIcon:"error",
          alertTitle: "Contraseña muy corta o campos incompletos",
          alertMessage:"",
          timer: 2000,
          showConfirmButton: false,})
        return
    }

    const user = await User.findOne({
        where: {mail: mail}
    });

    const user_url = await User.findOne({
        where: {mail: session.usuario.mail}
    });

    if(user && user_url && (user_url.mail != mail)){
        console.error('Error: Al crear usuario,mail duplicado o el usuario no existe');
        return false;
    }

    User.findByPk(session.usuario.id) // Actualizar usuario
    .then(user => {
      user.mail = mail;
      user.name = name;
      user.tel = tel;
      user.DNI = DNI;
      user.pass = pass;
  
      return user.save();
    })
    .then(async () => {
      const nuevo_usuario = await User.findOne({
        where: { mail: mail }
      });
      session.usuario = nuevo_usuario;
      res.render('modificar_mi_perfil', {
        usuario: nuevo_usuario,
        alert: true,
        alertTitle: "Perfil actualizado con éxito",
        alertMessage: "",
        alertIcon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    })
    .catch(error => {
      console.error('Error al actualizar el usuario');
    });

}

const mostrarModificarMiPassword = async(req, res) => {
  const usuario = await User.findByPk(session.usuario.id)
  if(usuario === null){
      console.error('Error: No existe tu user, esto nunca deberia ocurrir');
      return
  }
  return res.render('../views/modificar_mi_password', { usuario: session.usuario })
}

const modificarMiPassword = async (req, res) => {
  const antiguaPass = req.body.pass;
  const nuevaPass = req.body.pass2;
  if (!nuevaPass || !antiguaPass) {
    console.error('Error: Campos incompletos');
    return false;
  }
  const usuario = User.findOne({
    where: { id: session.usuario.id }
  });

  if (usuario == null) {
    console.error('Error: el usuario a modificar no existe');
    return false;
  }

  try {
    User.findByPk(session.usuario.id) // Actualizar usuario
      .then(user => {
        if (user.pass != antiguaPass) {
          res.render('modificar_mi_password.ejs', {
            usuario: usuario,
            alert: true,
            alertTitle: 'La contraseña anterior es incorrecta',
            alertMessage: '',
            alertIcon: 'error',
            showConfirmButton: false,
            timer: 2000
          });
          return false;
        }
        // La contraseña es correcta, actualizarla
        user.pass = nuevaPass;
        user.save().then(() => {
          res.render('modificar_mi_password.ejs', {
            usuario: usuario,
            alert: true,
            alertTitle: 'Perfil actualizado con éxito',
            alertMessage: '',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        });
      });
  } catch (error) {
    console.error('Error al actualizar la contraseña del cliente');
    console.error(error);
  }
};

module.exports = {
    mostrarModificarPerfil,
    modificarMiPerfil,
    mostrarModificarMiPassword,
    modificarMiPassword,
}