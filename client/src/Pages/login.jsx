import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';
import { Cabstate } from '../Context/cabinatProvider';
import CustomCheckbox from '../Compoanent/CssCompoanent/CustomCheckbox';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate();
  const[err,setErr]=useState('');
const{setUser}=Cabstate();

const [rememberMe, setRememberMe] = useState(false);

const handleCheckboxChange = (e) => {
  setRememberMe(e.target.checked);
};


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
    
        console.log(res);
       if(res.data._id){
        Cookies.set("ut",res.data.token, { expires: 10 }) ;
        Cookies.set('user', JSON.stringify(res.data));
        setUser(res.data);
        navigate("/profile");
       }else{
        setErr(res.data.message);
       }
      }catch(er){console.error(er);}
     
    
    
    }
    
  }

  return (
    <div className='max-w-[1640] p-4 flex justify-center items-center py-16'>

      <div className='w-[400px] p-5 bg-gray-100 shadow-2xl rounded-md m-10 '>
        <h1 className=' text-2xl font-bold text-sky-600 p-2'> Log in</h1>
        <div className=' space-y-2'> 
          <input onChange={(e) => { setEmail(e.target.value) }}
            value={email}
            className=' w-full outline-none px-3 p-2 rounded-md m-1 border'
            type='email' placeholder='Email' />

          <input onChange={(e) => { setPassword(e.target.value) }}
            value={password}
            className=' w-full outline-none px-3 p-2 rounded-md m-1  border'
            type='password' placeholder='Password' />

<div className="p-2">
      <CustomCheckbox checked={rememberMe} onChange={handleCheckboxChange} />
    </div>

{err&&<span className=' text-red-600 font-semibold'>{err}</span>}
          <button onClick={() => { OnLogin() }}
            className='rounded w-full text-center font-bold mt-2 bg-sky-500 hover:bg-sky-600 text-white  p-2'>
            Log in
          </button>

          <div className='flex items-center   text-sm'>
            <span>
              Forgot your password ? Reset your password<Link to=""
                className=' px-2 text-sky-600 font-semibold'>Here</Link>
            </span>
          </div>
          <div className='flex items-center justify-center py-1'>
            <span>
              you don't have account  ? <Link to="/register"
                className=' px-2 text-sky-600 font-semibold'>Register</Link>
            </span>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Login