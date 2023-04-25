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
    const mail = req.body.mail;
    const name = req.body.name;
    const tel = req.body.tel;
    const DNI = req.body.DNI;
    const pass = req.body.pass;
    let rol = req.body.rol;
    if(!mail || !pass || !name || !tel || !DNI || !rol){
        console.error('Error al crear usuario');
        return
    }
    if(rol==='on')
        rol='cliente';
    else
        rol='admin';
    User.create({
        mail:mail,
        name:name,
        tel:tel,
        DNI:DNI,
        pass:pass,
        rol:rol,
    })
    .then(user => {
        res.render('register',{
            alert:true,
            alertTitle:"Registracion exitosa",
            alertMessage:"",
            alertIcon:"success",
            showConfirmButton:false,
            timer:1500,
            ruta:'',
        })
    })
    .catch(error => {
        res.render('register',{
            alert:true,
            alertTitle:"Registracion fallida",
            alertMessage:"",
            alertIcon:"error",
            showConfirmButton:false,
            timer:1500,
        })
    });
}


const chequear_mail_duplicado = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({
            where: {
                mail: email
            }
        });
        if (user) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ exists: false });
    }
};


module.exports = {
    registrar,
    mostrarRegister,
    chequear_mail_duplicado,
}