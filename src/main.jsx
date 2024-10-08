import '@mui/material/styles/styled';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeContextProvider } from './context/ThemeContext.jsx';
import App from './App.jsx';
import './index.css';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>,
)
