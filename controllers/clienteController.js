const User = require('../db/models/user.js');
const { convertirNombre } = require('./registerController.js');
const { validarCampos } = require('./registerController.js');
const session = require('express-session');

const mostrarCliente = async(req, res) => {
    const usuario = await User.findByPk(req.params.id)
    if(usuario === null){
        res.send('no existe ese usuario :(')
        return
    }
    const { calcularEdadMasco } = require('./turnosController.js');
    const mascotas = await usuario.getMascotas()
    return res.render('../views/cliente', { usuario: usuario.dataValues, mascotas , calcularEdadMasco , session })
}

const mostrarClienteModificar = async(req, res) => {
    const usuario = await User.findByPk(req.params.id)
    if(usuario === null){
        res.send('no existe ese usuario :(')
        return
    }

    const mascotas = await usuario.getMascotas()
    return res.render('../views/modificar_cliente', { usuario: usuario.dataValues, mascotas })
}

const actualizarUsuario = async(req, res) => {
    const mail = req.body.mail.toLowerCase();
    const name = convertirNombre(req.body.name);
    const tel = req.body.tel;
    const DNI = req.body.DNI;
    const pass = req.body.pass;

    if(!validarCampos(mail , pass , name , tel , DNI)){
        return false
    }
    const user = await User.findOne({
        where: {mail: mail}
    });

    const user_url = await User.findOne({
        where: {id: req.params.id}
    });

    if(user && (user_url.mail != mail)){
        console.error('Error al crear usuario,mail duplicado o el usuario no existe');
        return false;
    }

    User.findByPk(req.params.id) // Actualizar usuario
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
  
      res.render('modificar_cliente.ejs', {
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
      console.error("error al actualizar");
    });

}

const actualizarPasswordUsuario = async (req, res) => {
  const antiguaPass = req.body.pass;
  const nuevaPass = req.body.pass2;
  if (!nuevaPass || !antiguaPass) {
    console.error('Campos incompletos');
    return false;
  }
  const usuario = User.findOne({
    where: { id: req.params.id }
  });

  if (usuario == null) {
    console.error('Error, el usuario no existe');
    return false;
  }

  try {
    User.findByPk(req.params.id) // Actualizar usuario
      .then(user => {
        if (user.pass != antiguaPass) {
          res.render('modificar_password_cliente.ejs', {
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
          res.render('modificar_password_cliente.ejs', {
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


const mostrarClienteModificarPassword = async(req, res) => {
  const usuario = await User.findByPk(req.params.id)
  if(usuario === null){
      console.error('no existe ese usuario :(')
      return
  }
  return res.render('../views/modificar_password_cliente', { usuario: usuario.dataValues })
}

module.exports = {
    mostrarCliente,
    mostrarClienteModificar,
    actualizarUsuario,
    mostrarClienteModificarPassword,
    actualizarPasswordUsuario,
}