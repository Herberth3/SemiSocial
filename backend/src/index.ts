import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import http from 'http'
import socketIo, { Socket } from 'socket.io'
import routerAuth from './routes/auth.route'
import routerUser from './routes/user.route'
import { insertarMensaje, obtenerListaMensajes } from './controllers/chat.controller'

const app: Application = express()
// Socket.io to users chat
const server = http.createServer(app)
const io = new socketIo.Server(server, {
    cors: {
        origin: "*"
    }
})



// settings
app.set('port', process.env.PORT)

// middlewares
app.use(morgan('dev'))
app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb' }))

// routes
app.use(routerAuth);
app.use(routerUser);


// var datosMensaje: any = [];
var userid = 0;
var friendid = 0;
var contenido = '';


// Socket.IO connection to users chat
io.on('connection', (socket: Socket) => {

    console.log('Usuario conectado al socket');


    // Diccionario de usuarios conectados
    socket.on('messageFromClient', (data) => {
        userid = data.UserID;
        friendid = data.friend_id;
        contenido = data.message;
        if (data.message !== '') { // Llama a la función para insertar el mensaje en la base de datos

            // console.log('Mensaje recibido del cliente: ', data);

            insertarMensaje(data.UserID, data.friend_id, data.message);

            // console.log('Estoy insertando: ', friendid);

        }

        setInterval(async () => {

            // console.log('Voy a Obtener: ', data.friend_id);

            // console.log('Mensaje recibido del cliente: ', data);
            let datosMensaje = await obtenerListaMensajes(userid, friendid);

            socket.broadcast.emit('messageFromClient', datosMensaje); // Envia el mensaje a todos los clientes conectados

        }, 2000);

        // setInterval(async () => {

        //     // console.log('Voy a Obtener: ', data.friend_id);

        //     // console.log('Mensaje recibido del cliente: ', data);
        //     let datosMensaje = await obtenerListaMensajes(data.UserID, data.friend_id);

        //     io.emit('messageFromClient', datosMensaje); // Envia el mensaje a todos los clientes conectados

        // }, 2000);
    });



    // Socket desconectado.
    socket.on('disconnect', () => {
        // Eliminar el socket del diccionario cuando el usuario se desconecta
        // const userId = getUserIdBySocket(socket);
        // delete usersSockets[userId];
        console.log('Usuario desconectado del socket');
    });





});


const PORT = app.get('port');

const main = () => {
    server.listen(PORT, () => console.log(`Running on PORT: ${PORT}`))
}

main();

