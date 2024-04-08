-- INSERTAR MENSAJE.
CREATE PROCEDURE dbproyecto2.insertMessage(
	IN p_SenderUserID INT,
    IN p_ReceiverUserID INT,
    IN p_ContenidoMensaje TEXT,
    IN p_FechaMensaje TIMESTAMP
)
BEGIN
	
	INSERT INTO ChatMensajes (SenderUserID, ReceiverUserID, ContenidoMensaje, FechaMensaje)
    VALUES (p_SenderUserID, p_ReceiverUserID, p_ContenidoMensaje, p_FechaMensaje);
   	SELECT 1 AS respuesta;
	
END



-- OBTENER LISTA DE MENSAJES.
CREATE PROCEDURE dbproyecto2.getListMessage(
	IN p_SenderUserID INT,
    IN p_ReceiverUserID INT
)
BEGIN
	
	SELECT * FROM ChatMensajes cm WHERE cm.SenderUserID = p_SenderUserID AND cm.ReceiverUserID = p_ReceiverUserID;
	SELECT 1 AS respuesta;
	
END