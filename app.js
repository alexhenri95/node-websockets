import Servidor from './models/Servidor.js'
import dotenv from 'dotenv'
dotenv.config()

const server = new Servidor()

server.listen()