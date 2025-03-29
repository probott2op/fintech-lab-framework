import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AboutPage from './components/AboutPage.jsx'
import UserLoginPage from './components/auth/UserLoginPage.jsx'
import AdminLoginPage from './components/auth/AdminLoginPage.jsx'
import RegistrationPage from './components/auth/RegistrationPage.jsx'
import UserDashboard from './components/UserPages/UserDashboard.jsx'
import AdminDashboard from './components/AdminPages/AdminDashboard.jsx'
import BankPage from './components/UserPages/BankPage.jsx'
import UsersList from './components/AdminPages/UserInfo.jsx'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/users/login" element={<UserLoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/users/dashboard" element={<UserDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/user-info" element={<UsersList />} />
        <Route path="/admin/register" element={<RegistrationPage />} />
          <Route path="/info" element={<BankPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
