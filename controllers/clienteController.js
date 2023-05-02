
const User = require('../db/models/user.js');

const mostrarCliente = async(req, res) => {
    const user = await User.findByPk(req.params.id)
    
    if(user === null){
        res.send('no existe ese usuario :(')
        return
    }
    usuario = user.dataValues; //lo vuelve un objeto
    return res.render('../views/cliente', { usuario })
}


module.exports = {
    mostrarCliente
}