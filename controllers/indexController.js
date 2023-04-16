const session = require('express-session');

const mostrarIndex = (req,res) => {
    res.render('index',{ usuario: session.usuario})
}

module.exports = {
    mostrarIndex,
}