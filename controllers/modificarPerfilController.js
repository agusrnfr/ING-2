const User = require('../db/models/user.js');
const session = require('express-session');

const mostrarModificarPerfil = async(req, res) => {
    const usuario = await User.findByPk(session.usuario.id)
    if(usuario === null){
        res.send('No existe tu user, esto no deberia ocurrir')
        return
    }
    return res.render('../views/modificar_mi_perfil', { usuario: session.usuario })
}

module.exports = {
    mostrarModificarPerfil
}