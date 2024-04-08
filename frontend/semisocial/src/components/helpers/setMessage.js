import { API_URL, MESSAGE_CREATE } from '../../env.js';

const Swal = require('sweetalert2');

export const setMessage = async (form) => {

    const newMessage = {
        message: form.message
    }

    const url = API_URL + MESSAGE_CREATE;

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessage)
    });


    const data = await rep.json();

    const status = rep.status;


    if (status !== 200) { // Si el envio del mensaje falla.

        Swal.fire({
            title: 'Error!',
            text: `${data.content}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
}
