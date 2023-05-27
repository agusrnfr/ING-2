const User = require('../db/models/user.js');
const session = require('express-session');

const mostrarCupones = async(req, res) => {
    const usuario = await User.findByPk(req.params.id)
    if(usuario === null){
        res.send('Error: no existe el usuario')
        return
    }
    const cupones = await usuario.getBeneficios()
    return res.render('../views/cupones', { usuario: usuario.dataValues , cupones , session })
  }
  
  module.exports = {
      mostrarCupones
  }