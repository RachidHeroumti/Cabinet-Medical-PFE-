import React, { useEffect, useState } from 'react'
import Departments from './Departments';
import { getDoctorsRoute, getPatientsRoute } from '../Routes/routes';
import axios from 'axios';
import { IoMdSearch } from "react-icons/io";
import { MdDelete } from "react-icons/md";




function DachbordAdmin() {
  const[isPatient,setIsPatient] =useState(false) ;
   const[docs,setDocs]=useState([]);
  useEffect(() => {
    const getDoctors = async () => {
        try {
          let res;
          if(isPatient){
            res = await axios.get(getPatientsRoute);
            console.log(res)
            if (res.data.Patients) {
              console.log(res.data)
                setDocs(res.data.Patients);
            }
          }else{
            res = await axios.get(getDoctorsRoute);
            if (res.data.Doctors) {
              console.log(res.data)
                setDocs(res.data.Doctors);
            }
          }
           
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    
        getDoctors();
    
}, [isPatient]); 


  return (
    <div className='  p-5 bg-gray-200 '>
      <div className=' flex p-5 bg-gray-200 space-x-4 '>

      <div className='  p-4  w-[250px] rounded-xl shadow-md   bg-sky-700'>
         <h1 className=' text-xl font-bold italic text-sky-50 text-center py-2'>Dachbord Admin </h1>
         <div className=' space-y-1 flex flex-col h-full text-white '>

            <a  className='p-2 shadow hover:bg-sky-400 rounded  active:bg-sky-200' onClick={()=>{setIsPatient(false)}}>Les medecines</a>
            <a  className='p-2  shadow hover:bg-sky-400 rounded' onClick={()=>{setIsPatient(true)}}>Les Patients</a>
            <a href='#departments' className='p-2  shadow hover:bg-sky-400 rounded'>Departmets</a>
            <a href='' className='p-2  shadow hover:bg-sky-400 rounded'>Les labolatoires</a>
            <a href='' className='p-2  shadow hover:bg-sky-400 rounded'>Les analytics</a>

         </div>
      </div>


     
    <div className=' w-full bg-white rounded-xl h-[700px] '>
    <div className=' flex justify-end p-2 bg-sky-700 rounded-t-xl'>
  
                    <div className=" flex bg-white hover:bg-gray-200 border  items-center rounded-3xl p-2  ">
                    <IoMdSearch size={25} className=" text-sky-800  "/>
                         <input type="text" placeholder="Search for User By CIN " 
                           className=" rounded outline-none bg-transparent  "
                           />
                          </div>
                    </div>

     <div className='grid grid-cols-1 gap-3 grid-rows-5'> 
        <div className=' flex justify-between font-bold text-gray-700 bg-gray-100 p-2 rounded-t-xl ' >
          <h1 className='w-full'>Nom et Prenom</h1>
          <h1 className='w-full'>{!isPatient? "Medical Lisence Number" :"CIN" }</h1>
          <h1 className='w-full'>{!isPatient? "Departement" :"Date Naissance" }</h1>
          <h1 className='w-full'>{!isPatient? "Specialite" :"Email" }</h1>
          <h1 className='w-full'>Action</h1>
          
        </div>


   { docs&&docs.map((item,i)=>{
 return(
  <div key={i} className=' flex justify-between shadow p-2 '>
          <h1 className='w-full'>{item.fullName}</h1>
          <h1 className='w-full'>{isPatient? `${item.nationalId}`:`M25648`}</h1>
          <h1 className='w-full'>{isPatient? `10/12/2014`:`${item.Departement?.name}`}</h1>
          <h1 className='w-full'>{isPatient? `${item.email}`:`${item.Service}`}</h1>
          <div className='w-full  '>
            <button className='rounded-xl bg-gray-300 px-2 p-1 hover:bg-slate-400'>Delete</button>
               </div>   
        </div>
 )
   })
        }

        </div>

    </div> 
      </div>
      
    </div>
  )
}

export default DachbordAdmin
