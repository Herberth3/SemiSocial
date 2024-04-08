import { Request, Response } from "express";
import { execute_procedure } from "../configs/mysql.config";


export const insertarMensaje = async (id_sender: any, id_receiver: any, message: any) => {

    // console.log( 'DATOS RECIBIDOS DEL FRONT: ',id_sender, id_receiver, message);

    const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
        //guardo al artista en la base de datos
        execute_procedure('insertMessage', { id_sender, id_receiver, message, fechaActual });

        // console.log('Mensaje insertado con exito');

    } catch (error) {
        console.log('Error al insertar mensaje: ', error);
    }
}




export const obtenerListaMensajes = async (id_sender: any, id_receiver: any) => {

    // console.log('DATOS RECIBIDOS DEL FRONT: ', id_sender, id_receiver);

    try {

        const get_request = await execute_procedure('getListMessage', { id_sender, id_receiver });

        // console.log(get_request);


        if (get_request.length === 0) {

            const messages: any[] = [
            ];

            console.log('No hay mensajes', get_request);

            return messages;

        } else {

            const messages: any[] = [
            ];

            // Inicializa el arreglo de mensajes
            get_request.forEach((element: any) => {

                if (element.SenderUserID === id_sender) { // Mensaje a la derecha.

                    //Agrega el nuevo mensaje al arreglo
                    const newMessage = {
                        position: "right", // o "left" según corresponda
                        type: "text",
                        title: element.SenderName, // Cambiar según el remitente del mensaje
                        text: element.ContenidoMensaje,
                    };

                    messages.push(newMessage);

                } else {

                    //Agrega el nuevo mensaje al arreglo
                    const newMessage = {
                        position: "left", // o "left" según corresponda
                        type: "text",
                        title: element.SenderName, // Cambiar según el remitente del mensaje
                        text: element.ContenidoMensaje,
                    };

                    messages.push(newMessage);
                }



            });

            return messages;
            // console.log(messages);
        }


    } catch (error) {

        console.log('Error al obtener la lista de mensajes: ', error);
        return JSON.stringify({ content: 'Internal Error al obtener la lista de mensajes, ' + error, status: 500 });

    }
}