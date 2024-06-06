import React, { useState ,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { FaIdCard,FaPhone } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { RiUserLocationFill } from "react-icons/ri";
import { FaCalendarDay } from "react-icons/fa";
import { getDepartmetRoute, registerRoute } from '../Routes/routes';
import { Cabstate } from '../Context/cabinatProvider';




function Editpage({setIsEdit}) {

 const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phon, setPhon] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Agadir");
   const[birthday,setBirthDay]=useState("");
   const[cabinetName,setCabinetName]=useState("");
   const[description,setDescription]=useState("");
   const[department,setDepartment]=useState("");
   const[Services,setServices]=useState("");
   const[depSelect,setDepSelect]=useState("");
   const[serSelect,setSerSelect]=useState("");
   const[depIdSelectd,setDepIdSelected]=useState("");
   const[MLN,setMLN]=useState("");
   const[isLabo,setisLabo]=useState(false);

  const {user,setUser}=Cabstate();
  const[err,setErr]=useState('');
  const navigate =useNavigate();
  const[isDoctor,setIsDoctot]=useState(false);

  useEffect(()=>{
    console.log(user)
   if(user){
    setFullName(user.fullName);setEmail(user.email);setNationalId("j549827");
    setPhon(user.phon);

}
},[user]);





useEffect(()=>{
},[]);

  const OnRegister = async () => {
    //
    if (!fullName || !email || !password) {
     
      setErr('Some fields are Empty !');
      return;
    }
    //check email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check if the entered email matches the email format
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      setErr('Please enter a valid email!!');
      return false;
    }
   else if (fullName.length <= 8) { 
      setErr('full name must contain two word!');
      return;
    }
    else if (password.length < 6) {
      setErr('Password must be longer!');
      return;
    }
   
else{
  try{
    const [day, month, year] = birthday.split("/");
    const dateN=new Date(year,month-1,day);
  
  }catch(er){console.error(er);}
 
}

  }


  return (
    <div className=' w-full flex flex-col justify-center items-center p-10'>

   
    <div className=' bg-gray-50 w-1/2  p-4 rounded-md '>

<button className=' text-red-500 text-end w-full text-2xl font-semibold px-4' onClick={()=>{setIsEdit(false)}}>X</button>
        <div className=' font-bold text-sky-600 p-2 space-y-2'>

    <div className='bg-gray-100 flex border border-gray-800 p-1 items-center text-gray-900'>
    <FaRegUserCircle size={30} className=' text-gray-950'/>
    <input onChange={(e) => { setFullName(e.target.value) }}
          value={fullName}
          className=' w-full outline-none px-3  rounded-md  bg-transparent font-medium'
          type='text'
          placeholder='Full Name *' />
    </div>
      
      
    <div className='bg-gray-100 flex border border-gray-800 p-1 items-center text-gray-900'>
    <MdOutlineMail size={30} className=' text-gray-950'/>
    <input onChange={(e) => { setEmail(e.target.value) }}
          value={email}
          className=' w-full outline-none px-3  rounded-md  bg-transparent font-medium'
          type='text'
          placeholder='Email *' />
    </div>
    
    
    <div className='bg-gray-100 flex border border-gray-800 p-1 items-center text-gray-900'>
    <MdPassword size={30} className=' text-gray-950'/>
    <input onChange={(e) => { setPassword(e.target.value) }}
          value={password}
          className=' w-full outline-none px-3  rounded-md  bg-transparent font-medium'
          type='password'
          placeholder='Password *' />
    </div>
    
    
    <div className='bg-gray-100 flex border border-gray-800 p-1 items-center text-gray-900'>
    <FaIdCard size={30} className=' text-gray-950'/>
    <input onChange={(e) => { setNationalId(e.target.value) }}
          value={nationalId}
          className=' w-full outline-none px-3  rounded-md  bg-transparent font-medium'
          type='text'
          placeholder='CIN *' />
    </div>
    
    
    <div className='bg-gray-100 flex border border-gray-800 p-1 items-center text-gray-900'>
    <FaCalendarDay size={30} className=' text-gray-950'/>
    <input onChange={(e) => { setBirthDay(e.target.value) }}
          value={birthday}
          className=' w-full outline-none px-3  rounded-md  bg-transparent font-medium'
          type='text'
          placeholder='Date de naissance * DD/MM/YYYY ' />
    </div>
      
    
    <div className='bg-gray-100 flex border border-gray-800 p-1 items-center text-gray-900'>
    <FaPhone size={30} className=' text-gray-950'/>
    <input onChange={(e) => { setPhon(e.target.value) }}
          value={phon}
          className=' w-full outline-none px-3  rounded-md  bg-transparent font-medium'
          type='text'
          placeholder=' +212 *' />
    </div>
    
    
    {err&&<span className=' text-red-600 font-semibold'>{err}</span>}
              <button onClick={() => { setIsEdit(true) }}
                className='rounded-xl w-full text-center font-bold mt-2  border border-sky-700 hover:border-sky-800
                 hover:bg-sky-200   p-1'>
                Save
              </button>
              
       </div>
    </div>
    </div>
  )
}

export default Editpage
