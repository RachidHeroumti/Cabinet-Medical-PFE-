import React, { createContext, useState ,useEffect, useContext } from 'react'
import Cookies from "js-cookie"


const cabContext= createContext();
export default function cabinatProvider({children}) {
const[user,setUser]=useState([]);
const[doctors,setDoctors]=useState([]);
const[doctorSelected,setDoctorSelected]=useState([]);


useEffect(()=>{
  const cookieValue = Cookies.get('user');
 cookieValue ? setUser(JSON.parse(cookieValue) ): setUser(null);
  
},[]);


  return (
    <cabContext.Provider value={{
       user,setUser,
       doctors,setDoctors,
       doctorSelected ,setDoctorSelected
    }}>{children}</cabContext.Provider>
  )
}

export const Cabstate=()=>{
  return useContext(cabContext);
}
