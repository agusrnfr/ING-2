const User = require('../db/models/user.js');
const session = require('express-session');

const mostrarLogin = (req, res) => {
    if (session.loggedin) {
        res.send("ya tiene una sesion iniciada")
        return
    }
    res.render('login')
}

const validarLogin = async (req, res) => {
    try {
        const mail = req.body.mail;
        const pass = req.body.pass;

        if (!mail || !pass) {
            console.error('Error: campos incompletos');
            return;
        }
        const usuarioEncontrado = await User.findOne({
            where: {
                mail: mail,
                pass: pass
            }
        });
        if (!usuarioEncontrado) {
            res.render('login', {
                alert: true,
                alertTitle: "Usuario o contraseña invalidos",
                alertMessage: "",
                alertIcon: "error",
                showConfirmButton: false,
                timer: 1500,
            })
            return;
        }

        //el usuario y la contraseña coinciden
        session.usuario = usuarioEncontrado.dataValues;
        session.loggedin = true;
        res.render('login', {
            alert: true,
            alertTitle: "Inicio de sesion exitoso",
            alertMessage: "",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
            ruta: '',
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error en el servidor en el login');
    }
};

const deslogear = async (req, res) => {
    if (session.loggedin) {
        session.loggedin = false
        delete session.usuario;
    }
    res.redirect('/')
};

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

/**
 * MIDDLEWARE comprobar sesion admin:
 * Comprueba que tenga una sesion iniciada
 * de admin
 */
const comprobar_sesion_admin = (req, res, next) => {
    if (session.loggedin && session.usuario.rol === 'admin'){
        next();
    }     
    else{ 
    res.redirect('/');
    }
}

module.exports = {
    validarLogin,
    mostrarLogin,
    comprobar_sesion,
    comprobar_sesion_admin,
    deslogear,
}