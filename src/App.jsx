//CSS
import './App.css'

//Imports
import { useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

//Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { AuthProvider } from '../context/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
