const session = require('express-session');

const mostrarIndex = (req,res) => {
    res.render('index',{ session: session })
}

const mostrarComingSoon = (req,res) => {
    res.render('coming_soon')
}

module.exports = {
    mostrarIndex,
    mostrarComingSoon,
}