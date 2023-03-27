const { sequelize, Sequelize } = require('../models');
const User = require('../models/user')(sequelize, Sequelize.DataTypes);


const mostrarRegister = (req,res) =>{
    res.render('register')
}

/**
 * registrar:
 * Cuando se hace click en registrar
 * se hacen las validaciones y se crea el user en la BD
 */
const registrar = async (req, res) => {    
    const user = req.body.user;
    const pass = req.body.pass;
    const name = req.body.name;
    const rol = req.body.rol;
    if(!user || !pass || !name || !rol)
        console.error('Error al crear usuario:', error);
    else{  
        User.create({
            user:user,
            name:name,
            rol:rol,
            pass:pass,
        })
        .then(user => {
            res.render('register',{
                alert:true,
                alertTitle:"Registration",
                alertMessage:"Registracion exitosa",
                alertIcon:"success",
                showConfirmButton:false,
                timer:1500,
                ruta:'',
            })
        })
        .catch(error => {
            console.error('Error al crear usuario:', error);
        });
}}



module.exports = {
    registrar,
    mostrarRegister,
}