import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvier } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvier>
      <GoogleOAuthProvider clientId='1039961356162-uo2erc3olri68i05t2mj7rj2vmajen8n.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </AuthProvier>
  </React.StrictMode>,
)
