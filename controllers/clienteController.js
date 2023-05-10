
const User = require('../db/models/user.js');



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

module.exports = {
    mostrarCliente,
    mostrarClienteModificar,
}