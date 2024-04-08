import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    flexDirection: 'column',
    display: 'flex',
    padding: theme.spacing(2),
}));

const options = ['Español', 'Inglés', 'Francés', 'Chino'];


export const Traslate = () => {

    const [value, setValue] = useState(options[0]);


    const handleLenguaje = (event) => {
        console.log(value);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    width: 900,
                    height: 600,
                },
            }}
        >

            <Item elevation={8}>

                <Stack direction='row' spacing={2} >

                    <Typography variant="h6" >
                        Traducir publicaciones:
                    </Typography>

                    <Autocomplete
                        sx={{ width: 300 }}
                        value={value}
                        options={options}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Idioma" />}
                    />

                </Stack>

                <Button
                    sx={{ mt: 55, ml: 40, width: 190, height: 55 }}
                    variant="contained"
                    color="success"
                    onClick={handleLenguaje}
                >
                    Guardar cambios
                </Button>

            </Item>

        </Box>
    )
}
