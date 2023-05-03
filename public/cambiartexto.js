async function cambiarEstado(boton, adopcionId, seAdopto) {
  console.log('adopcionId:', adopcionId);
  const url = '/actualizarEstado';
  const nuevoEstado = !seAdopto; // Cambia el estado actual al nuevo estado
  console.log('seAdopto:', seAdopto);

  boton.innerHTML = nuevoEstado ? 'Adoptado' : 'Adoptar'; // Actualiza el texto del botón
  console.log('nuevoEstado:', nuevoEstado);
  // Envía la solicitud AJAX al servidor para actualizar el estado en la base de datos
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ id: adopcionId, se_adopto: nuevoEstado }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data);
  console.log('Respuesta del servidor:', data);
}

module.exports = { cambiarEstado, }

