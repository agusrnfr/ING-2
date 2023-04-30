
const { exec } = require('child_process');
exec('sequelize-erd --source app.js --destination ./erd.svg', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error al generar imagen`);
      return;
    }
    else {
      console.log(`Imagen de las tablas generada`);
    }
  });
  