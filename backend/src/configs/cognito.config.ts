import { 
    CognitoUserAttribute, 
    CognitoUserPool, 
    AuthenticationDetails, 
    CognitoUser, 
    NodeCallback, 
    ISignUpResult, 
    IAuthenticationCallback, 
    CognitoUserSession, 
    UpdateAttributesNodeCallback } from 'amazon-cognito-identity-js';

export const userPool = new CognitoUserPool({
    UserPoolId  : process.env.AWS_USER_POOL_ID as string,
    ClientId    : process.env.AWS_CLIENT_ID as string
});

export const signUpCognito = async (nombreCompleto: string, email:string, hashContra: string, urlFoto:string, callback: NodeCallback<Error, ISignUpResult>) => {
    const attributeList: CognitoUserAttribute[] = [
        new CognitoUserAttribute({
            Name: 'email',
            Value: email
        }), 
        new CognitoUserAttribute({
            Name: 'custom:nombreCompleto',
            Value: `${nombreCompleto}` 
        }),
        new CognitoUserAttribute({
            Name: 'custom:fotoperfil',
            Value: `${urlFoto}` 
        })
    ];
    
    userPool.signUp(
        email, 
        hashContra + 'D**', //ecriptar la contrasena
        attributeList, 
        null!,
        callback 
    );
} 

export const logInCognito = async (email:string, hashContra:string, callbacks: IAuthenticationCallback) => {

    const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: hashContra + 'D**', //ecriptar la contrasena
    });
    
    const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
    });

    cognitoUser.authenticateUser(
        authenticationDetails, 
        callbacks
    );
}

export const logOutCognito = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser) {
        console.log('No hay usuario autenticado');
        return false;
    }

    cognitoUser.signOut();
    console.log('Sesión cerrada exitosamente');
    return true;
}

export const updateUserCognito = (nombreCompleto: string, urlFoto:string, callback: UpdateAttributesNodeCallback<Error, string, any>) => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser == null) {
        console.log('No hay usuario autenticado, iniciar session.');
        return 
    }

    cognitoUser.getSession((err:Error|null, session:CognitoUserSession) => {
        if (err) {
            //console.error('Error al obtener la sesión: ', err);
            return { content: 'Error al obtener la sesión: '+err };
        }

        const attributeList: CognitoUserAttribute[] = [
            new CognitoUserAttribute({
                Name: 'custom:nombreCompleto',
                Value: `${nombreCompleto}` 
            }),
            new CognitoUserAttribute({
                Name: 'custom:fotoperfil',
                Value: `${urlFoto}` 
            })
        ];
        cognitoUser.updateAttributes(attributeList, callback)
    });
} 