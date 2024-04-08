import { API_URL, USER_LOGIN } from '../../env.js';

const Swal = require('sweetalert2');

export const setLogin = async (form, photo, authFacial, navigate, setDataUser) => {

    if (authFacial) { // Si el usuario se autentico con el rostro.

        const authUser = {
            user: form.user,
            base64: photo.base64,
            namePhoto: photo.name,
        }

        const url = API_URL + USER_LOGIN;

        // Peticion al backend.
        const rep = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authUser)
        });


        const data = await rep.json();

        const status = rep.status;

        if (status === 200) { // Iniciar sesion.

            setDataUser({ // Guardar datos del usuario.
                email: form.user,
            })

            navigate('/inicio', { // Redireccionar a la pagina de inicio.
                replace: true,
            });

        } else { // Error en las credenciales

            Swal.fire({
                title: 'Error!',
                text: `${data.content}`,
                icon: 'error',
                confirmButtonText: 'Ok'
            });

        }


    } else { // Si el usuario se autentico con el usuario y contraseña.

        const authUser = {
            email: form.user,
            contra: form.password,
        }

        const url = API_URL + USER_LOGIN;

        // Peticion al backend.
        const rep = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authUser)
        });


        const data = await rep.json();

        const status = rep.status;

        if (status === 200) { // Iniciar sesion.

            localStorage.setItem('token', data.accesToken); // Guardar token en el local storage.

            setDataUser({ // Guardar datos del usuario.
                email: form.user,
                password: form.password,
            })

            navigate('/inicio', {
                replace: true,
            });

        } else { // Error en las credenciales

            Swal.fire({
                title: 'Error!',
                text: `${data.content}`,
                icon: 'error',
                confirmButtonText: 'Ok'
            });

        }
    }

}
