import React, { useEffect, useState } from 'react'
import { getPatTestsRoute, getPatientRDVRoute } from '../Routes/routes'
import axios from 'axios'

function PatientDessier({setIs,patSearched}) {

    const[patRdvs,setMyRDVs]=useState([])
    const[patTests,setMyTests]=useState([])

     useEffect(()=>{

        const getDessierPatient=async()=>{
            try{
                
                if(patSearched){
                    const userId=patSearched._id;
                    
                    const resRDVs = await axios.get(`${getPatientRDVRoute}/${userId}`);
                    const resTests = await axios.get(getPatTestsRoute,{userId});
                    console.log(resRDVs);
        
                    if(resRDVs.data.MyRdvs){
                        setMyRDVs(resRDVs.data.MyRdvs);
                    }
                    if(resRDVs.data.tests){
                        setMyTests(resTests.data.tests);     
                    }
                    
                }
                else {
                  console.log("patient not existe !");
                }
                
                }catch(err){console.log(err);}
        }

        getDessierPatient();

     },[])
  return (
    <div className=' flex justify-center  p-4'>
           
        <div className='bg-gray-100 rounded shadow-md xl:w-[700px] md:w-[400px] p-2  space-y-2 '>
        <h1 className='text-xl text-end text-red-600 cursor-pointer' onClick={()=>{setIs(false)}}>X</h1>
            <div className='flex justify-center space-x-1 bg-sky-300 p-3'>
                <img src={patSearched.profile} alt='' className='w-[100px] h-[120px] rounded'/>
                <div className='text-xl'>
                    <h1 className=''>{patSearched.fullName}</h1>
                    <h1>CIN :{patSearched.CIN}</h1>
                    <h1>{patSearched.phon}</h1>
                </div>
            </div>

       <div className=' flex justify-between'>

       <div className=''>
      <div className=' bg-gray-50 p-2 space-y-1'>
                <h1 className=' font-bold text-xl'>Des RDVs</h1>
              { 
              patRdvs&& patRdvs.map((item,i)=>{
                return(
                    <div key={i} className=' w-full bg-sky-200 p-1'>
                    <h1 className='text-gray-950 font-medium'>Dr. {item.Medecin.fullName} </h1>
                         <h2 className=' text-end'>Date : {item.dateRdv}</h2>
                   </div>
                )
              })
             }
            </div>

            <div className='bg-gray-50 p-2'>
            <h1 className=' font-bold text-xl' >Testes</h1>
                <div className=' w-full bg-sky-100 p-1'>
                    <h1>test topic</h1>
                    <p>test result :Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                         ipsam reiciendis dolorem vitae magnam veritatis.</p>
                         <h2 className='text-gray-700 text-end'>labo name</h2>
                         <h2 className='text-gray-700 text-end'>Date 12/05/2024</h2>
                </div>
            </div>
      </div>

        <div className=' p-3 space-y-1 '>
            <h1 className=' font-bold text-xl'>Les notes des Medcin</h1>
            <div className=' rounded border p-1 bg-sky-100'>
                <h1 className=' font-semibold'>Dr. Ahmed allawi</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsam sint, reprehenderit sequi qui quis molestias.</p>
            </div>
            <div className=' rounded border p-1 bg-sky-100'>
                <h1 className=' font-semibold'>Dr. Ahmed allawi</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsam sint, reprehenderit sequi qui quis molestias.</p>
            </div>
        </div>

       </div>
     
           


        </div>
       
      
    </div>
  )
}

export default PatientDessier
