const User = require('../db/models/user.js');
const { convertirNombre } = require('./registerController.js');
const { validarCampos } = require('./registerController.js');

const mostrarCupones = async(req, res) => {
    const usuario = await User.findByPk(req.params.id)
    if(usuario === null){
        res.send('Error: no existe el usuario')
        return
    }
    return res.render('../views/cupones', { usuario: usuario.dataValues })
  }
  
  module.exports = {
      mostrarCupones
  }