const { sequelize, Sequelize } = require('../models');
const User = require('../models/user')(sequelize, Sequelize.DataTypes);
const session = require('express-session');

const mostrarLogin = (req,res) =>{
    if(session.loggedin){
        res.send("ya tiene una sesion iniciada")
        return
    }
    res.render('login')
}

const validarLogin = async (req, res) => {    
    
    const mail = req.body.mail;
    const pass = req.body.pass;

    if(mail && pass)
        User.findOne({
            where: {
            mail: mail,
            pass: pass
            }
        }).then(usuarioEncontrado => {
            // El usuario y la contraseña no coinciden
            if (!usuarioEncontrado) {
                res.render('login',{
                    alert:true,
                    alertTitle:"Login",
                    alertMessage:"Usuario o contraseña invalidos",
                    alertIcon:"error",
                    showConfirmButton:false,
                    timer:1500,
                })
            return
            }
            // El usuario y la contraseña coinciden
            session.usuario = usuarioEncontrado.dataValues;
            session.loggedin = true;
            res.render('login',{
                alert:true,
                alertTitle:"Login",
                alertMessage:"Inicio de sesion exitoso",
                alertIcon:"success",
                showConfirmButton:false,
                timer:1500,
                ruta:'',
            })
        });
}


/**
 * MIDDLEWARE comprobar sesion:
 * Comprueba que tenga una sesion iniciada
 * no importa si es sesion admin o de usuario
 */
const comprobar_sesion = (req, res, next) => {
    if (session.loggedin) {
      next();
    } else {
      res.redirect('/login');
    }
};

module.exports = {
    validarLogin,
    mostrarLogin,
    comprobar_sesion,
}