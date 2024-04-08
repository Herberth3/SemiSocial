import { API_URL, PUBLICATION_CREATE } from '../../env.js';

const Swal = require('sweetalert2');

export const setPublication = async (form, photo, userInfo) => {

    const fechaActual = new Date();

    const fechaString = fechaActual.toISOString();

    const newPost = {
        id_user: userInfo.idUser,
        nombreFoto: photo.name,
        fotoBase64: photo.base64,
        descrip: form.description,
        fechaPublicacion: fechaString
    }

    const token = localStorage.getItem('token'); // Obtener token del local storage.

    const url = API_URL + PUBLICATION_CREATE;


    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
        body: JSON.stringify(newPost)
    });

    const data = await rep.json();

    const status = rep.status;


    if (status === 200) { // Si la peticion fue exitosa.

        Swal.fire({
            title: 'Exitoso.',
            text: 'Se ha posteado la publicación.',
            icon: 'success',
            confirmButtonText: 'Ok'
        });

    } else {

        Swal.fire({
            title: 'Error!',
            text: `${data.content}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });

    }

}
