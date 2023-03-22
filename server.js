const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

// Configurar la base de datos
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Definir el modelo de usuarios
const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  edad: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

// Inicializar la aplicación de Express
const app = express();

// Configurar el middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar las rutas para tu aplicación
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.post('/usuarios', async (req, res) => {
  const { nombre, email, edad } = req.body;
  try {
    const nuevoUsuario = await Usuario.create({ nombre, email, edad });
    res.json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});