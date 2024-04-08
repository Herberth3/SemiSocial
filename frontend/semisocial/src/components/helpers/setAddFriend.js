
import { API_URL, FRIEND_ADD } from '../../env.js';

const Swal = require('sweetalert2');

export const setAddFriend = async (userInfo, friend, setListUser) => {

    const newFriend = {
        id_user: userInfo.idUser,
        id_friend: friend.UserID
    }


    const url = API_URL + FRIEND_ADD;

    const token = localStorage.getItem('token');

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
        },
        body: JSON.stringify(newFriend)
    });

    const data = await rep.json();

    const status = rep.status;

    if (status === 200) { // Agregar amigo exitoso.

        setListUser([]);

        Swal.fire({
            title: 'Exitoso.',
            text: 'Se ha enviado la solicitud de amistad.',
            icon: 'success',
            confirmButtonText: 'Ok'
        });

    } else { // Agregar amigo no exitoso.

        Swal.fire({
            title: 'Error!',
            text: `${data.content}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });

    }

}
