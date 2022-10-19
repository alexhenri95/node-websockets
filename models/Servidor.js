import express from 'express'
import cors from 'cors'
import { Server } from "socket.io";
import { createServer } from 'http'
import socketController from '../sockets/controller.js';

class Servidor {
    constructor() {
        this.app = express()
        this.server = createServer(this.app)
        this.io = new Server(this.server, { /* options */ })
        this.port = process.env.PORT
        this.paths = {}
        this.middlewares()
        this.routes()
        this.sockets()
    }

    middlewares() {
        this.app.use( cors() )
        this.app.use( express.json() )
        this.app.use( express.static('public') )
    }

    routes() {

    }
    
    sockets() {
        this.io.on('connection', socketController)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

}

export default Servidor