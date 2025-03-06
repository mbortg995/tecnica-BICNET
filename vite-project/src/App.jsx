import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './pages/auth/LoginPage'
import { AuthProvider } from './context/AuthContext'


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<h1>LOGUEADO</h1>}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
