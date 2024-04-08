import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import { MessageChatBox } from './MessageChatBox';
import { useForm } from './hooks/useForm';
import { setChatBot } from './helpers/setChatBot';


// Estilo de la caja de chat.
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    flexDirection: 'column',
    display: 'flex',
    padding: theme.spacing(2),
    overflow: 'auto',
}));




export const MessageBot = () => {

    // Custom hook para el formulario.
    const { form, handleChange, handleReset } = useForm({
        message: ''
    });


    // Estado para almacenar los mensajes del chat.
    const [chatText, setChatText] = useState([]);



    // Extraer los valores del formulario.
    const habdleSubmit = (e) => {

        e.preventDefault();

        setChatBot(form, setChatText, chatText);

        handleReset();
    }


    return (

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
                <form onSubmit={habdleSubmit}>

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
                            type="submi"
                            disabled={form.message === '' ? true : false}
                        >
                            enviar
                        </Button>


                    </Stack>

                </form>

            </Box>

        </Stack>
    )
}
