const User = require('../db/models/user.js');
const session = require('express-session');
const { convertirNombre } = require('./registerController.js');
const { validarCampos } = require('./registerController.js');

const mostrarModificarPerfil = async(req, res) => {
    const usuario = await User.findByPk(session.usuario.id)
    if(usuario === null){
        res.send('No existe tu user, esto no deberia ocurrir')
        return
    }
    return res.render('../views/modificar_mi_perfil', { usuario: session.usuario })
}

const modificarMiPerfil = async(req, res) => {
    const mail = req.body.mail.toLowerCase();
    const name = convertirNombre(req.body.name);
    const tel = req.body.tel;
    const DNI = req.body.DNI;
    const pass = req.body.pass;

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
        console.error('Error al crear usuario,mail duplicado o el usuario no existe');
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
      console.log("error al actualizar");
    });

}

module.exports = {
    mostrarModificarPerfil,
    modificarMiPerfil
}