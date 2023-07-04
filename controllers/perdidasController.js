
const session = require('express-session');
const User = require('../db/models/user.js');
const Mascota = require('../db/models/mascota');
const Perdida = require('../db/models/perdida');
const { transporter } = require('../config/mailer');
const sequelize = require('../db/db');
const moment = require('moment');

const mostrarPerdidas = async(req, res) => {
    const perdidas = await Perdida.findAll({
        order: [
          [sequelize.literal('NOT se_encontro'), 'DESC'],
          ['id', 'ASC'],
        ],
    });
    return res.render('../views/perdidas', { session , perdidas })
}

const mostrarFormularioPerdida = async(req, res) => {
    const usuario = await User.findByPk(session.usuario.id)
    const mascotas = await usuario.getMascotas()
    return res.render('../views/crear_publicacion_perdida', { session , mascotas })
}

const generarPublicacionPerdida = async(req, res) => {
    const usuario = await User.findByPk(session.usuario.id)
    const mascotas = await usuario.getMascotas()
    const select_mascota = req.body.select_mascota;
    console.log(req.body.select_mascota)
    let nombre_mascota, sexo, edad, foto;
    if(select_mascota){ // busca la info si se selecciono una mascota
        const pk = req.body.select_mascota;
        const mascota = await Mascota.findByPk(pk);
        nombre_mascota = mascota.nombre;
        sexo = mascota.sexo;
        const fechaActual = moment();
        edad = fechaActual.diff(mascota.fecha_nacimiento, 'years')
        foto = mascota.foto
    }else{
        nombre_mascota = req.body.nombre_mascota;
        sexo = req.body.sexo;
        edad = req.body.edad;
        const imagen = req.file.path.replace("public", "")//para q se guarde bien el path */
        foto = imagen;
    }
    const mail = req.body.mail;
    const caracteristicas = req.body.caracteristicas;
    const fecha_perdida = req.body.fecha_perdida;
    const telefono = req.body.telefono;
    const comportamiento = req.body.comportamiento;
    const zona = req.body.zona;

    const perdidas = await Perdida.findAll({
        order: [
          [sequelize.literal('NOT se_encontro'), 'DESC'],
          ['id', 'ASC'],
        ],
    });

    try {
        await Perdida.create({
            nombre: nombre_mascota,
            zona: zona,
            fecha_perdida: fecha_perdida,
            edad: edad,
            sexo: sexo,
            foto: foto,
            comportamiento: comportamiento,
            caracteristicas: caracteristicas,
            mail: mail,
            tel: telefono,
            se_encontro: false,
            MascotumId: select_mascota,
            UserId: session.usuario.id,
        });
        res.render('crear_publicacion_perdida.ejs',{
            alert:true,
            alertTitle:"Publicacion creada",
            alertMessage:"",
            alertIcon:"success",
            showConfirmButton:false,
            timer:1500,
            session: session,
            ruta: 'perdidas',
            perdidas,
            mascotas,
        })

    }
    catch (error) {
        console.log(error);
    }
}

const mostrarContactarPerdida = async(req, res) => {
    publicacionPerdida = await Perdida.findByPk(req.params.id)
    if(!publicacionPerdida){
        return res.send('No existe la publicacion')
    }
    const UsuarioAContactar = await User.findByPk(publicacionPerdida.UserId)
    if(!UsuarioAContactar){
        return res.send('No existe el usuario') // esto nunca deberia ocurrir
    }
    return res.render('../views/contactar_perdida', { session, publicacionPerdida, UsuarioAContactar })
}

const contactarPerdida = async(req, res) => {
    publicacionPerdida = await Perdida.findByPk(req.params.id)
    if(!publicacionPerdida){
        return res.send('No existe la publicacion')
    }
    const UsuarioAContactar = await User.findByPk(publicacionPerdida.UserId)
    if(!UsuarioAContactar){
        return res.send('No existe el usuario') // esto nunca deberia ocurrir
    }

    try{
        await transporter.sendMail({
            from: '"Interes en servicio" <veterinaria.omd@gmail.com>',
            to: "laura.cuenca1@gmail.com", //deberia ser --> to: mailTurno,
            subject: "Interes en servicio",
            text: "Estimado "+ UsuarioAContactar.name + ","+" el cliente "+ req.body.nombre + " ha encontrado a su mascota " + publicacionPerdida.nombre + " su telefono para comunicarse es " + req.body.telefono ,
            })
        res.render('contactar_perdida.ejs',{
            alert:true,
            alertTitle:"Mail enviado",
            alertMessage:"",
            alertIcon:"success",
            showConfirmButton:false,
            timer:1500,
            session: session, 
            publicacionPerdida: publicacionPerdida, 
            UsuarioAContactar: UsuarioAContactar,
            ruta: 'perdidas'
        })
    }
    catch(error){
        res.render('contactar_perdida.ejs',{
            alert:true,
            alertTitle:"No se ha podido enviar el mail",
            alertMessage:"",
            alertIcon:"error",
            showConfirmButton:false,
            timer:1500,
            session: session, 
            publicacionPerdida: publicacionPerdida, 
            UsuarioAContactar: UsuarioAContactar,
            ruta: 'perdidas'
        })
        console.error('Error al enviar mail');
    }
}

const marcarPerdidaComoEncontrado = async(req, res) => {
    publicacionPerdida = await Perdida.findByPk(req.body.parametro1)
    if(!publicacionPerdida){
        return res.send('No existe la publicacion')
    }
    publicacionPerdida.se_encontro = true
    await publicacionPerdida.save()
    return res.redirect('/perdidas')
}

module.exports = {
    mostrarPerdidas,
    mostrarFormularioPerdida,
    generarPublicacionPerdida,
    mostrarContactarPerdida,
    contactarPerdida,
    marcarPerdidaComoEncontrado,
}