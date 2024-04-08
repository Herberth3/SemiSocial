import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useForm } from './hooks/useForm';
import { setComment } from './helpers/setComment';
import { AlertSuccess } from './helpers/AlertSuccess';


export const CardPost = ({ publication, userInfo }) => {

    // Estado para el mensaje de exito.
    const [showAlert, setShowAlert] = useState(false);


    // Custom hook para la publicacion.
    const { form, handleChange, handleReset } = useForm({
        comment: '',
    });


    // Estado para la foto.
    const [photo, setPhoto] = useState({
        profile: publication.Imagen, //No lo utilizo, pero lo dejo por si acaso.
        base64: '',
        name: '',
    });


    //Hacer una publicacion.
    const handleSubmit = (e) => {

        e.preventDefault();

        setComment(form.comment, setShowAlert);

        handleReset();

        setPhoto({
            profile: '', //No lo utilizo, pero lo dejo por si acaso.
            base64: '',
            name: '',
        });
    }


    return (
        <Box sx={{ width: '100%', maxWidth: 600, backgroundColor: '#EAECEE' }}>

            <Box sx={{ backgroundColor: '#EAECEE' }}>

                <List sx={{ width: '100%', maxWidth: 600, backgroundColor: '#EAECEE' }}>

                    <ListItem alignItems="flex-start">

                        <ListItemAvatar>
                            <Avatar src={publication.FotoDePerfil} />
                        </ListItemAvatar>

                        <ListItemText
                            primary={publication.NombreUsuario}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                    </Typography>
                                    {publication.Descripcion}
                                </React.Fragment>
                            }
                        />

                    </ListItem>

                </List>

            </Box>

            <Box sx={{ m: 2 }}>

                <Box sx={{ width: '100%', height: 300 }}>

                    {
                        photo.profile !== ''
                            ?

                            <img src={photo.profile} alt="logo" width='100%' height="280" />

                            :
                            <Avatar
                                sx={{ width: '100%', height: 280 }}
                                variant="rounded"
                            >
                                <InsertPhotoIcon />
                            </Avatar>
                    }
                </Box>

            </Box>


            <Box sx={{ mt: 1, ml: 1, mb: 1 }}>

                <Accordion sx={{ width: '99%', backgroundColor: '#EAECEE' }}>

                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">

                        <Typography>Comentarios</Typography>

                    </AccordionSummary>


                    <ListItem >

                        <form onSubmit={handleSubmit}>

                            <TextField
                                sx={{ width: 490 }}
                                required label="Escribe tu comentario"
                                name='comment' value={form.comment}
                                onChange={handleChange}
                                variant="outlined"
                            />


                            <IconButton
                                disabled={form.comment === '' ? true : false}
                                type='submi'
                                color="primary"
                                size="large"
                            >
                                <SendIcon />
                            </IconButton>

                        </form>

                    </ListItem>

                </Accordion>

            </Box>

            {
                showAlert === true
                    ?
                    <AlertSuccess message={"Se ha publicado el comentario"} flag={true} setShowAlert={setShowAlert} />
                    :
                    null
            }

        </Box >
    )
}
