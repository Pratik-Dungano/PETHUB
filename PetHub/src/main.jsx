import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './components/router/Router';
import AuthProvider from './components/providers/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Auth0Provider } from '@auth0/auth0-react';

// Create a client for react-query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-bfalgnu6ukdtch07.us.auth0.com"
      clientId="KpkqmDmNGw8AjscnkHX6Lt15YPHqHS60"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </Auth0Provider>
  </React.StrictMode>
);
