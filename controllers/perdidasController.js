

const mostrarPerdidas = async(req, res) => {
    return res.render('../views/perdidas')
}

const mostrarFormularioPerdida = async(req, res) => {
    return res.render('../views/crear_publicacion_perdida')
}

const generarPublicacionPerdida = async(req, res) => {
}

module.exports = {
    mostrarPerdidas,
    mostrarFormularioPerdida,
    generarPublicacionPerdida,
}