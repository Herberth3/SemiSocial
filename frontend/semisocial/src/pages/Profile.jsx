import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { EditProfile } from '../components';


export const Profile = ({ setUserInfo, userInfo, setDataUser, dataUser }) => {
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

            <EditProfile setUserInfo={setUserInfo} userInfo={userInfo} setDataUser={setDataUser} dataUser={dataUser} />

        </Box>
    )
}