const User = require('../db/models/user.js');
const { convertirNombre } = require('./registerController.js');
const { validarCampos } = require('./registerController.js');

const mostrarCliente = async(req, res) => {
    const usuario = await User.findByPk(req.params.id)
    if(usuario === null){
        res.send('no existe ese usuario :(')
        return
    }
    const mascotas = await usuario.getMascotas()
    return res.render('../views/cliente', { usuario: usuario.dataValues, mascotas })
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

    if(await !validarCampos(mail , pass , name , tel , DNI)){
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
      console.log("error al actualizar");
    });

}


module.exports = {
    mostrarCliente,
    mostrarClienteModificar,
    actualizarUsuario,
}