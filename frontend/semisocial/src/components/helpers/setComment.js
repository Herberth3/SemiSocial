import { API_URL, COMMENT_CREATE } from '../../env.js';

const Swal = require('sweetalert2');

export const setComment = async (comment, setShowAlert) => {

    const newComment = {
        comment: comment,
    }

    const url = API_URL + COMMENT_CREATE;

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    });

    const data = await rep.json();

    const status = rep.status;

    if (status === 200) { // Si el registro fue exitoso.

        setShowAlert(true);
        
    } else { // Si el registro no fue exitoso.

        Swal.fire({
            title: 'Error!',
            text: `${data.content}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });

    }
}
