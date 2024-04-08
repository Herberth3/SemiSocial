DELIMITER //
CREATE PROCEDURE InsertarPaginaTraducida(
    IN p_OriginalContentID INT,
    IN p_IdiomaDestino VARCHAR(20),
    IN p_ContenidoTraducido TEXT
)
BEGIN
    INSERT INTO PaginasTraducidas (OriginalContentID, IdiomaDestino, ContenidoTraducido)
    VALUES (p_OriginalContentID, p_IdiomaDestino, p_ContenidoTraducido);
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE InsertarSolicitudChatbot(
    IN p_UserID INT,
    IN p_ContenidoSolicitud TEXT,
    IN p_RespuestaChatbot TEXT,
    IN p_FechaSolicitud TIMESTAMP
)
BEGIN
    INSERT INTO SolicitudesChatbot (UserID, ContenidoSolicitud, RespuestaChatbot, FechaSolicitud)
    VALUES (p_UserID, p_ContenidoSolicitud, p_RespuestaChatbot, p_FechaSolicitud);
END //
DELIMITER ;