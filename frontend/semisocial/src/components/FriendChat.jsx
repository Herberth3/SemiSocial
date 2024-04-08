import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { ChatBox } from './ChatBox';
import { UseFetchListFriend } from './hooks/UseFetchListFriend';
import socket from '../socket/socket'


// Estilo de punto verde en el avatar.
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));



export const FriendChat = ({ userInfo }) => {

    // Lista de amigos.
    const [listFriend, setListFriend] = useState([]);


    // Obtener informacion de amigo para el chat.
    const [friendChat, setFriendChat] = useState(
        {
            UserID: 0,
            friend_id: 0,
            message: ''
        }
    );


    // Obtener lista de amigos.
    useEffect(() => {

        UseFetchListFriend(listFriend, setListFriend, userInfo)

    }, [listFriend]);



    // useEffect(() => {

    //     // Conectar el socket al montar el componente
    //     if (friendChat.UserID === 0) return;

    //     console.log('ESTOY DESDE EL FRIEND CHAT', friendChat);

    //     // // console.log('Envio al socket: ', friendChat);
    //     socket.emit('messageFromClient', friendChat);

    // }, [friendChat]);


    const handleChat = (friend) => {

        // console.log('Amigo seleccionado: ', friend);
        setFriendChat({
            UserID: userInfo.idUser,
            friend_id: friend.UserID,
            message: ''
        });

        socket.emit('messageFromClient', {
            UserID: userInfo.idUser,
            friend_id: friend.UserID,
            message: ''
        });
    };


    return (
        <>
            <Stack direction="row" spacing={2}>

                <List
                    sx={{
                        width: 320,
                        maxWidth: 500,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 700,
                        '& ul': { padding: 0 },
                    }}
                    subheader={<li />}
                >

                    {
                        listFriend.map((friend) => (

                            <React.Fragment key={friend.UserID}>

                                <ListItem
                                    alignItems="flex-start"
                                    secondaryAction={


                                        <IconButton aria-label="comment" onClick={() => handleChat(friend)}>
                                            <CommentIcon />
                                        </IconButton>

                                    }
                                >

                                    <ListItemAvatar>
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar src={friend.FotoDePerfil} />
                                        </StyledBadge>
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={friend.NombreCompleto}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Conectado
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />

                                </ListItem>

                                <Divider variant="inset" component="li" />

                            </React.Fragment>
                        ))
                    }

                </List>

                {
                    friendChat.UserID !== 0
                        ?
                        <ChatBox friendChat={friendChat} />
                        :
                        null
                }

            </Stack >

        </>
    )
}
