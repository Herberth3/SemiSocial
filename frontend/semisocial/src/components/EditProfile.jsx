import React, { useRef, useEffect, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Webcam from 'react-webcam';
import { styled } from '@mui/material/styles';
import { AlertSuccess } from './helpers/AlertSuccess';
import { useForm } from './hooks/useForm';
import { setEditProfile } from './helpers/setEditProfile';
import { updateProfile } from './helpers/updateProfile';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
}));


export const EditProfile = ({ setUserInfo, userInfo, setDataUser, dataUser }) => {

    // Estado para opcion de foto de perfil.
    const [indexProfile, setIndexProfile] = useState(0); // 0 = Cargar imagen, 1 = Tomar una foto.


    // Estado para el mensaje de exito.
    const [showAlert, setShowAlert] = useState(false);


    // Estado para los datos actualizados usuario.
    const [updateData, setUpdateData] = useState({});


    // Estado para la imagen capturada.
    const [capturedImage, setCapturedImage] = useState(null);


    // Hook para la camara.
    const webcamRef = useRef(null);


    // Custom hook para el formulario.
    const { form, handleChange, handleLicenseChange, setForm } = useForm({
        name: userInfo.name,
        email: userInfo.email,
        dpi: userInfo.dpi,
        password: '',
    });


    // Estado para la foto.
    const [photo, setPhoto] = useState({
        profile: userInfo.photo, //No lo utilizo, pero lo dejo por si acaso.
        base64: '',
        name: '',
    });


    // Funcion para capturar la imagen de la camara.
    const handleCapture = useCallback(() => {

        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);

    }, [webcamRef, setCapturedImage]);


    // Estado para la captura de la foto.
    useEffect(() => {

        if (capturedImage != null) {

            const arrayB64 = capturedImage.split(',');

            setPhoto({
                profile: capturedImage,
                base64: arrayB64[1],
                name: 'photoProfile.jpg', //Corregir nombre
            });

            setShowAlert(true);
        }

    }, [capturedImage]);



    // Estado para actualizar los datos del usuario.
    useEffect(() => {

        setUserInfo({
            ...userInfo,
            name: updateData.name,
            photo: updateData.photo,
        }); // Actualizamos los datos del usuario.


    }, [updateData, setUserInfo, userInfo]);




    // Funcion para manejar fotos de perfil y convertir a base 64.
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


    // Extraer los valores del formulario.
    const habdleSubmit = async (e) => {

        e.preventDefault();

        if (form.password !== dataUser.password) {
            alert('Verificar la contraseña.');
            return;
        }

        const status = await setEditProfile(form, photo); // Funcion para editar perfil.

        if (status === 200) { // Si se edito el perfil correctamente.
            updateProfile(form.email, setUpdateData); // Funcion para actualizar los datos del usuario.
        }


        setCapturedImage(null);

        setForm({
            ...form,
            password: '',
        });

        // setPhoto({
        //     profile: photo.profile, //No lo utilizo, pero lo dejo por si acaso.
        //     base64: '',
        //     name: '',
        // });

    }


    return (
        <>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        width: 900,
                        height: 600,
                    },
                }}
            >

                <Item elevation={8}>

                    <Stack direction="row" spacing={2}>
                        <FormControl>
                            <RadioGroup
                                row
                                defaultValue={0}
                            >
                                <FormControlLabel value={0} onChange={() => setIndexProfile(0)} control={<Radio />} label="Cargar imagen" />
                                <FormControlLabel value={1} onChange={() => setIndexProfile(1)} control={<Radio />} label="Tomar una foto" />
                            </RadioGroup>
                        </FormControl>
                    </Stack>

                    {
                        indexProfile === 0
                            ?

                            <React.Fragment>


                                <Avatar sx={{ height: 200, width: 200, mt: 2 }} src={photo.profile === '' ? null : photo.profile} />


                                <Button
                                    component="label"
                                    color="primary"
                                    title="..."
                                    sx={{ marginTop: 2, width: '31ch', height: '7ch', }}
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                    href="#file-upload"
                                >
                                    {photo.profile === '' ? 'Cargar foto' : 'Foto cargada*'}
                                    <input
                                        style={{ display: 'none' }} // Para ocultar el input por defecto
                                        type="file"
                                        accept="image/*" // Aquí especifica las extensiones permitidas
                                        onChange={handlePhoto}
                                    />

                                </Button>

                            </React.Fragment>

                            :

                            <div style={{ flexDirection: 'column', height: 200, width: 200 }}>

                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    height={200}
                                    screenshotFormat="image/jpeg"
                                />

                                <Button
                                    sx={{ marginTop: 2, width: '31ch', height: '7ch', }}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCapture}
                                >
                                    Tomar foto
                                </Button>

                            </div>


                    }

                    <form onSubmit={habdleSubmit}>

                        <Stack sx={{ mt: indexProfile === 0 ? 4 : 13 }} direction="row" spacing={4}>

                            <TextField
                                required
                                sx={{ width: 330 }}
                                label="Nombre Completo"
                                name='name'
                                onChange={handleChange}
                                value={form.name}
                            />

                            <TextField
                                required
                                label="DPI"
                                name='dpi'
                                onChange={handleLicenseChange}
                                value={form.dpi}
                            />

                        </Stack>


                        <Stack sx={{ mt: 4 }} direction="row" spacing={4}>

                            <TextField
                                required
                                disabled
                                sx={{ width: 330 }}
                                label="Correo electrónico"
                                name='email'
                                onChange={handleChange}
                                value={form.email}
                            />

                            <TextField
                                required
                                type='password'
                                label="Contraseña"
                                name='password'
                                onChange={handleChange}
                                value={form.password}
                            />

                        </Stack>


                        <Button
                            sx={{ mt: 2, ml: 25, width: 190, height: 55 }}
                            variant="contained"
                            type="submi"
                            color="success"
                            disabled={form.password === '' ? true : false}
                        >
                            Guardar cambios
                        </Button>

                    </form>

                </Item>

            </Box>


            {
                showAlert === true
                    ?
                    <AlertSuccess message={"Se ha capturado la imagen"} flag={true} setShowAlert={setShowAlert} />
                    :
                    null
            }

        </>
    )
}
