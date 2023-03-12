import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import './styles/style.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; //router
import Router from './router/router';
import { store } from './store/store'; //store
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Router />
      </BrowserRouter> 
    </Provider>
  </React.StrictMode>
);
