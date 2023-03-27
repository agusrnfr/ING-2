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

/**
 * contactar:
 * Cuando se hace click en contactar
 * se envia un mail a ambas partes interesadas
 */
const contactar = async(req,res) => {
    const user = req.body.user;
    const fecha = req.body.fecha;

    const nombreTrabajador = req.body.param2;
    res.send(' MAIL ENVIADO! '+'usuario: '+ user + ' fecha: ' + fecha + ' envia al trabajador: ' + nombreTrabajador)
}

module.exports = {
    mostrarCamposContactoTrabajador,
    contactar,
}