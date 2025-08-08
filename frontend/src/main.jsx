import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { router } from './route/route.jsx'
import { RouterProvider } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-qjsi6x57jq663kqf.us.auth0.com"
      clientId="KvAn4ms06cvJm12gDmix9l5RIboFRuHx"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      onRedirectCallback={(appState) => {
    window.history.replaceState({}, document.title, appState?.returnTo || window.location.pathname);
  }}
    >
      <Provider store={store}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Provider>
    </Auth0Provider>
  </StrictMode>,
)
