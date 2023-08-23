import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import store from './components/store/Store.jsx';
import { Provider } from 'react-redux';
import { PropertiesProvider } from './components/Search/ListProperties.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* react router */}
    <BrowserRouter>
      {/* react redux */}
      <Provider store={store}>
        <PropertiesProvider>
          <App />
        </PropertiesProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
