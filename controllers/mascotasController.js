const Mascota = require('../db/models/mascota');
const User = require('../db/models/user')

const mostrarAgregarMascota = async (req, res) => {    
    usuario = await User.findByPk(req.params.id)
    if(usuario === null){
        res.send('no existe ese usuario :(')
        return
    }
    res.render('../views/agregar_mascota',{
        usuario: usuario.dataValues
    })
}

const registrarMascota = async (req, res) => {
    const nombre = req.body.nombre;
    const raza = req.body.raza;
    const color = req.body.color;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const foto = req.body.imagen;
    const observaciones = req.body.observaciones;
    const UserId = req.params.id;

    await Mascota.create({
        UserId: UserId,
        nombre: nombre,
        raza: raza,
        color: color,
        fecha_nacimiento: fecha_nacimiento,
        observaciones: observaciones,
    })
    .then(user => {
        res.render('agregar_mascota',{
            alert:true,
            alertTitle:"Registracion exitosa",
            alertMessage:"",
            alertIcon:"success",
            showConfirmButton:false,
            timer:1500,
        })
    })
    .catch(error => {
        res.render('agregar_mascota',{
            alert:true,
            alertTitle:"Registracion fallida",
            alertMessage:"",
            alertIcon:"error",
            showConfirmButton:false,
            timer:2000,
        })
    });
}  

module.exports = {
    mostrarAgregarMascota,
    registrarMascota,
}