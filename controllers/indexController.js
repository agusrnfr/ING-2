const session = require('express-session');

const mostrarIndex = (req,res) => {
    res.render('index',{ usuario_mail: session.mail})
}

module.exports = {
    mostrarIndex,
}