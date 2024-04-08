import React, { useRef, useEffect, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import { Button } from '@mui/material';
import { LoginAuth } from '../components';
import { AlertSuccess } from '../components/helpers/AlertSuccess';

import './css/Login.css'; // estilos de la pagina de login.
import logo1 from '../assets/logo1.png'; // logo de la empresa.


export const Login = ({ setDataUser }) => {

  // Hook para la camara.
  const webcamRef = useRef(null);


  // Estado para el mensaje de exito.
  const [showAlert, setShowAlert] = useState(false);


  // Hook para el checkbox.
  const [checked, setChecked] = useState(false);


  // Hook para reconocimiento.
  const [facial, setFacial] = useState(false);


  // Estado para la imagen capturada.
  const [capturedImage, setCapturedImage] = useState(null);


  // Estado para la foto.
  const [photo, setPhoto] = useState({
    profile: '', //No lo utilizo, pero lo dejo por si acaso.
    base64: '',
    name: '',
  });


  // Funcion para capturar la imagen de la camara.
  const handleCapture = useCallback(() => {

    setFacial(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowAlert(true);

  }, [webcamRef, setCapturedImage]);


  // Estado para la captura de la foto.
  useEffect(() => {

    if (capturedImage != null) {

      const arrayB64 = capturedImage.split(',');

      setPhoto({
        profile: capturedImage,
        base64: arrayB64[1],
        name: 'photoProfile.jpg', //Corregir nombre
      });

    }

  }, [capturedImage])



  return (
    <>

      <div className="body-login">

        <div className='content-login'>

          <div className="content-logo-login">

            {
              checked === true
                ?

                <div style={{ height: 300, width: 300, marginRight: 80 }}>

                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    height={300}
                    screenshotFormat="image/jpeg"
                  />

                  <Button
                    sx={{ marginLeft: 17, marginTop: 1 }}
                    startIcon={<CenterFocusWeakIcon />}
                    variant="contained"
                    color="primary"
                    onClick={handleCapture}
                  >
                    Capturar
                  </Button>

                </div>

                :

                <img src={logo1} alt="logo" width='459vh' height="347vh" />

            }


          </div>


          <div className="content-form-login">

            <div className="title-form-login">

              <h1>Inicio de sesión</h1>

            </div>

            <div className="content-inputs-login">

              < LoginAuth checked={checked} setChecked={setChecked} photo={photo} setPhoto={setPhoto} facial={facial} setFacial={setFacial} setDataUser={setDataUser} />

            </div>

          </div>

        </div>

      </div>

      {
        showAlert === true
          ?
          <AlertSuccess message={"Se ha capturado la imagen"} flag={true} setShowAlert={setShowAlert} />
          :
          null
      }

    </>
  )
}
