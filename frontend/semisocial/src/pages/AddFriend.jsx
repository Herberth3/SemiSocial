import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { CardAddFriend } from '../components';
import { UseFetchListUser } from '../components/hooks/UseFetchListUser';


export const AddFriend = ({ userInfo }) => {

    const [listUser, setListUser] = useState([]);

    useEffect(() => {

        UseFetchListUser(listUser, setListUser, userInfo);

    }, [listUser, setListUser, userInfo]);


    return (

        <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                p: 3,
            }}
        >

            <Grid container mt={5} spacing={2} justifyContent="center" alignItems="center">

                {
                    listUser.map((user) => (

                        user.UserID !== userInfo.idUser
                            ?
                            <Grid item key={user.UserID}>
                                <CardAddFriend key={user.UserID} friend={user} userInfo={userInfo} setListUser={setListUser} />
                            </Grid>
                            :
                            null
                    ))
                }

            </Grid>

        </Box>
    )
}
