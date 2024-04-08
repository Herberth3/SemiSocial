import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // React Router
import { SemiSocial } from './routes/SemiSocial';
import "react-chat-elements/dist/main.css"; // Chat Elements css

import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SemiSocial />
    </BrowserRouter>
  </React.StrictMode>
);