//CSS
import './App.css'

//Imports
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { onAuthStateChanged } from 'firebase/auth'

//hooks
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication'



//Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

//context
import { AuthProvider } from '../context/AuthContext'

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  //mapeio a auth constantemente!
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <>
    {/*Agora eu tenho como acessar o usuário em todos os locais*/}
      <AuthProvider value={{ user }}>
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
