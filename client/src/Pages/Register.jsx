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






function Register() {
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

  const {user,setUser}=Cabstate();
  const[err,setErr]=useState('');
  const navigate =useNavigate();
  const[isDoctor,setIsDoctot]=useState(false);

  useEffect(()=>{
    const getDeps=async()=>{
       const res= await axios.get(getDepartmetRoute);
       if(res.data.deps){
        setDepartment(res.data.deps);
       }
    }
    getDeps();
},[]);


useEffect(()=>{
if(depSelect&&department){
    const itemSelected = department.filter((idep)=>{
        return idep.name === depSelect
    })
    setDepIdSelected(itemSelected[0]._id)
    setServices(itemSelected[0].services);
    console.log(itemSelected[0]._id);
}
},[depSelect]);

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

    const res = await axios.post(registerRoute,{
      fullName,email,password,nationalId,phon,dateNaissance:dateN
    });

    console.log(res.data);
   if(res.data._id){
    Cookies.set("ut",res.data.token, { expires: 10 }) ;
    Cookies.set('user', JSON.stringify(res.data));
    navigate("/profile");
   }else{
    setErr(res.data.message);
   }
  }catch(er){console.error(er);}
 
}

  }

const onAddDoctor =async()=>{

    //
    if (!fullName || !email || !password||!address ||!city ||!birthday ||!cabinetName ||!description||!depSelect||!serSelect||!MLN) {
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
//check all info 
    else{
      //add Medcin

      try{
        const [day, month, year] = birthday.split("/");
        const dateN=new Date(year,month-1,day)
        const res=await axios.post(registerRoute, {fullName,email,password,address,nationalId,isMedecin:true,phon,
            dateNaissance:dateN,Service:serSelect ,Departement:depIdSelectd,city,cabenitName:cabinetName,description});


            if(res.data._id){
              Cookies.set("ut",res.data.token, { expires: 15 }) ;
              Cookies.set('user', JSON.stringify(res.data));
              navigate("/profile");
              setUser(res.data);
            }


      }catch(err){console.log(err)}


    }

}


  return (
    <div className='max-w-[1640] p-4 flex  justify-center   pt-12'>

      <div className='w-[800px] p-5 bg-gray-100 shadow-2xl rounded-md mt-10'>

        <div className=' flex w-full p-2 space-x-2'>
        <button className={`w-full p-1 ${!isDoctor ? "bg-sky-700 text-white" : " border border-sky-600"}`}
        onClick={()=>{setIsDoctot(false)}}
        >Patient</button>
        <button className={`w-full p-1 ${isDoctor ? "bg-sky-700 text-white" : "border border-sky-600"}`}
         onClick={()=>{setIsDoctot(true)}}
        >Medecin</button>
        </div>


       {!isDoctor&&  <div className=' font-bold text-sky-600 p-2 space-y-2'>

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
          <button onClick={() => { OnRegister() }}
            className='rounded-xl w-full text-center font-bold mt-2  border border-sky-700 hover:border-sky-800
             hover:bg-sky-200   p-1'>
            Register
          </button>
          <div className='flex items-center justify-end py-2'>
            <span className=' text-gray-950'>
              Already have an account ? <Link to="/login"
                className=' px-2 text-sky-600  font-bold'>Login</Link>
            </span>
          </div>

</div>}

    {isDoctor&& 
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
      <FaPhone size={30} className=' text-gray-950'/>
      <input onChange={(e) => { setPhon(e.target.value) }}
            value={phon}
            className=' w-full outline-none px-3  rounded-md  bg-transparent font-medium'
            type='number'
            placeholder=' +212 *' />
      </div>


      <div className='bg-gray-100 flex border border-gray-800 p-1 items-center text-gray-900 space-x-2'>
      <RiUserLocationFill size={30} className=' text-gray-950'/>
      <input onChange={(e) => { setAddress(e.target.value) }}
            value={address}
            className=' w-full outline-none px-3  rounded-md  bg-transparent font-medium'
            type='text'
            placeholder='address line *' />
      <select value={city} onChange={(e) => { setCity(e.target.value) }} className='p-1 px-2 outline-non'>
  <option>Agadir</option>
  <option>Fes</option>
  <option>Rabat</option>
  <option>Casablanca</option>
</select>

      </div>

      <div className='bg-gray-100 flex border border-gray-800 p-1 items-center text-gray-900'>
<FaCalendarDay size={30} className=' text-gray-950'/>
<input onChange={(e) => { setBirthDay(e.target.value) }}
      value={birthday}
      className=' w-full outline-none px-3  rounded-md  bg-transparent font-medium'
      type='text'
      placeholder='Date de naissance * DD/MM/YYYY ' />
    </div>


      <div className='bg-gray-100 flex border border-gray-800 p-1 items-center text-gray-700 justify-between'>
      <h1 className=' text-center text-gray-900 '>Department :</h1>
      <select value={depSelect} onChange={(e)=>setDepSelect(e.target.value)} className="p-1 outline-none">
        <option value="">Select  depratment</option>
        {department && department.map((item, i) => (
          <option key={i} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
   <h1 className=' text-center text-gray-800 '>Service :</h1>
      <select className="px-2 p-1 outline-none " value={serSelect} onChange={(e)=>{setSerSelect(e.target.value)}} >
                { department&&Services&&Services.map((item,i)=>{
      return ( 
          <option key={i} className=" p-1 ">{item}</option>
             )
                })
                  }
              
            </select>
      </div>


      <div className='bg-gray-100 flex border border-gray-800 p-1 items-center text-gray-900'>
      <FaUserDoctor size={30} className=' text-gray-950'/>
      <input onChange={(e) => { setMLN(e.target.value) }}
            value={MLN}
            className=' w-full outline-none px-3  rounded-md  bg-transparent font-medium'
            type='text'
            placeholder='Medical license number *' />
      </div>


   
      <div className='bg-gray-100 flex border border-gray-800 p-1 items-center text-gray-900'>
      <FaHospitalUser size={30} className=' text-gray-950'/>
      <input onChange={(e) => { setCabinetName(e.target.value) }}
            value={cabinetName}
            className=' w-full outline-none px-3  rounded-md  bg-transparent font-medium'
            type='text'
            placeholder='Cabinet Name *' />
      </div>

  <div className='bg-gray-100 flex border border-gray-800 p-1 items-center text-gray-900'>
  
  <textarea className='w-full outline-none '
   value={description}
   onChange={(e)=>{setDescription(e.target.value)}}
  placeholder='Describe your experience in (50->300 word)'>

  </textarea>


      </div>


{err&&<span className=' text-red-600 font-semibold'>{err}</span>}
          <button onClick={() => { onAddDoctor()}}
            className='rounded-xl w-full text-center font-bold mt-2  border border-sky-700 hover:border-sky-800
            hover:bg-sky-200   p-1'>
            Register
          </button>
          <div className='flex items-center justify-end py-2'>
            <span className=' text-gray-900'>
              Already have an account ? <Link to="/login"
                className=' px-2 text-sky-600  font-bold'>Login</Link>
            </span>
          </div>

      </div>}

      </div>

    </div>
  )
}

export default Register