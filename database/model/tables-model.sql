-- dbproyecto2.SolicitudesChatbot definition

CREATE TABLE `SolicitudesChatbot` (
  `RequestID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `ContenidoSolicitud` text,
  `RespuestaChatbot` text,
  `FechaSolicitud` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`RequestID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `SolicitudesChatbot_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Usuarios` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ===============================================
-- dbproyecto2.Usuarios definition

CREATE TABLE `Usuarios` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `NombreCompleto` varchar(255) DEFAULT NULL,
  `CorreoElectronico` varchar(255) DEFAULT NULL,
  `DPI` varchar(20) DEFAULT NULL,
  `Contrasena` varchar(255) DEFAULT NULL,
  `FotoDePerfil` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `CorreoElectronico` (`CorreoElectronico`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- dbproyecto2.Amigos definition

CREATE TABLE `Amigos` (
  `FriendshipID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `FriendID` int DEFAULT NULL,
  `EstadoAmistad` int DEFAULT NULL,
  PRIMARY KEY (`FriendshipID`),
  KEY `UserID` (`UserID`),
  KEY `FriendID` (`FriendID`),
  CONSTRAINT `Amigos_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Usuarios` (`UserID`),
  CONSTRAINT `Amigos_ibfk_2` FOREIGN KEY (`FriendID`) REFERENCES `Usuarios` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- dbproyecto2.Publicaciones definition

CREATE TABLE `Publicaciones` (
  `PostID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `Imagen` varchar(255) DEFAULT NULL,
  `Descripcion` text,
  `FechaPublicacion` timestamp NULL DEFAULT NULL,
  `EtiquetasImagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PostID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `Publicaciones_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Usuarios` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- dbproyecto2.Comentarios definition

CREATE TABLE `Comentarios` (
  `CommentID` int NOT NULL AUTO_INCREMENT,
  `PostID` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  `ContenidoComentario` text,
  `FechaComentario` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`CommentID`),
  KEY `PostID` (`PostID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `Comentarios_ibfk_1` FOREIGN KEY (`PostID`) REFERENCES `Publicaciones` (`PostID`),
  CONSTRAINT `Comentarios_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `Usuarios` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- dbproyecto2.ChatMensajes definition

CREATE TABLE `ChatMensajes` (
  `MessageID` int NOT NULL AUTO_INCREMENT,
  `SenderUserID` int DEFAULT NULL,
  `ReceiverUserID` int DEFAULT NULL,
  `ContenidoMensaje` text,
  `FechaMensaje` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`MessageID`),
  KEY `SenderUserID` (`SenderUserID`),
  KEY `ReceiverUserID` (`ReceiverUserID`),
  CONSTRAINT `ChatMensajes_ibfk_1` FOREIGN KEY (`SenderUserID`) REFERENCES `Usuarios` (`UserID`),
  CONSTRAINT `ChatMensajes_ibfk_2` FOREIGN KEY (`ReceiverUserID`) REFERENCES `Usuarios` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




-- dbproyecto2.PaginasTraducidas definition

CREATE TABLE `PaginasTraducidas` (
  `TranslatedPageID` int NOT NULL AUTO_INCREMENT,
  `OriginalContentID` int DEFAULT NULL,
  `IdiomaDestino` varchar(20) DEFAULT NULL,
  `ContenidoTraducido` text,
  PRIMARY KEY (`TranslatedPageID`),
  KEY `OriginalContentID` (`OriginalContentID`),
  CONSTRAINT `PaginasTraducidas_ibfk_1` FOREIGN KEY (`OriginalContentID`) REFERENCES `Comentarios` (`CommentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;