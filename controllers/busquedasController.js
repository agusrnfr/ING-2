

const mostrarBusquedas = async(req, res) => {
    return res.render('../views/coming_soon')
}

const mostrarFormularioBusqueda = async(req, res) => {
    return res.render('../views/crear_publicacion_busqueda')
}

const generarPublicacionBusqueda = async(req, res) => {
}

const mostrarContactarBusqueda = async(req, res) => {
    res.render('../views/contactar_busqueda')
}

const contactarBusqueda = async(req, res) => {
}

const marcarBusquedaComoEncontrado = async(req, res) => {
}


module.exports = {
    mostrarBusquedas,
    mostrarFormularioBusqueda,
    generarPublicacionBusqueda,
    mostrarContactarBusqueda,
    contactarBusqueda,
    marcarBusquedaComoEncontrado,
}