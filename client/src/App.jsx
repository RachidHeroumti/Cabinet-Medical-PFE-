import { useState } from 'react'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Home from "./Pages/home"
import Login from './Pages/login'
import Register from './Pages/Register'
import LsDoctors from './Compoanent/LsDoctors'
import RDV from './Compoanent/RDV'
import Profile from './Compoanent/Profile'

function App() {


  return (
<BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/doctors' element={<LsDoctors/>}></Route>
        <Route path='/rdv' element={<RDV />} />
        <Route path='/profile' element={<Profile />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
