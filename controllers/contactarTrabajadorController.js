const { sequelize, Sequelize } = require('../models');
const Trabajador = require('../models/trabajador')(sequelize, Sequelize.DataTypes);

const mostrarCamposContactoTrabajador = async (req, res) => {    
    
    const trabajador = await Trabajador.findByPk(req.params.id)
        
    if(trabajador === null){
        res.send('no existe ese trabajador :(')
    }
    else {
        return res.render('../views/contactoTrabajador', {
            id:trabajador.id,
            nombre:trabajador.nombre
        })
    }
}

const contactar = async(req,res) => {
    const user = req.body.user;
    const fecha = req.body.fecha;

    const nombreTrabajador = req.body.param2;
    res.send('usuario: '+ user + ' fecha: ' + fecha + ' envia al trabajador: ' + nombreTrabajador)
}

module.exports = {
    mostrarCamposContactoTrabajador,
    contactar,
}