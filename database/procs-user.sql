-- OBTENER INFO DE USUARIO.
CREATE PROCEDURE dbproyecto2.getUser(
	IN p_CorreoElectronico VARCHAR(255)
)
BEGIN
	
	IF NOT EXISTS (SELECT * FROM Usuarios u WHERE u.CorreoElectronico = p_CorreoElectronico) THEN
        SELECT 0 AS respuesta;
    ELSE
       	SELECT * FROM Usuarios u WHERE u.CorreoElectronico = p_CorreoElectronico;
    END IF;
	
END