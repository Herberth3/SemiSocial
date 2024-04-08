-- AGREGAR AMMIGOS.
CREATE PROCEDURE dbproyecto2.friendRequest(
IN p_userID INT,
IN p_friendID INT,
IN p_estadoAmistad INT
)
BEGIN
	
	INSERT INTO Amigos (UserID, FriendID, EstadoAmistad)
	VALUES(p_userID, p_friendID, p_estadoAmistad);
	SELECT 1 AS respuesta;
	
END


-- OBTENER LISTA DE SOLICITUDES DE AMISTAS.
CREATE PROCEDURE dbproyecto2.getListFriendRequest(
IN p_userID INT
)
BEGIN
	
	IF NOT EXISTS (SELECT * FROM Amigos a WHERE a.UserID = p_userID AND a.EstadoAmistad = 0)THEN 
		SELECT 0 AS respuesta;
	ELSE
		SELECT * FROM Amigos a WHERE a.UserID = p_userID AND a.EstadoAmistad = 0;
	END IF;
	
END


-- ACEPTAR SOLICITUD DE AMISTAD.
CREATE PROCEDURE dbproyecto2.acceptFriend(
	IN p_userID INT,
	IN p_friendID INT
)
BEGIN
	
	IF NOT EXISTS (SELECT a.UserID  FROM Amigos a WHERE a.UserID = p_userID AND a.FriendID = p_friendID AND a.EstadoAmistad = 2) THEN
        SELECT 0 AS respuesta;
    ELSE
        UPDATE Amigos 
        SET EstadoAmistad = 2
        WHERE UserID = p_userID AND FriendID = p_friendID;
        SELECT 1 AS respuesta;
    END IF;
	
END


-- OBTENER LISTA DE AMIGOS.
CREATE PROCEDURE dbproyecto2.getListFriend(
	IN p_userID INT
)
BEGIN
	
	IF NOT EXISTS (SELECT * FROM Amigos a WHERE a.UserID = p_userID AND a.EstadoAmistad = 1)THEN 
		SELECT 0 AS respuesta;
	ELSE
		SELECT * FROM Amigos a WHERE a.UserID = p_userID AND a.EstadoAmistad = 1;
	END IF;

END


-- RECHARZAR SOLICITUD DE AMISTAD.
CREATE PROCEDURE dbproyecto2.rejectFriend(
	IN p_userID INT,
	IN p_friendID INT
)
BEGIN
	
	DELETE FROM Amigos a WHERE a.UserID = p_userID AND a.FriendID = p_friendID;
    SELECT 1 AS respuesta;
	
END


CREATE DEFINER=`root`@`%` PROCEDURE `dbproyecto2`.`getAlUser`(
	IN p_userID INT 
)
BEGIN
	   
   	SELECT *
    FROM Usuarios u
    LEFT JOIN Amigos a ON u.UserID = a.FriendID AND a.UserID = p_userID
    WHERE a.FriendID IS NULL OR a.UserID IS NULL;
   
   
END


CREATE DEFINER=`root`@`%` PROCEDURE `dbproyecto2`.`insertPublication`(
	IN p_UserID INT,
    IN p_Imagen VARCHAR(255),
    IN p_Descripcion TEXT,
    IN p_FechaPublicacion VARCHAR(255),
    IN p_EtiquetasImagen VARCHAR(255)
)
BEGIN
	
	INSERT INTO Publicaciones (UserID, Imagen, Descripcion, FechaPublicacion, EtiquetasImagen)
    VALUES (p_UserID, p_Imagen, p_Descripcion, p_FechaPublicacion, p_EtiquetasImagen);
   	SELECT 1 AS respuesta;
	
END



CREATE DEFINER=`root`@`%` PROCEDURE `dbproyecto2`.`getListPublication`(
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
		
	FROM 
		Publicaciones p
		
	INNER JOIN 
		Usuarios u ON p.UserID = u.UserID
		
	WHERE
		p.UserID = p_userID
		
	OR 
		p.UserID IN (SELECT FriendID FROM Amigos WHERE UserID = p_userID AND EstadoAmistad = 1)
		
    ORDER BY 
   		p.FechaPublicacion DESC;
   	
END



CREATE DEFINER=`root`@`%` PROCEDURE `dbproyecto2`.`getListComment`(
	IN p_PostID INT
)
BEGIN
	
	SELECT * FROM Comentarios c WHERE c.PostID = p_PostID;
	
END



--- Obtener lista de usuarios.
CREATE DEFINER=`root`@`%` PROCEDURE `dbproyecto2`.`getListUser`(
	IN p_userID INT
)
BEGIN
	SELECT u.UserID, u.NombreCompleto, u.CorreoElectronico, u.DPI, u.Contrasena, u.FotoDePerfil
    FROM Usuarios u
    WHERE u.UserID != p_userID
    AND u.UserID NOT IN (
        SELECT UserID FROM Amigos WHERE (FriendID = p_userID)
    )
    AND u.UserID NOT IN (
        SELECT FriendID FROM Amigos WHERE (UserID = p_userID)
    );
END
