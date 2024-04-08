import { Request, Response } from "express";
import { execute_procedure } from "../configs/mysql.config";

export const solicitarAmistad = async (req: Request, res: Response) => {
    const { id_user, id_friend } = req.body;
    let estado = 2;

    try {
        //guardo al artista en la base de datos
        const insert_result = await execute_procedure('friendRequest', { id_user, id_friend, estado });
        if (insert_result[0].respuesta == 0) return res.status(404).json({ content: "Ya existe la solicitud de amistad." });

        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content: {
                id_user: id_user
            }
        })

    } catch (error) {
        res.status(500).json({ content: 'Internal Error al solicitar la amistad, ' + error });
    }
}

export const obtenerListaSolicitudes = async (req: Request, res: Response) => {
    const { id_user } = req.body;

    try {
        const get_request = await execute_procedure('getListFriendRequest', { id_user });
        if (get_request[0].respuesta == 0) return res.status(404).json({ content: "No existen solicitudes de amistad" });

        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content: get_request
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al obtener solicitudes de amistad, ' + error });
    }
}

export const aceptarAmigo = async (req: Request, res: Response) => {
    const { id_user, id_friend } = req.body;

    try {
        //guardo al Artista en la base de datos
        const update_result = await execute_procedure('acceptFriend', { id_user, id_friend });
        if (update_result[0].respuesta == 0) return res.status(404).json({ content: 'No existe la solicitud de amistad' });

        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content: "Se ah aceptado con exito la amistad "
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al aceptar amigo, ' + error });
    }
}

export const obtenerListaAmigos = async (req: Request, res: Response) => {
    const { id_user } = req.body;

    try {
        const get_request = await execute_procedure('getListFriend', { id_user });
        if (get_request[0].respuesta == 0) return res.status(404).json({ content: "No existen amigos" });

        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content: get_request
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al obtener amigos, ' + error });
    }
}

export const eliminarSolicitud = async (req: Request, res: Response) => {
    const { id_user, id_friend } = req.body;

    try {
        const delete_result = await execute_procedure('rejectFriend', { id_user, id_friend });
        if (delete_result[0].respuesta == 0) return res.status(404).json({ content: "No existe una solicitud de amistad" });

        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content: "Se ah elimino con exito la solicitud"
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al elimnar la solicitud, ' + error });
    }
}

export const obtenerListaNoAmigos = async (req: Request, res: Response) => {

    const { id_user } = req.body;

    try {
        const get_request = await execute_procedure('getListUser', { id_user });
        if (get_request[0].respuesta == 0) return res.status(404).json({ content: "No existen usuarios." });

        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content: get_request
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al obtener usuarios, ' + error });
    }
}

