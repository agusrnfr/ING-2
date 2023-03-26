const { sequelize, Sequelize } = require('../models');
const User = require('../models/user')(sequelize, Sequelize.DataTypes);


const mostrarRegister = (req,res) =>{
    res.render('register')
}

const registrar = async (req, res) => {    
    const user = req.body.user;
    const pass = req.body.pass;
    const name = req.body.name;
    const rol = req.body.rol;
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
}


module.exports = {
    registrar,
    mostrarRegister,
}