import { API_URL, FRIEND_REJECT } from '../../env.js';

const Swal = require('sweetalert2');

export const setRejectRequest = async (userInfo, friendRequestInfo, setListRequest) => {

    const sendRequest = {
        id_user: friendRequestInfo.UserID,
        id_friend: userInfo.idUser
    }


    const url = API_URL + FRIEND_REJECT;

    const token = localStorage.getItem('token'); // Obtener token del local storage.

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
        body: JSON.stringify(sendRequest)
    });


    const data = await rep.json();

    const status = rep.status;


    if (status === 200) { // Iniciar sesion.

        setListRequest([]); // Limpiar lista de solicitudes.

        Swal.fire({
            title: 'Exitoso.',
            text: `${data.content}`,
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
