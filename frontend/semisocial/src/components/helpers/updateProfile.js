import { API_URL, GET_USER } from '../../env';

export const updateProfile = async (email, setUpdateData) => {

    const url = API_URL + GET_USER;

    const token = localStorage.getItem('token'); // Obtener token del local storage.

    const userData = {
        email: email
    }

    const rep = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(userData)
    });


    // Respuesta del backend.
    const data = await rep.json();

    const status = rep.status;

    if (status === 200) {

        setUpdateData({
            idUser: data.content[0].UserID,
            name: data.content[0].NombreCompleto,
            password: data.content[0].Contrasena,
            email: data.content[0].CorreoElectronico,
            dpi: data.content[0].DPI,
            photo: data.content[0].FotoDePerfil,
        });

    } else {

        console.log(`Error: ${data.content}`);

    }
}
