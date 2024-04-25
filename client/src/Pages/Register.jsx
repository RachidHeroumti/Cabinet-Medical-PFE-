import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios';
import Cookies from 'js-cookie';


function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phon, setPhon] = useState("");
  const[err,setErr]=useState('');
const navigate =useNavigate();

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
    const res = await axios.post("http://localhost:5000/pfe/api/register",{
      fullName,email,password,nationalId,phon
    })

    console.log(res.data);
   if(res.data._id){
    Cookies.set("ut",res.data.token, { expires: 10 }) ;
    Cookies.set('user', JSON.stringify(res.data));
    navigate("/rdv");
   }
  }catch(er){console.error(er);}
 


}

  }
  return (
    <div className='max-w-[1640] p-4 flex  justify-center items-center py-12 '>

      <div className='w-[400px] p-5 bg-gray-50 shadow-lg rounded-md '>
        <h1 className=' text-2xl font-bold text-sky-600 p-2'> Register</h1>
        <div>
          <input onChange={(e) => { setFullName(e.target.value) }}
            value={fullName}
            className='bg-gray-200 w-full outline-none px-3 py-1 rounded-md m-1'
            type='text'
            placeholder='Full Name *' />
          <input onChange={(e) => { setEmail(e.target.value) }}
            value={email}
            className='bg-gray-200 w-full outline-none px-3 py-1 rounded-md m-1'
            type='email' placeholder='Email *' />

          <input onChange={(e) => { setPassword(e.target.value) }}
            value={password}
            className='bg-gray-200 w-full outline-none px-3 py-1 rounded-md m-1'
            type='password' placeholder='Password *' />

             <input onChange={(e) => { setNationalId(e.target.value) }}
            value={nationalId}
            className='bg-gray-200 w-full outline-none px-3 py-1 rounded-md m-1'
            type='text'
            placeholder='CNI *' />

            <input onChange={(e) => { setPhon(e.target.value) }}
            value={phon}
            className='bg-gray-200 w-full outline-none px-3 py-1 rounded-md m-1'
            type='Number'
            placeholder='Phon number *' />


{err&&<span className=' text-red-600 font-semibold'>{err}</span>}
          <button onClick={() => { OnRegister() }}
            className='rounded-xl w-full text-center font-bold mt-2 bg-sky-500 hover:bg-sky-600
              text-white  p-1'>
            Register
          </button>
          <div className='flex items-center justify-end py-2'>
            <span>
              Already have an account ? <Link to="/login"
                className=' px-2 text-sky-600  font-bold'>Login</Link>
            </span>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Register