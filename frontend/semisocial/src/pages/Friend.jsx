import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { FriendChat } from '../components';

export const Friend = ({ userInfo }) => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                display: 'flex',
                paddingTop: 10
            }}
        >
            <Toolbar />

            <FriendChat userInfo={userInfo} />

        </Box>
    )
}
