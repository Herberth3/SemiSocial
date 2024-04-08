import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { AcceptFriend } from '../components';

export const FriendRequest = ({ userInfo }) => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                display: 'flex',
                justifyContent: 'center',
                margin: 10,
            }}
        >
            <Toolbar />

            <AcceptFriend userInfo={userInfo} />

        </Box>
    )
}
