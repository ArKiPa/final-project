import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Store from './Store/Store.js';
import Api from './components/Api/Api.js';
import './index.css';

const store = new Store()

export const Context = createContext({store})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{store}}>
    <Router>
      <React.StrictMode>
        <Api />
      </React.StrictMode>
    </Router>
  </Context.Provider>
);