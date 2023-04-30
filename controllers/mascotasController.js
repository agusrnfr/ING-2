const { sequelize, Sequelize } = require('../models');

const mostrarAgregarMascota = async (req, res) => {    
    const User = require('../models/user')(sequelize, Sequelize.DataTypes);
    usuario = await User.findByPk(req.params.id)
    if(usuario === null){
        res.send('no existe ese usuario :(')
        return
    }
    res.render('../views/agregarMascota',{
        usuario: usuario.dataValues
    })
}

const registrarMascota = async (req, res) => {
    const Mascota = require('../models/mascota')(sequelize, Sequelize.DataTypes);
    const nombre = req.body.nombre;
    const raza = req.body.raza;
    const color = req.body.color;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const foto = req.body.imagen;
    const observaciones = req.body.observaciones;
    const UserId = req.params.id;
    console.log(req.params.id)
    

    await Mascota.create({
        usuarioid: 1,
        nombre: nombre,
        raza: raza,
        color: color,
        fecha_nacimiento: fecha_nacimiento,
        observaciones: observaciones,
    })
    .then(user => {
        res.render('agregarMascota',{
            alert:true,
            alertTitle:"Registracion exitosa",
            alertMessage:"",
            alertIcon:"success",
            showConfirmButton:false,
            timer:1500,
        })
    })
    .catch(error => {
        res.render('agregarMascota',{
            alert:true,
            alertTitle:"Registracion fallida",
            alertMessage:"",
            alertIcon:"error",
            showConfirmButton:false,
            timer:2000,
        })
    });
}  

/*     const trabajador = await Trabajador.findByPk(req.params.id)
        
    if(trabajador === null){
        res.send('no existe ese trabajador :(')
    }
    else {
        return res.render('../views/contactoTrabajador', {
            id:trabajador.id,
            nombre:trabajador.nombre
        })
    } */

module.exports = {
    mostrarAgregarMascota,
    registrarMascota,
}