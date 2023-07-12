import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import './styles/style.css';
import ReactDOM from 'react-dom/client';

//router
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom'; 
import Router from './router/router';
//store
import { persistedStore, store } from '@store/store'; 
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
          <Router />
        </GoogleOAuthProvider>;
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
