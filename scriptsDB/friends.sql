USE dbproyecto2;
--cuando se ingresa la solicitud se asigna con estado 2, cuando se acepta la solicitud se asigna estado 1 y cuando se rechaza se elimina
DELIMITER $$

CREATE  PROCEDURE friendRequest(
IN p_userID INT,
IN p_friendID INT,
IN p_estadoAmistad INT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Amigos a WHERE a.UserID = p_userID AND a.FriendID = p_friendID) THEN
        SELECT 0 AS respuesta;
    ELSE
        INSERT INTO Amigos (UserID, FriendID, EstadoAmistad)
        VALUES(p_userID, p_friendID, p_estadoAmistad);
        SELECT 1 AS respuesta;
    END IF;	
END$$
------------------------------------------------------------------------------------------

CREATE PROCEDURE rejectFriend(
	IN p_userID INT,
	IN p_friendID INT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Amigos a WHERE a.UserID = p_userID AND a.FriendID = p_friendID) THEN
        SELECT 0 AS respuesta;
    ELSE
        DELETE FROM Amigos a 
        WHERE a.UserID = p_userID AND a.FriendID = p_friendID;
        SELECT 1 AS respuesta;
    END IF;	
END$$
------------------------------------------------------------------------------------------

CREATE PROCEDURE acceptFriend(
	IN p_userID INT,
	IN p_friendID INT
)
BEGIN
	IF NOT EXISTS (SELECT a.UserID  FROM Amigos a WHERE a.UserID = p_userID AND a.FriendID = p_friendID AND a.EstadoAmistad = 0) THEN
        SELECT 0 AS respuesta;
    ELSE
        UPDATE Amigos 
        SET EstadoAmistad = 1
        WHERE UserID = p_userID AND FriendID = p_friendID;
        SELECT 1 AS respuesta;
    END IF;
END$$
------------------------------------------------------------------------------------------

CREATE PROCEDURE getListFriendRequest(
    IN p_userID INT
)
BEGIN
	IF NOT EXISTS (SELECT * FROM Amigos a WHERE a.UserID = p_userID AND a.EstadoAmistad = 2)THEN 
		SELECT 0 AS respuesta;
	ELSE
		SELECT * FROM Amigos a WHERE a.UserID = p_userID AND a.EstadoAmistad = 2;
	END IF;
END$$
------------------------------------------------------------------------------------------

CREATE PROCEDURE getListFriend(
	IN p_userID INT
)
BEGIN
	IF NOT EXISTS (SELECT * FROM Amigos a WHERE a.UserID = p_userID AND a.EstadoAmistad = 1)THEN 
		SELECT 0 AS respuesta;
	ELSE
		SELECT * FROM Amigos a WHERE a.UserID = p_userID AND a.EstadoAmistad = 1;
	END IF;
END$$
-------------------------------------------------

CREATE PROCEDURE insertMessage(
	IN p_SenderUserID INT,
    IN p_ReceiverUserID INT,
    IN p_ContenidoMensaje TEXT,
    IN p_FechaMensaje TIMESTAMP
)
BEGIN
	INSERT INTO ChatMensajes (SenderUserID, ReceiverUserID, ContenidoMensaje, FechaMensaje)
    VALUES (p_SenderUserID, p_ReceiverUserID, p_ContenidoMensaje, p_FechaMensaje);
   	SELECT 1 AS respuesta;
END$$
-------------------------------------------------

CREATE PROCEDURE getListMessage(
	IN p_SenderUserID INT,
    IN p_ReceiverUserID INT
)
BEGIN
	SELECT * FROM ChatMensajes cm WHERE cm.SenderUserID = p_SenderUserID AND cm.ReceiverUserID = p_ReceiverUserID;
END$$

DELIMITER ;


