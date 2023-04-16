const { sequelize, Sequelize } = require('../models');
const User = require('../models/user')(sequelize, Sequelize.DataTypes);
const session = require('express-session');

const mostrarLogin = (req,res) =>{
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
            if (usuarioEncontrado) {
                session.mail = mail;
                session.loggedin = true;
            // El usuario y la contraseña coinciden
                res.render('login',{
                    alert:true,
                    alertTitle:"Registration",
                    alertMessage:"Inicio de sesion exitoso",
                    alertIcon:"success",
                    showConfirmButton:false,
                    timer:1500,
                    ruta:'',
                })
            

            
            } else {
                console.error('contra incorrecta');
                res.send('contraseña y/o usuario incorrecta')
                // El usuario y/o la contraseña son incorrectos
            }
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