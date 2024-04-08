USE dbproyecto2;

DELIMITER $$

CREATE PROCEDURE insertarUsuario(
  IN p_nombre_completo VARCHAR(255),
  IN p_correo_electronico VARCHAR(255),
  IN p_dpi VARCHAR(20),
  IN p_contrasena VARCHAR(255),
  IN p_foto_de_perfil VARCHAR(255),
  IN p_informacion_de_autenticacion JSON
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Usuarios u WHERE u.CorreoElectronico = p_correo_electronico) THEN
        INSERT INTO Usuarios (NombreCompleto, CorreoElectronico, DPI, Contrasena, FotoDePerfil, InformacionDeAutenticacion)
        VALUES (p_nombre_completo, p_correo_electronico, p_dpi, p_contrasena, p_foto_de_perfil, p_informacion_de_autenticacion);
        SELECT UserID AS respuesta FROM Usuarios WHERE CorreoElectronico = p_correo_electronico;
    ELSE
        SELECT 0 AS respuesta;
    END IF;
END$$
------------------------------------------------------------------------------------------

CREATE PROCEDURE eliminarUsuario(
  IN p_correo_electronico VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Usuarios u WHERE u.CorreoElectronico = p_correo_electronico) THEN
        SELECT 0 AS respuesta;
    ELSE
        DELETE FROM Usuarios
        WHERE CorreoElectronico = p_correo_electronico;
        SELECT 1 AS respuesta;
    END IF;
END$$
------------------------------------------------------------------------------------------

CREATE PROCEDURE editarUsuario(
  IN p_nombre_completo VARCHAR(255),
  IN p_correo_electronico VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Usuarios u WHERE u.CorreoElectronico = p_correo_electronico) THEN
        SELECT 0 AS respuesta;
    ELSE
        UPDATE Usuarios
        SET NombreCompleto = p_nombre_completo
        WHERE CorreoElectronico = p_correo_electronico;
        SELECT 1 AS respuesta;
    END IF;
END$$
------------------------------------------------------------------------------------------

CREATE PROCEDURE editarFotoUsuario(
  IN p_correo_electronico VARCHAR(255),
  IN p_foto_de_perfil VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Usuarios u WHERE u.CorreoElectronico = p_correo_electronico) THEN
        SELECT 0 AS respuesta;
    ELSE
        UPDATE Usuarios
        SET FotoDePerfil = p_foto_de_perfil
        WHERE CorreoElectronico = p_correo_electronico;
        SELECT 1 AS respuesta;
    END IF;
END$$
------------------------------------------------------------------------------------------

CREATE PROCEDURE editarContraUsuario(
  IN p_correo_electronico VARCHAR(255),
  IN p_contrasena VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Usuarios u WHERE u.CorreoElectronico = p_correo_electronico) THEN
        SELECT 0 AS respuesta;
    ELSE
        UPDATE Usuarios
        SET Contrasena = p_contrasena
        WHERE CorreoElectronico = p_correo_electronico;
        SELECT 1 AS respuesta;
    END IF;
END$$
------------------------------------------------------------------------------------------

CREATE PROCEDURE obtenerUsuario(
  IN p_correo_electronico VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Usuarios u WHERE u.CorreoElectronico = p_correo_electronico) THEN
        SELECT 0 AS respuesta;
    ELSE
        SELECT * FROM Usuarios WHERE CorreoElectronico = p_correo_electronico;
    END IF;
END$$
------------------------------------------------------------------------------------------

CREATE PROCEDURE obtenerUsuarios()
BEGIN
    SELECT * FROM Usuarios;
END$$

DELIMITER ;