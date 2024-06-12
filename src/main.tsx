import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/authContext.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles/index.sass'
import AntThemeDesign from './components/layout/antThemeDesign.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <ToastContainer />
      <AntThemeDesign>
        <App />
      </AntThemeDesign>
    </BrowserRouter>
  </AuthProvider>
)
