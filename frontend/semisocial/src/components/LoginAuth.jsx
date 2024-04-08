import React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useForm } from './hooks/useForm';
import { setLogin } from './helpers/setLogin';


export const LoginAuth = ({ checked, setChecked, photo, setPhoto, facial, setFacial, setDataUser }) => {

    // Hook para navegar entre paginas.
    const navigate = useNavigate();


    // Custom hook para el formulario.
    const { form, handleChange, handleReset, setForm } = useForm({
        user: '',
        password: ''
    });


    // Metodo para redireccionar a Registro.
    const handleNavigateTo = () => {

        navigate('/registro', {
            replace: true,
        });

    }


    // Metodo para el checkbox.
    const handleCheckedChange = (event) => {

        setChecked(event.target.checked);

        if (facial) {
            setFacial(false);
        }

        setForm({
            ...form,
            password: ''
        });

    };


    // Extraer los valores del formulario.
    const habdleSubmit = (e) => {

        e.preventDefault();

        if (checked) { // Login con reconocimiento facial.

            setLogin(form, photo, true, navigate, setDataUser); // Enviar los datos al servidor.

        } else { // Login con credenciales.

            setLogin(form, photo, false, navigate, setDataUser); // Enviar los datos al servidor.

        }

        handleReset();

        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });
    }


    return (
        <form onSubmit={habdleSubmit}>

            <div>
                <TextField
                    required
                    sx={{ width: 350, m: 1 }}
                    label="Nombre de usuario"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    name='user'
                    value={form.user}
                    onChange={handleChange}
                />
            </div>


            <div>
                <TextField
                    required
                    disabled={checked}
                    sx={{ width: 350, m: 1 }}
                    label="Contraseña"
                    type='password'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                />
            </div>


            <div style={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={handleCheckedChange} />}
                    label='usar reconocimiento facial'
                />
            </div>


            <div style={{ marginTop: 10 }}>
                <Button
                    sx={{ m: 1, width: 155, height: 45 }}
                    variant="contained"
                    type="submi"
                    color="success"
                    disabled={checked && !facial ? true : false}
                >
                    Ingresar
                </Button>

                <Button variant="contained" onClick={handleNavigateTo} color="primary" sx={{ m: 1, width: 155, height: 45 }}>
                    Registrarse
                </Button>
            </div>

        </form>
    );
}
