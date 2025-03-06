import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './pages/auth/LoginPage'
import { AuthProvider } from './context/AuthContext'
import Dashboard from './pages/dashboard/Dashboard'


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
