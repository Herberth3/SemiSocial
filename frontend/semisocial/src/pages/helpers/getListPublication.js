import { API_URL, GET_LIST_PUBLICATION } from '../../env.js';

export const getListPublication = async (userInfo) => {

    const sendRequest = {
        id_user: userInfo.idUser
    }

    const url = API_URL + GET_LIST_PUBLICATION;

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

        return data.content;

    } else {

        console.log(`${data.content}`);
        return [];

    }

}
