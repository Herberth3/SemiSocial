import { Router } from 'express'
import { verifyToken } from '../middlewares/jwt.middleware';
import { editarUsuario, obtenerUsuario, healthy } from '../controllers/user.controller'
import { aceptarAmigo, eliminarSolicitud, obtenerListaAmigos, obtenerListaNoAmigos, obtenerListaSolicitudes, solicitarAmistad } from '../controllers/friends.controller';
import { insertarMensaje, obtenerListaMensajes } from '../controllers/chat.controller';
import { editarPost, eliminarPost, getListPost, insertarPost } from '../controllers/posts.controllers';
const router = Router();
router.use(verifyToken); //aca se restringe los endopints, autenticarse con el acces token ontenido en el login

router.post('/editarUsuario', editarUsuario);
router.get('/user/ping', healthy);
router.post('/usuario', obtenerUsuario);
router.post('/listaNoAmigo', obtenerListaNoAmigos)

router.post('/solicitarAmistad', solicitarAmistad);
router.post('/listaSolicitudes', obtenerListaSolicitudes);
router.post('/aceptarAmigo', aceptarAmigo);
router.post('/listaAmigos', obtenerListaAmigos);
router.post('/eliminarSolicitud', eliminarSolicitud);

router.post('/insertarMensaje', insertarMensaje);
router.post('listaMensajes', obtenerListaMensajes);
router.post('/insertarPost', insertarPost);
router.post('/getListPost', getListPost);
export default router;
