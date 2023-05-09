const session = require('express-session');

const mostrarIndex = (req,res) => {
    res.render('index',{ session: session })
}


module.exports = {
    mostrarIndex,
}