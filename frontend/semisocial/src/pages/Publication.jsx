import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { CreatePublication } from '../components';

export const Publication = ({ userInfo }) => {
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

            <CreatePublication userInfo={userInfo} />

        </Box>
    )
}
