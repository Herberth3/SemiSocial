import { Request, Response } from 'express';
import { execute_procedure } from '../configs/mysql.config';

export const insertarComment = async(req: Request, res: Response) => {
    const { id_post, id_user, contenido, fechaComentario} = req.body;
  
    try {
      //guardo al post en la base de datos
      const insert_result = await execute_procedure('insertComment', {id_post, id_user, contenido, fechaComentario});

      //si todo sale correcto se devuelve un 200
      return res.status(200).json({
        content:{
            id_post,
            id_user,
            contenido,
            fechaComentario
        } 
      });
  
    } catch (error) {
      res.status(500).json({ content: 'Internal Error al registrar post, '+ error });
    }
}

export const eliminarComment = async(req: Request, res: Response) => {
    const { id_comment } = req.body;
    
    try {
        const delete_result = await execute_procedure('deleteComment', {id_comment});
        if (delete_result[0].respuesta == 0) return res.status(404).json({content: "No existe un comemtario registrado con el id: " + id_comment +', porfavor registrar post previamente'});
    
        //si todo sale correcto se devuelve un 200
        return res.status(200).json({
            content:"Se ha eliminado con exito el post, ID: " + id_comment
        })
    } catch (error) {
        res.status(500).json({ content: 'Internal Error al eliminar post, '+ error });
    }
}

export const getListComment = async(req: Request, res: Response) => {
    const {id_post} = req.body;
    
    try {
      const get_posts = await execute_procedure('getListComment', {id_post});
  
      //si todo sale correcto se devuelve un 200
      return res.status(200).json({
        content: get_posts
      })
    } catch (error) {
      res.status(500).json({ content: 'Internal Error al obtener usuario, '+ error });
    }
  }
  