const session = require('express-session');

const mostrarVeterinarias = (req, res) => {
    res.render('veterinarias_turno', { session });
}

module.exports = {
    mostrarVeterinarias
}