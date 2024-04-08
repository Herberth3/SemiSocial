import React from 'react';
import { RegisterAuth } from '../components';

import './css/register.css';
import registro from '../assets/registro.png'; // logo de la empresa.


export const Register = () => {


    return (
        <div className="body-register">

            <div className="content-register">

                <div className="content-register-logo">

                    <img src={registro} alt="logo" width='359vh' height="260vh" />

                </div>

                <div className='content-form-register'>

                    <RegisterAuth />

                </div>

            </div>

        </div>
    )
}
