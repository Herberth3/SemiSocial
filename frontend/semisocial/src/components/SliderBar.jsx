import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ThreePIcon from '@mui/icons-material/ThreeP';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from 'react-router-dom';
import { getLogout } from './helpers/getLogout';
import { Home, Publication, Profile, AddFriend, Friend, Configuration, ChatBot, FriendRequest } from '../pages'; // Importamos el las paginas.

const drawerWidth = 240;

export const SliderBar = ({ setUserInfo, userInfo, setDataUser, dataUser }) => {

    // hook para navegar.
    const navigate = useNavigate();


    //Estado para la seleccion del menu.
    const [selectedIndex, setSelectedIndex] = useState(1);


    // Funcion para cerrar sesion.
    const handleLogout = () => {

        getLogout(navigate);
    }


    return (
        <Box sx={{ display: 'flex' }}>

            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        SEMISOCIAL
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >

                <Toolbar />

                <Divider />

                <List>

                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={(e) => setSelectedIndex(1)}
                        >
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inicio" />
                        </ListItemButton>
                    </ListItem>


                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={(e) => setSelectedIndex(2)}
                        >
                            <ListItemIcon>
                                <PostAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Crear publicación" />
                        </ListItemButton>
                    </ListItem>


                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 3}
                            onClick={(e) => setSelectedIndex(3)}
                        >
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Amigos" />
                        </ListItemButton>
                    </ListItem>


                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 4}
                            onClick={(e) => setSelectedIndex(4)}
                        >
                            <ListItemIcon>
                                <PersonAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Agregar Amigos" />
                        </ListItemButton>
                    </ListItem>


                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 8}
                            onClick={(e) => setSelectedIndex(8)}
                        >
                            <ListItemIcon>
                                <HowToRegIcon />
                            </ListItemIcon>
                            <ListItemText primary="Solicitud de Amistad" />
                        </ListItemButton>
                    </ListItem>


                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 5}
                            onClick={(e) => setSelectedIndex(5)}
                        >
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Perfil" />
                        </ListItemButton>
                    </ListItem>


                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 7}
                            onClick={(e) => setSelectedIndex(7)}
                        >
                            <ListItemIcon>
                                <ThreePIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chat bot" />
                        </ListItemButton>
                    </ListItem>


                    <ListItem disablePadding>
                        <ListItemButton
                            selected={selectedIndex === 6}
                            onClick={(e) => setSelectedIndex(6)}
                        >
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Configuración" />
                        </ListItemButton>
                    </ListItem>





                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={handleLogout}
                        >
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cerrar Sesión" />
                        </ListItemButton>
                    </ListItem>

                </List>

            </Drawer>


            {selectedIndex === 1 && <Home userInfo={userInfo} />}
            {selectedIndex === 2 && <Publication userInfo={userInfo} />}
            {selectedIndex === 3 && <Friend userInfo={userInfo} />}
            {selectedIndex === 4 && <AddFriend userInfo={userInfo} />}
            {selectedIndex === 5 && <Profile setUserInfo={setUserInfo} userInfo={userInfo} setDataUser={setDataUser} dataUser={dataUser} />}
            {selectedIndex === 6 && <Configuration />}
            {selectedIndex === 7 && <ChatBot />}
            {selectedIndex === 8 && <FriendRequest userInfo={userInfo} />}


        </Box>
    )
}
