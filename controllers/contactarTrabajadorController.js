const { sequelize, Sequelize } = require('../models');
const Trabajador = require('../models/trabajador')(sequelize, Sequelize.DataTypes);

const contactarTrabajador = async (req, res) => {    
    
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

module.exports = {
    contactarTrabajador,
}