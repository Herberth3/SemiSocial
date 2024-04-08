import { API_URL, USER_EDIT } from '../../env.js';

const Swal = require('sweetalert2');

export const setEditProfile = async (form, photo) => {

    const newProfile = {
        nombreCompleto: form.name,
        nombreFoto: photo.name,
        fotoBase64: photo.base64,
    }


    const token = localStorage.getItem('token'); // Obtener token del local storage.

    const url = API_URL + USER_EDIT;

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
        body: JSON.stringify(newProfile)
    });

    const data = await rep.json();

    const status = rep.status;

    if (status === 200) { // Edicion exitosa.

        Swal.fire({
            title: 'Exitoso.',
            text: `${data.content}`,
            icon: 'success',
            confirmButtonText: 'Ok'
        });


        return  200;

    } else { // Edicion no exitosa.

        Swal.fire({
            title: 'Error!',
            text: `${data.content}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });

        return 500;

    }

}
