import { Request, Response } from 'express'
import { uploadS3Base64 } from '../configs/s3.config'
import { execute_procedure } from '../configs/mysql.config'

export const insertarPost = async(req: Request, res: Response) => {
  const { id_user, nombreFoto, fotoBase64, descrip, fechaPublicacion} = req.body;
  let ulrFoto, etiquetas = '-'; 

  try {
    //guardo al post en la base de datos
    const insert_result = await execute_procedure('insertPublication', {id_user, ulrFoto, descrip, fechaPublicacion, etiquetas});
    
    //subo la imagen al bucket se se desea
    if ((nombreFoto != '') && (fotoBase64 != '')){
      const resultS3 = await uploadS3Base64('fotos/', nombreFoto, fotoBase64, 'image');
      console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');      
      
      //edito al post en la base de datos
      ulrFoto = resultS3.url;
      const id_post = insert_result[0].respuesta;
      await  execute_procedure('editarFotoPublicacion', {id_post, ulrFoto});
    }       
    
    //si todo sale correcto se devuelve un 200
    return res.status(200).json({
      content:{
        id_user,
        ulrFoto,
        descrip, 
        fechaPublicacion
      } 
    });

  } catch (error) {
    res.status(500).json({ content: 'Internal Error al registrar post, '+ error });
  }
}

export const editarPost = async (req: Request, res: Response) => {
  const {id_post, nombreFoto, fotoBase64, descrip} = req.body;
  
  try {
      //guardo al post en la base de datos
      const update_result = await execute_procedure('editarPublicacion', {id_post, descrip});
      if (update_result[0].respuesta == 0) return res.status(404).json({content: "No existe un post registrado con el id: " + id_post +', porfavor registrar post previamente'});
      
      //subo la imagen al bucket si se desea
      if (update_result[0].respuesta == 1 && (nombreFoto != '') && (fotoBase64 != '')){
        const resultS3 = await uploadS3Base64('fotos/', nombreFoto, fotoBase64, 'image');
        console.log('\n\n', resultS3.message, ', ', resultS3.url, '\n\n');

        //edito al post en la base de datos
        const ulrFoto = resultS3.url;
        await  execute_procedure('editarFotoPublicacion', {id_post, ulrFoto});
      }

      //si todo sale correcto se devuelve un 200
      return res.status(200).json({
        content:"Se ha actualizado con exito el post: " + id_post
      })
  }  catch (error) {
      res.status(500).json({ content: 'Internal Error al editar post, '+ error });
  }
}

export const eliminarPost = async(req: Request, res: Response) => {
  const { id_post } = req.body;
  
  try {
      const delete_result = await execute_procedure('deletePublication', {id_post});
      if (delete_result[0].respuesta == 0) return res.status(404).json({content: "No existe un post registrado con el id: " + id_post +', porfavor registrar post previamente'});
  
      //si todo sale correcto se devuelve un 200
      return res.status(200).json({
          content:"Se ha eliminado con exito el post, ID: " + id_post
      })
  } catch (error) {
      res.status(500).json({ content: 'Internal Error al eliminar post, '+ error });
  }
}

export const getListPost = async(req: Request, res: Response) => {
  const {id_user} = req.body;
  
  try {
    const get_posts = await execute_procedure('getListPublication', {id_user});

    //si todo sale correcto se devuelve un 200
    return res.status(200).json({
      content: get_posts
    })
  } catch (error) {
    res.status(500).json({ content: 'Internal Error al obtener usuario, '+ error });
  }
}

