import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { UseFetchFriendRequest } from './hooks/UseFetchFriendRequest';
import { setAcceptFriend } from './helpers/setAcceptFriend';
import { setRejectRequest } from './helpers/setRejectRequest';


// Estilo de la caja.
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    flexDirection: 'column',
    display: 'flex',
    padding: theme.spacing(2),
    overflow: 'auto',
}));


export const AcceptFriend = ({ userInfo }) => {

    //Lista de solicitudes de amigos.
    const [listRequest, setListRequest] = useState([]);


    useEffect(() => {

        // Obtenemos la lista de solicitudes de amistad.
        UseFetchFriendRequest(listRequest, setListRequest, userInfo);

    }, [listRequest, setListRequest, userInfo]);


    // Funciones para cerrar el modal.
    const handleDenied = (friendRequestInfo) => {

        setRejectRequest(userInfo, friendRequestInfo, setListRequest);

    };


    // Funciones para aceptar solicitud.
    const handleAccept = (friendRequestInfo) => {

        setAcceptFriend(userInfo, friendRequestInfo, setListRequest);

    };


    return (

        <>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: 2,
                    '& > :not(style)': {
                        width: 880,
                        height: 620,
                    },
                }}
            >

                <Item elevation={8}>

                    <List
                        sx={{
                            width: 820,
                            maxWidth: 850,
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 618,
                            '& ul': { padding: 0 },
                        }}
                        subheader={<li />}
                    >
                        {
                            listRequest.map((friendRequest, index) => (

                                <React.Fragment key={index}>

                                    <ListItem
                                        alignItems="flex-start"
                                        secondaryAction={
                                            <React.Fragment>
                                                <IconButton onClick={() => handleAccept(friendRequest)} aria-label="comment">
                                                    <CheckIcon />
                                                </IconButton>

                                                <IconButton onClick={() => handleDenied(friendRequest)} aria-label="comment">
                                                    <ClearIcon />
                                                </IconButton>
                                            </React.Fragment>
                                        }
                                    >

                                        <ListItemAvatar>

                                            <Avatar src={friendRequest.FotoDePerfil} />

                                        </ListItemAvatar>

                                        <ListItemText
                                            primary={friendRequest.NombreCompleto}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        quiero ser tu amigo.
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


                </Item>

            </Box>

        </>

    )
}
