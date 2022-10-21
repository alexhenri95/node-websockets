import Usuarios from "../classes/usuarios.js"
import crearMensaje from "../utilities/utilities.js"

const usuarios = new Usuarios()

const socketController = client => {
    client.on('ingresando-chat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre y la sala es necesario.'
            })
        }

        client.join(data.sala)

        usuarios.agregarPersona( client.id, data.nombre, data.sala )
        
        client.broadcast.to(data.sala).emit('actualizar-lista-usuarios-conectados', usuarios.getPersonasPorSala(data.sala))

        return callback(usuarios.getPersonasPorSala(data.sala))
    })

    client.on('notificar-usuario', (data) => {
        let persona = usuarios.getPersona(client.id)
        let mensaje = crearMensaje( persona.nombre, data.mensaje )
        client.broadcast.to(persona.sala).emit('notificar-usuario', mensaje)
    })

    client.on('mensaje-privado', data => {
        let persona = usuarios.getPersona(client.id)
        client.broadcast.to(data.receptor).emit('mensaje-privado', crearMensaje(persona.nombre, data.mensaje))
    })

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona( client.id )

        client.broadcast.to(personaBorrada.sala).emit('notificar-usuario', crearMensaje('Administrador', `${personaBorrada.nombre} abandonó la sala ${personaBorrada.sala}.`))

        client.broadcast.to(personaBorrada.sala).emit('actualizar-lista-usuarios-conectados', usuarios.getPersonasPorSala(personaBorrada.sala))
    })
}

export default socketController