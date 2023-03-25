const { sequelize, Sequelize } = require('../models');
const Paseador = require('../models/paseador')(sequelize, Sequelize.DataTypes);

const contactarTrabajador = async (req, res) => {    
    
    const trabajador = await Paseador.findByPk(req.params.id)
        
    if(trabajador === null){
        res.redirect('/')
    }
    else {
        return res.render('../views/contactoTrabajador', {
            id:trabajador.id,
            nombre:trabajador.nombre
        })
    }
}

module.exports = {
    contactarTrabajador,
}