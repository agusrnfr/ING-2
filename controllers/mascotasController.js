const Mascota = require('../db/models/mascota');
const User = require('../db/models/user')
const session = require('express-session');

const mostrarAgregarMascota = async (req, res) => {    
    usuario = await User.findByPk(req.params.id)
    if(usuario === null){
        res.send('Error: No existe ese usuario')
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
    let observaciones = req.body.observaciones;
    const UserId = req.params.id;

    if(observaciones === "")
        observaciones = "Ninguna"

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

const mostrarMascota = async (req, res) => {    
    const mascota = await Mascota.findByPk(req.params.id)
    if(mascota == null){
        res.send('Error: No existe esa mascota')
        return
    }
    const usuario = await User.findByPk(session.usuario.id)
    const mascotas = await usuario.getMascotas()
    // if(mascota.id in mascotas ){
    //     res.send('Acceso denegado')
    //     return
    // }
    res.render('../views/detalle_mascota',{
        mascota: mascota.dataValues,
        usuario: usuario.dataValues,
        mascotas: mascotas,
    })
}

module.exports = {
    mostrarAgregarMascota,
    registrarMascota,
    mostrarMascota,
}