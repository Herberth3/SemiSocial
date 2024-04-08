import { API_URL, USER_REGISTER } from '../../env.js';

const Swal = require('sweetalert2');

export const setRegister = async (form, photo) => {

    const newUser = {
        nombreCompleto: form.name,
        email: form.email,
        dpi: form.dpi,
        contra: form.password,
        nombreFoto: photo.name,
        fotoBase64: photo.base64,
    }


    const url = API_URL + USER_REGISTER;

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });


    const data = await rep.json();

    const status = rep.status;


    if (status === 200) { // Si el registro fue exitoso.

        Swal.fire({
            title: 'Exitoso.',
            text: `Se ha eviado un mensaje al correo electronico ${form.email} para verificar el usuario.`,
            icon: 'success',
            confirmButtonText: 'Ok'
        });

    } else { // Si el registro no fue exitoso.

        Swal.fire({
            title: 'Error!',
            text: `${data.content}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });

    }
}
