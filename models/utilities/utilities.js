const crearMensaje = (nombre, mensaje) => {

    return  {
        nombre,
        mensaje,
        fecha: new Date().toDateString()
    }
}

export default crearMensaje