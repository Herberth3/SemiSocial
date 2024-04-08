import { API_URL, USER_LOGOUT } from '../../env.js';

export const getLogout = async (navigate) => {

    const url = API_URL + USER_LOGOUT;

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });


    const status = rep.status;

    if (status === 200) { // Iniciar sesion.

        localStorage.removeItem('token'); // Eliminar token del local storage.
        navigate('/', { replace: true }); // Redireccionar a la pagina de inicio.
    }

}
