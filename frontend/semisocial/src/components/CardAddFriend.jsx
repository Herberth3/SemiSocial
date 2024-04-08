import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import { setAddFriend } from './helpers/setAddFriend';


export const CardAddFriend = ({ friend, userInfo, setListUser }) => {

    const handleAddFriend = () => {

        setAddFriend(userInfo, friend, setListUser);

    }

    return (
        <Card sx={{ maxWidth: 345, maxHeight: 400 }}>

            <Avatar
                sx={{ width: 250, height: 175 }}
                variant="square"
                src={friend.FotoDePerfil}
            />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {friend.NombreCompleto}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small" onClick={handleAddFriend} variant="contained" startIcon={<AddIcon />}>
                    Agregar
                </Button>
            </CardActions>

        </Card>
    )
}
