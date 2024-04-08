import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Traslate } from '../components';

export const Configuration = () => {
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

            <Traslate />

        </Box>
    )
}
