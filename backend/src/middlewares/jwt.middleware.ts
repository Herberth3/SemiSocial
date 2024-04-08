import { Request, Response, NextFunction } from 'express';
import { userPool } from '../configs/cognito.config';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const cognitoUser = userPool.getCurrentUser();
    const ACCESTOKEN = req.headers.authorization; // Asegúrate de que el token se envía en el encabezado 'Authorization'
    //validar el user y que se manden el token
    if (cognitoUser == null || ACCESTOKEN == undefined) {
        res.status(401).send('[Unauthorized]');
    } else {
        //validar la session
         cognitoUser.getSession((err:Error|null, session:CognitoUserSession) => {
            if (err) {
                //console.error('Error al obtener la sesión: ', err);
                return res.status(401).json({ message: 'Error al obtener la sesión: '+err });
            }
            const accessToken = session.getAccessToken().getJwtToken();
            if (accessToken !== ACCESTOKEN) {
                //console.log('Access Token no es valido');
                return res.status(401).send('[Unauthorized] :(');    
            } 
            console.log('\nAccess Token es valido :)\n');
            
            //obtener los atrubitos
            cognitoUser.getUserAttributes((err, attributes)=> {
                if (err || attributes == undefined){
                    //console.error('Error al obtener la sesión: ', err);
                    return res.status(401).json({ message: 'Error al obtener la sesión: '+ err });
                }else{
                    var user = {
                        email:'',
                        fotoperfil: '',
                        nombreCompleto: ''
                    }
                    
                    for (let i = 0; i < attributes.length; i++) {
                        if(attributes[i].Name == 'email') user.email=attributes[i].Value;

                        if(attributes[i].Name == 'custom:fotoperfil') user.fotoperfil=attributes[i].Value;

                        if(attributes[i].Name == 'custom:nombreCompleto') user.nombreCompleto=attributes[i].Value;
                    }
                    req.body.user = user;
                    console.log(user);
                    next();
                }
            });
        });
    }
}
