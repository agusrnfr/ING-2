const User = require('../db/models/user.js');
const session = require('express-session');

const mostrarReportes = async(req, res) => {
    
    return res.render('../views/reportes')
  }
  
  module.exports = {
      mostrarReportes
  }