import { Request, Response } from 'express'
import { uploadS3Base64 } from '../configs/s3.config';
import { execute_procedure } from '../configs/mysql.config';
import { updateUserCognito } from '../configs/cognito.config';

export const editarUsuario = async(req: Request, res: Response) => {
    const {nombreCompleto, nombreFoto, fotoBase64} = req.body;
    const email = req.body.user.email;
    let ulrFoto: string = ':)'

    try {
        //guardo al usuario en la base de datos
        const update_result = await execute_procedure('editarUsuario', {nombreCompleto, email});
        if (update_result[0].respuesta == 0) return res.status(404).json({content: "No existe un usuario registrado con el correo: " + email +', porfavor registrate previamente'});
        
        //subo la imagen al bucket si se desea
        if (update_result[0].respuesta == 1 && (nombreFoto != '') && (fotoBase64 != '')){
            const resultS3 = await uploadS3Base64('fotos/', nombreFoto, fotoBase64, 'image');
            console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');     

            //edito al artista en la base de datos
            ulrFoto = resultS3.url;
            await execute_procedure('editarFotoUsuario', {email, ulrFoto});
        }

        //actualizar la sb de cognito
        updateUserCognito(nombreCompleto, ulrFoto, (err, result)=> {
            if (err) return res.status(404).json({content: "Error al editar usuario en cognito" + err});
            
            //si todo sale correcto se devuelve un 200
            return res.status(200).json({
                content:"Se ah actualizado con exito el usuario: " + result 
            })
        });

    }  catch (error) {
        res.status(500).json({ content: 'Internal Error al editar usuario: '+ error });
    }
}

export const obtenerUsuario = async(req: Request, res: Response) => {
    const email = req.body.user.email;
    
    try {
        const get_user = await execute_procedure('getUser', {email});
        if (get_user[0].respuesta == 0) return res.status(404).json({content: "No existe un usuario registrado con el correo: " + email +', porfavor registrate previamente'});
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content: get_user
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al obtener usuario, '+ error });
    }
}

export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ msg: req.body.user })
} 
