import React, { useState ,useEffect} from 'react'
import Calendar from 'react-calendar';
import { MdAddCall } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import 'react-calendar/dist/Calendar.css';
import { FaHeart } from "react-icons/fa";
import { Cabstate } from '../Context/cabinatProvider';
import axios from 'axios';
import { addRDVRoute } from '../Routes/routes';
import { useNavigate } from 'react-router-dom';

export default function DoctorDashbord() {
const [date, setDate] = useState(new Date());
const{doctorSelected} =Cabstate();
const[isFabourite,setIsFabourite]=useState(false)
const {user} =Cabstate();
const navigate =useNavigate();

useEffect(() => {
  // Initialization tasks

  return () => {
      // Cleanup tasks (equivalent to onDestroy)
      console.log('Component unmounted');

      if(isFabourite){
        const doCseleId=doctorSelected._id;
        //const res = await axios();
      }
  };
}, []);



const onAddRDV =async()=>{
  if(user){
    try{
      const Patient=user._id;
      const Medecin=doctorSelected._id;
      //day & month
      const res= await axios.post(addRDVRoute,{Patient,Medecin,day:date.getDay(),month:date.getMonth()+1});
          console.log(res);
      
        }catch(err){console.log(err);}
  }else{
    navigate("/login");
  }
 
}


  return (
     <div className='max-w-[1640px] xl:px-52 p-10 bg-gray-300  h-full space-y-10'>

      <div className='space-x-5 space-y-5 md:flex '>
        <div className='md:w-2/3 bg-sky-50 p-4 rounded'>
       <div className=' flex space-x-3'>
          <img src='https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=600' alt=''
          className=' w-[150px] h-[150px]'/>
          <div className=' text-gray-700 w-full'>
             <h1 className='text-xl font-bold text-gray-900'>Dr. {doctorSelected.fullName}</h1>
             <h2 className='text-gray-700 text-xl' >{doctorSelected.Service}</h2>
             <p className='text-xl'>{doctorSelected.address}</p>
             <p className='text-sky-700'>{doctorSelected.email}</p>
             <div className=" flex sm:space-x-5  text-xl font-medium text-gray-900">
                <h1 className="">{doctorSelected.phon}</h1>
            <MdAddCall size={25} className=" text-sky-700 hover:bg-white hover:text-sky-800"/>
            <FaWhatsapp size={25} className=" text-sky-700 hover:bg-white hover:text-sky-800"/>
            </div>
            <div>
              <div className=' text-xl text-gray-900 flex space-x-3 '>
                <h1 className=' text-gray-700'>Monday <span className=' text-gray-700 '>/</span> friday </h1>
                <h1 className=' font-semibold  '>9:00 <span className=' text-gray-700 px-1'>--</span> 18:00</h1> 
              </div>

              <div className=' text-xl text-gray-900 flex space-x-3 '>
                <h1 className=' text-gray-700'>Saturday </h1>
                <h1 className=' font-semibold  '>9:00 <span className=' text-gray-700 px-1'>--</span> 12:45</h1> 
              </div>
            </div>
         </div>
         <div className='px-4 p-2 flex justify-end  text-gray-700  top-0 end-0'>
        <FaHeart size={25}  className={isFabourite&&" text-red-600"}
          onClick={()=>{!isFabourite? setIsFabourite(true):setIsFabourite(false)}} />
        </div>

    </div>
        </div>

      <div className='md:w-1/3 bg-gray-50 rounded-xl'>
    
      <h1 className=' bg-sky-600 font-semibold text-xl rounded-t-xl text-center p-2 text-white'>Rendez vous</h1>
      <div className=' p-2'>
      <h2 className='text-xl'>Calendar</h2>
      <Calendar
        onChange={(e)=>setDate(e)}
        value={date}
      />
      </div>
      <div className=' flex justify-between p-2'>
      {date && <p className='text-xl'>{date.toDateString().split(' ').slice(0, 4).join(' ')}</p>}

      <button className=' bg-sky-900 text-white p-1 rounded-md '
      onClick={()=>{onAddRDV()}}
      >+ RDV</button>
      </div>
      
   
     
          </div>

        </div>

     <div className='md: w-2/3 text-gray-700 bg-sky-50 p-5'>
            <h1 className=' text-xl font-meduim text-gray-900'>Information</h1>
            <div className='p-2'>
                <h1 className='font-semibold text-gray-800'>About Me</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                     assumenda temporibus, sequi aut voluptatum qui accusamus veritatis sit doloribus sapiente voluptatibus,
                     quisquam veniam. Repudiandae architecto blanditiis, assumenda veritatis perferendis mollitia!</p>
            </div>

            <div className='p-2'>
                <h1 className='font-semibold text-gray-800'>Education</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                     assumenda temporibus, sequi aut voluptatum qui accusamus veritatis sit doloribus sapiente voluptatibus,
                     quisquam veniam. Repudiandae architecto blanditiis, assumenda veritatis perferendis mollitia!</p>
            </div>

            <div className='p-2'>
                <h1 className='font-semibold text-gray-800'>Experince</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                     assumenda temporibus, sequi aut voluptatum qui accusamus veritatis sit doloribus sapiente voluptatibus,
                     quisquam veniam. Repudiandae architecto blanditiis, assumenda veritatis perferendis mollitia!</p>
            </div>

        </div>
      
    </div>
  )
}
