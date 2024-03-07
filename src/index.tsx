import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import store, { persistedStore } from '@store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <App/>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
