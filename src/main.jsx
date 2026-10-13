import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { store } from './app/reduxStore.js';
import { theme } from './shared/config/theme.js';

import './i18n.js';

import { Toaster } from 'react-hot-toast';

import App from './app/App.jsx';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            maxWidth: '420px',
            minHeight: '52px',
            padding: '14px 18px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            background: '#18212f',
            color: '#f8fafc',
            fontSize: '15px',
            fontWeight: 600,
            boxShadow: '0 12px 30px rgba(15, 23, 42, 0.24)',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#18212f',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#18212f',
            },
          },
          loading: {
            iconTheme: {
              primary: '#60a5fa',
              secondary: '#18212f',
            },
          },
        }}
      />
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
