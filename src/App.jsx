//CSS
import './App.css'

//Imports
import { useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

//Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
