import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useForm } from './hooks/useForm';
import { setPublication } from './helpers/setPublication';


export const CreatePublication = ({ userInfo }) => {

    // Estado para la foto.
    const [photo, setPhoto] = useState({
        profile: '', //No lo utilizo, pero lo dejo por si acaso.
        base64: '',
        name: '',
    });


    // Custom hook para la publicacion.
    const { form, handleChange, handleReset } = useForm({
        description: '',
    });


    // Funcion para manejar fotos de publicacion y convertir a base 64.
    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                if (reader.readyState === 2) {
                    const base64 = reader.result;
                    var arrayB64 = base64.split(',');
                    setPhoto({
                        profile: base64,
                        base64: arrayB64[1],
                        name: e.target.files[0].name,
                    });
                }
            }
        }
    }


    // Cancelar foto de publicacion
    const handleCancelPhoto = () => {

        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });

    }


    //Hacer una publicacion.
    const habdleSubmit = (e) => {

        e.preventDefault();

        setPublication(form, photo, userInfo); // Funcion para hacer una publicacion.

        handleReset();

        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });
    }


    return (
        <Box sx={{ width: '100%', maxWidth: 600, backgroundColor: '#EAECEE' }}>

            <form onSubmit={habdleSubmit}>

                <Box sx={{ backgroundColor: '#EAECEE' }}>

                    <List sx={{ width: '100%', maxWidth: 600, backgroundColor: '#EAECEE' }}>

                        <ListItem alignItems="flex-start">

                            <ListItemAvatar>
                                <Avatar src={userInfo.photo === "" ? null : userInfo.photo} />
                            </ListItemAvatar>

                            <TextField
                                sx={{ width: '100%' }}
                                variant="outlined"
                                label="¿Qué estás pensando?"
                                name='description'
                                value={form.description}
                                onChange={handleChange}
                            />



                        </ListItem>

                    </List>

                </Box>

                <Divider variant="middle" />

                <Box sx={{ m: 2 }}>

                    <Box sx={{ width: '100%', height: 300, p: 1, border: '1px dashed grey' }}>

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


                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<AddPhotoAlternateIcon />}
                        title="..."
                        sx={{ marginTop: 1, }}
                        href="#file-upload"
                    >
                        Agregar
                        <input
                            style={{ display: 'none' }} // Para ocultar el input por defecto
                            type="file"
                            accept="image/*" // Aquí especifica las extensiones permitidas
                            onChange={handlePhoto}
                        />
                    </Button>


                    <Button
                        sx={{ marginTop: 1, ml: 1 }}
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={handleCancelPhoto}
                    >
                        Cancelar
                    </Button>


                </Box>

                <Box sx={{ mt: 1, ml: 1, mb: 1 }}>
                    <Button
                        sx={{ width: "98%" }}
                        variant="contained"
                        color="primary"
                        type="submi"
                        disabled={photo.profile === '' ? true : false}
                    >
                        Publicar
                    </Button>
                </Box>

            </form>

        </Box >
    )
}
