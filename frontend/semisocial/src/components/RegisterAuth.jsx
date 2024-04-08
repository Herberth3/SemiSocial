import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Webcam from 'react-webcam';
import { useForm } from './hooks/useForm';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { setRegister } from './helpers/setRegister';
import { AlertSuccess } from './helpers/AlertSuccess';

export const RegisterAuth = () => {

    // Hook para navegar entre paginas.
    const navigate = useNavigate();


    // Estado para el mensaje de exito.
    const [showAlert, setShowAlert] = useState(false);


    // Hook para la camara.
    const webcamRef = useRef(null);


    // Estado para opcion de foto de perfil.
    const [indexProfile, setIndexProfile] = useState(0); // 0 = Cargar imagen, 1 = Tomar una foto.


    // Estado para la imagen capturada.
    const [capturedImage, setCapturedImage] = useState(null);


    // Custom hook para el formulario.
    const { form, handleChange, handleLicenseChange, handleReset } = useForm({
        name: '',
        email: '',
        dpi: '',
        password: '',
        confirmPassword: ''
    });


    // Estado para la foto.
    const [photo, setPhoto] = useState({
        profile: '', //No lo utilizo, pero lo dejo por si acaso.
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

    }, [capturedImage])


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


    // Metodo para redireccionar a inicio de sesion.
    const handleNavigateTo = () => {

        navigate('/', {
            replace: true,
        });

    }


    // Extraer los valores del formulario.
    const habdleSubmit = (e) => {

        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        if (photo === '') {
            alert('Debe cargar una foto de perfil.');
            return;
        }

        setRegister(form, photo); //Registrar un usuario.

        handleReset();

        setCapturedImage(null);

        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });

    }


    return (
        <>
            <form onSubmit={habdleSubmit}>

                <div>
                    <TextField
                        required
                        sx={{ width: 500 }}
                        variant="filled"
                        label="Nombre Completo"
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <TextField
                        required
                        sx={{ width: 500, marginTop: 2 }}
                        variant="filled"
                        label="Correo electrónico"
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <TextField
                        required
                        sx={{ width: 500, marginTop: 2 }}
                        variant="filled"
                        label="DPI"
                        name='dpi'
                        value={form.dpi}
                        onChange={handleLicenseChange}
                    />
                </div>


                <div>
                    <TextField
                        required
                        sx={{ width: 240, marginTop: 2 }}
                        variant="filled"
                        type='password'
                        label="Contraseña"
                        name='password'
                        value={form.password}
                        onChange={handleChange}
                    />

                    <TextField
                        required
                        sx={{ width: 240, marginTop: 2, marginLeft: 3 }}
                        variant="filled"
                        type='password'
                        label="Confirmar contraseña"
                        name='confirmPassword'
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <FormControl>
                        <FormLabel id="buttons-label" sx={{ marginTop: 2 }}>Foto de perfil</FormLabel>
                        <RadioGroup
                            row
                            defaultValue={0}
                            aria-labelledby="buttons-label"
                            sx={{ marginLeft: 10 }}
                        >
                            <FormControlLabel value={0} onChange={() => setIndexProfile(0)} control={<Radio />} label="Cargar imagen" />
                            <FormControlLabel value={1} onChange={() => setIndexProfile(1)} control={<Radio />} label="Tomar una foto" />
                        </RadioGroup>
                    </FormControl>
                </div>

                {
                    indexProfile === 0

                        ?

                        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
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
                        </div>

                        :

                        <div style={{ flexDirection: 'column', height: 300, width: 300, marginLeft: 50 }}>

                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                height={300}
                                screenshotFormat="image/jpeg"
                            />

                            <Button
                                sx={{ width: '31ch', height: '7ch', marginLeft: 10 }}
                                variant="contained"
                                color="primary"
                                onClick={handleCapture}
                            >
                                Tomar foto
                            </Button>

                        </div>

                }


                <div style={{ marginTop: indexProfile === 0 ? 30 : 90, display: 'flex', alignContent: 'center', justifyContent: 'center' }}>

                    <Button variant="contained" type="submi" color="success" sx={{ m: 1, width: 155, height: 45 }}>
                        Registrarse
                    </Button>


                    <Button variant="contained" onClick={handleNavigateTo} color="primary" sx={{ m: 1, width: 155, height: 45 }}>
                        Atras
                    </Button>

                </div>

            </form>

            {
                showAlert === true
                    ?
                    <AlertSuccess message={"Se ha capturado la imagen"} flag={true} setShowAlert={setShowAlert} />
                    :
                    null
            }

        </>
    );
}
