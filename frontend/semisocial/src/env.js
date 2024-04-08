
export const API_URL = 'http://localhost:5000';

// -------------- ENDPOINT USUARIO --------------
export const USER_REGISTER = '/signup';
export const USER_LOGIN = '/login';
export const USER_LOGOUT = '/logout';
export const USER_EDIT = '/editarUsuario';
export const GET_USER = '/usuario';
export const GET_LIST_USER = '/listaNoAmigo';
export const GET_LIST_REQUEST = '/listaSolicitudes';


// -------------- ENDPOINT PUBLICACION --------------
export const PUBLICATION_CREATE = '/insertarPost';
export const GET_LIST_PUBLICATION = '/getListPost';


// -------------- ENDPOINT COMENTARIO --------------
export const COMMENT_CREATE = '/comentario';


// -------------- ENDPOINT AMIGO --------------
export const FRIEND_ADD = '/solicitarAmistad';
export const FRIEND_ACCEPT = '/aceptarAmigo';
export const FRIEND_REJECT = '/eliminarSolicitud';
export const GET_LIST_FRIEND = '/listaAmigos';


// -------------- ENDPOINT MENSAJE --------------
export const MESSAGE_CREATE = '/mensaje';


// -------------- ENDPOINT CHATBOT --------------
export const CHATBOT_MESSAGE = '/chatbot';
