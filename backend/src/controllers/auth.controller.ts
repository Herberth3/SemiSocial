import { Request, Response } from 'express'
import { uploadS3Base64 } from '../configs/s3.config'
import { execute_procedure } from '../configs/mysql.config'
import { logInCognito, logOutCognito, signUpCognito } from '../configs/cognito.config';
import crypto from 'crypto';

export const signUp = async (req: Request, res: Response) => {
  const { nombreCompleto, email, dpi, contra, nombreFoto, fotoBase64} = req.body;
  let ulrFoto = '-'; 

  try {
    //ecriptart la contrasena
    const hashContra = crypto.createHash('sha256').update(contra).digest('hex');

    //guardo al usuario en la base de datos
    const insert_result = await execute_procedure('insertUser', {nombreCompleto, email, dpi, hashContra, ulrFoto});
    if (insert_result[0].respuesta == 0) return res.status(404).json({content: "Ya existe un usuario registrado con el correo: " + email });
  
    //subo la imagen al bucket se se desea
    if ((nombreFoto != '') && (fotoBase64 != '')){
      const resultS3 = await uploadS3Base64('fotos/', nombreFoto, fotoBase64, 'image');
      console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');     

      //edito al usuario en la base de datos
      ulrFoto = resultS3.url;
      await execute_procedure('editarFotoUsuario', {email, ulrFoto});
    }

    //cognito
    signUpCognito(nombreCompleto, email, hashContra, ulrFoto, (err, data) => {
      if (err) return res.status(500).json({
        content: "Registro no valido :"+email +", intente de nuevo: "+err
      });
      return res.status(200).json({ content: 'Se ha agregado con exito el usuario: '+ email})
    });
    
  } catch (error) {
    res.status(500).json({ content: 'Internal Error al registrar usuario, '+ error });
  }
}

export const logIn = async(req: Request, res: Response) => {
  const { email, contra} = req.body;

  try {
    //ecriptart la contrasena
    const hashContra = crypto.createHash('sha256').update(contra).digest('hex');
  
    //cognito
    logInCognito(email, hashContra, {
      onSuccess: (session) => {
        //console.log('Inicio de sesión exitoso', session.getAccessToken());
        return res.status(200).json({
          accesToken: session.getAccessToken().getJwtToken()
        })
      },
      onFailure: (err) => {
        //console.error('Error al iniciar sesión', err);
        return res.status(404).json({
          content: "Datos Invalidos, intente de nuevo: "+ err
        });
      },
    });
    
  } catch (error) {
    res.status(500).json({ content: 'Internal Error al autenticar usuario, '+ error });
  }
}

export const logOut = async(req: Request, res: Response) => {
  const result = logOutCognito()
  if (!result) return res.status(500).json({content: 'No hay usuario autenticado'});
  return res.status(200).json({ content: 'Sesión cerrada exitosamente'});
}

export const healthy = (req: Request, res: Response) => {
  return res.status(200).json({ msg: 'true' })
} 
