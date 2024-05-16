import { useState } from 'react'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Home from "./Pages/home"
import Login from './Pages/login'
import Register from './Pages/Register'
import Profile from './Compoanent/Profile'
import DoctorDashbord from './Compoanent/DoctorDashbord'
import NavBar from './Compoanent/NavBar'

function App() {


  return (
<BrowserRouter >
       <NavBar/>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashbord/doctor' element={<DoctorDashbord />} />
      </Routes>
    </BrowserRouter>
  )
}
// <Route path='/rdv' element={<RDV />} />
//<Route path='/doctors' element={<LsDoctors/>}></Route>

export default App
