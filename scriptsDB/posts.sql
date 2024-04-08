USE dbproyecto2;

DELIMITER $$

CREATE PROCEDURE insertPublication(
	IN p_UserID INT,
    IN p_Imagen VARCHAR(255),
    IN p_Descripcion TEXT,
    IN p_FechaPublicacion TEXT,
    IN p_EtiquetasImagen VARCHAR(255)
)
BEGIN
	INSERT INTO Publicaciones (UserID, Imagen, Descripcion, FechaPublicacion, EtiquetasImagen)
    VALUES (p_UserID, p_Imagen, p_Descripcion, p_FechaPublicacion, p_EtiquetasImagen);
   	SELECT LAST_INSERT_ID() AS respuesta;
END $$
--------------------------------------------------
CREATE PROCEDURE deletePublication(
    IN p_postID INT
)
BEGIN
    IF NOT EXISTS (select * from Publicaciones WHERE PostID = p_postID) THEN
        SELECT 0 AS respuesta;
    ELSE
        DELETE FROM Publicaciones
        WHERE PostID = p_postID;
        SELECT 1 AS respuesta;
    END IF;	
END $$
--------------------------------------------------
CREATE PROCEDURE editarPublicacion(
    IN p_postID INT,
    IN p_Descripcion TEXT
)
BEGIN
    IF NOT EXISTS (select * from Publicaciones WHERE PostID = p_postID) THEN
        SELECT 0 AS respuesta;
    ELSE
		UPDATE Publicaciones
       	SET Descripcion = p_Descripcion
       	WHERE PostID = p_postID;
       	SELECT 1 AS respuesta;
	END IF;	
END $$
--------------------------------------------------
CREATE PROCEDURE EditarFotoPublicacion(
    IN p_postID INT,
    IN p_Imagen VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (select * from Publicaciones WHERE PostID = p_postID) THEN
        SELECT 0 AS respuesta;
    ELSE
        UPDATE Publicaciones
        SET Imagen = p_Imagen
        WHERE PostID = p_postID;
		SELECT 1 AS respuesta;
    END IF;	
END $$
---------------------------------------------------

CREATE PROCEDURE getListPublication(
	IN p_userID INT
)
BEGIN
	SELECT 
		p.PostID, 
		p.UserID, 
		p.Imagen, 
		p.Descripcion,  
		p.FechaPublicacion, 
		p.EtiquetasImagen, 
		u.NombreCompleto AS NombreUsuario  
	FROM Publicaciones p
	INNER JOIN Usuarios u ON p.UserID = u.UserID
	WHERE p.UserID = p_userID OR p.UserID IN (SELECT FriendID FROM Amigos WHERE UserID = p_userID AND EstadoAmistad = 1)
    ORDER BY p.FechaPublicacion DESC;
END
-----------------------------------------------------

CREATE PROCEDURE insertComment(
    IN p_PostID INT,
    IN p_UserID INT,
    IN p_ContenidoComentario TEXT,
    IN p_FechaComentario TEXT
)
BEGIN
    INSERT INTO Comentarios(PostID, UserID, ContenidoComentario, FechaComentario)
    VALUES (p_PostID, p_UserID, p_ContenidoComentario, p_FechaComentario);
    SELECT 1 AS respuesta;
END $$
------------------------------------------------------

CREATE PROCEDURE deleteComment(
    IN p_CommentID INT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Comentarios WHERE CommentID = p_CommentID) THEN
        SELECT 0 AS respuesta;
    ELSE
        DELETE FROM Comentarios WHERE CommentID = p_CommentID;
        SELECT 1 AS respuesta;
    END IF;	
END$$
-------------------------------------------------------

CREATE PROCEDURE getListComment(
	IN p_PostID INT
)
BEGIN
	SELECT * FROM Comentarios c WHERE c.PostID = p_PostID;
END

DELIMITER ;
