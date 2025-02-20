import { useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AboutPage from './components/AboutPage.jsx'
import LoginPage from './components/auth/LoginPage.jsx'
import RegistrationPage from './components/auth/RegistrationPage.jsx'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
