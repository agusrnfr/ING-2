const { sequelize, Sequelize } = require('../models');
const User = require('../models/user')(sequelize, Sequelize.DataTypes);


const mostrarLogin = (req,res) =>{
    res.render('login')
}

const validarLogin = async (req, res) => {    
    
    const user = req.body.user;
    const pass = req.body.pass;
        
    if(user && pass)
        User.findOne({
            where: {
            user: user,
            pass: pass
            }
        }).then(usuarioEncontrado => {
            if (usuarioEncontrado) {
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


module.exports = {
    validarLogin,
    mostrarLogin,
}