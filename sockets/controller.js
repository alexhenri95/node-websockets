const socketController = socket => {
    console.log('cliente conectado', socket.id)

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id)
    })

    socket.on('enviar-mensaje', (payload, cb) => {
        

        const id = 123
        cb(id)
        // this.io.emit('reenviando-mensaje', payload) //responde al que envio pero no a todos
        // socket.emit('reenviando-mensaje', payload) //responde al que envio pero no a todos
        socket.broadcast.emit('reenviando-mensaje', payload)

    })
}

export default socketController