const spanOnline = document.querySelector('#spanOnline')
const spanOffline = document.querySelector('#spanOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')

const socket = io()

socket.on('connect', () => {
    // console.log('conectado')
    spanOffline.style.display = 'none'
    spanOnline.style.display = ''
})

socket.on('disconnect', () => {
    // console.log('desconectado');n
    spanOffline.style.display = ''
    spanOnline.style.display = 'none'
})

socket.on('reenviando-mensaje', (payload) => {
    const { mensaje } = payload
    console.log(payload);
})

btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value 

    if (mensaje === '') {
        console.log('campos vacios');
        return
    }

    const payload = {
        mensaje,
        id: '123-ABC',
        disponible: true
    }

    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('enviando desde el fronted ', id);
    })

})