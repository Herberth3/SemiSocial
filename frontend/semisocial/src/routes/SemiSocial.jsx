import React, { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import { Login, Register } from '../pages' // paginas que se van a renderizar.
import { SliderBar } from '../components' // Componente que se va a renderizar.
import { getUser } from './helper/getUser';

export const SemiSocial = () => {

    //Estado para las credenciales del usuario.
    const [dataUser, setDataUser] = useState({});


    //Estado para obtener los datos del usuario.
    const [userInfo, setUserInfo] = useState({});


    useEffect(() => {

        getUser(dataUser.email, setUserInfo); // Obtenemos los datos del usuario.

    }, [dataUser]);


    return (
        <Routes>
            <Route path="/" element={<Login setDataUser={setDataUser} />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/inicio" element={<SliderBar setUserInfo={setUserInfo} userInfo={userInfo}  setDataUser={setDataUser} dataUser={dataUser} />} />
        </Routes>
    )
}