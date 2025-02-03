import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/login'
import { SignupPage } from './pages/signup'
import { HomePage } from './pages/home'
import { useAuth } from './contexts/AuthContext'
import { Navbar } from './components/navbar'

function App() {
  const { token } = useAuth();

  return (
    <>
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={token ? <Navigate to="/" /> : <SignupPage />} />
        <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App
