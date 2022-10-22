const socket = io()


// const params = new URLSearchParams( window.location.search )

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html'
    throw new Error('El nombre y sala son requeridoa.')
}

const usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}


socket.on('connect', () => {
    socket.emit('ingresando-chat', usuario, (resp) => {
        // console.log('Usuarios conectados: ', resp)
        renderizarUsuarios(resp)
    } )
})


socket.on('notificar-usuario', (resp) => {
    // console.log('Desde servidor', resp);
    renderizarMensajes(resp)
    scrollBottom()
})


socket.on('actualizar-lista-usuarios-conectados', (resp) => {
    // console.log(resp);
    renderizarUsuarios(resp)
})


// socket.emit('notificar-usuario', {
//     nombre: 'alex',
//     mensaje: 'hola como estan',
// }, (resp) => {
//     console.log(resp);
// })



// socket.emit('mensaje-privado', {
//     mensaje: 'buenos dias', 
//     receptor: '3hpwq804i-yBZ_xwAAAN'
// })

//mensaje privado
socket.on('mensaje-privado', (mensaje) => {
    console.log('Mensaje privado', mensaje);
})



socket.on('disconnect', () => {
    console.log('Perdimos conexion con el servidor');
})