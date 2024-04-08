import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { CardPost } from '../components';
import { UseFetchPublication } from './hooks/UseFetchPublication';


export const Home = ({ userInfo }) => {

    const [listPublication, setListPublication] = useState([]);


    // Obtener lista de publcación.
    useEffect(() => {

        UseFetchPublication(listPublication, setListPublication, userInfo)

    }, [listPublication]);


    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                p: 3,
            }}
        >

            <Grid container mt={5} spacing={2} justifyContent="center" alignItems="center" direction="column">

                {
                    listPublication.map((publication) => (
                        <Grid key={publication.PostID} item>
                            <CardPost publication={publication} userInfo={userInfo} />
                        </Grid>
                    ))
                }

            </Grid>

        </Box>
    )
}
