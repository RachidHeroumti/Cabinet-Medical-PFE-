import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate();
  const[err,setErr]=useState('');


  const OnLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    //
    if (!email || !password) {
      setErr('email or password incorrect!!');
      return;
    } 
    if (!isValidEmail) {
      setErr('Please enter a valid email!!');
      return false;
    }
    else{

      try{
        const res = await  axios.post("http://localhost:5000/pfe/api/login",{
          email,password
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
    <div className='max-w-[1640] p-4 flex justify-center py-12'>
      <div className='w-[400px] p-5 bg-gray-50 shadow-lg rounded-md '>
        <h1 className=' text-2xl font-bold text-sky-600 p-2'> Log in</h1>
        <div>
          <input onChange={(e) => { setEmail(e.target.value) }}
            value={email}
            className='bg-gray-200 w-full outline-none px-3 py-1 rounded-md m-1'
            type='email' placeholder='Email' />

          <input onChange={(e) => { setPassword(e.target.value) }}
            value={password}
            className='bg-gray-200 w-full outline-none px-3 py-1 rounded-md m-1'
            type='password' placeholder='Password' />
{err&&<span className=' text-red-600 font-semibold'>{err}</span>}
          <button onClick={() => { OnLogin() }}
            className='rounded-full w-full text-center font-bold mt-2 bg-sky-500 hover:bg-sky-600 text-white  p-1'>
            Log in
          </button>
          <div className='flex items-center justify-end py-2'>
            <span>
              you don't have account  ? <Link to="/register"
                className=' px-2 text-sky-600  font-bold'>Register</Link>
            </span>
          </div>

        </div>
      </div>
          </div>
  )
}

export default Login