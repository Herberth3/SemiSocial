import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import { MessageChatBox } from './MessageChatBox';
import socket from '../socket/socket'



// Estilo de la caja de chat.
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    flexDirection: 'column',
    display: 'flex',
    padding: theme.spacing(2),
    overflow: 'auto',
}));



export const ChatBox = ({ friendChat }) => {


    // Estado para almacenar los mensajes del chat.
    const [chatText, setChatText] = useState([]);


    // Estado para almacenar el mensaje enviado por el usuario.
    const [form, setForm] = useState({ message: '' });


    const receiveMessage = (data) => {
        setChatText(data)
    }


    useEffect(() => {

        socket.connect();

        socket.on('messageFromClient', receiveMessage);

        // Desconectar el socket al desmontar el componente
        return () => {
            socket.off("messageFromClient", receiveMessage)
        }

        // Conectar el socket al montar el componente
        // socket.connect();

        // Manejar mensajes del servidor
        // socket.on('messageFromClient', (data) => {
        //     // console.log('Mensaje recibido del servidor: ', data);
        //     setChatText(data);

        // });

        // Desconectar el socket al desmontar el componente
        return () => {
            socket.off("messageFromClient");
        };

    }, []);


    // Extraer los valores del formulario.
    const handleSubmit = (e) => {

        e.preventDefault();

        // console.log('LO QUE ESTOY ENVIANDO: ', friendChat);

        // socket.emit('messageFromClient', { user_id: userInfo.idUser, friend_id: friendChat.UserID, message: form.message }); // Enviar mensaje al servidor.
        socket.emit('messageFromClient', {
            UserID: friendChat.UserID,
            friend_id: friendChat.friend_id,
            message: form.message
        }); // Enviar mensaje al servidor.

        //socket.close(); // Desconectar el socket.

        setForm({ message: '' }); // Limpiar el formulario.
    };


    // Manejar el cambio en el formulario.
    const handleChange = (e) => {
        setForm({ message: e.target.value });
    };


    return (
        <>
            <Stack spacing={2}>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            width: 880,
                            height: 620,
                        },
                    }}
                >

                    <Item elevation={8}>

                        <MessageChatBox chatText={chatText} />

                    </Item>

                </Box>


                <Box>
                    <form onSubmit={handleSubmit}>

                        <Stack direction="row" spacing={2}>

                            <TextField
                                sx={{ width: 765 }}
                                label="Escribe un mensaje"
                                variant="outlined"
                                name='message'
                                value={form.message}
                                onChange={handleChange}
                            />


                            <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                type="submit"
                                disabled={form.message === '' ? true : false}
                            >
                                enviar
                            </Button>


                        </Stack>

                    </form>

                </Box>

            </Stack>

        </>
    )
}
