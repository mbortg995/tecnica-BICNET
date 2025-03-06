import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './pages/auth/LoginPage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>LOGUEADO</h1>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
