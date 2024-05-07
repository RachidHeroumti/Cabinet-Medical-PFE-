import React, { useEffect } from 'react'

function PatientDessier({setIs,patSearched}) {


     useEffect(()=>{

     },[])
  return (
    <div className=' flex justify-center p-4'>
           
        <div className='bg-gray-100 rounded shadow-md xl:w-[500px] md:w-[400px] p-2  space-y-2 '>
        <h1 className='text-xl text-end text-red-600 cursor-pointer' onClick={()=>{setIs(false)}}>X</h1>
            <div className='flex justify-center space-x-1 bg-sky-300 p-3'>
                <img src={patSearched.profile} alt='' className='w-[100px] h-[120px] rounded'/>
                <div className='text-xl'>
                    <h1 className=''>{patSearched.fullName}</h1>
                    <h1>CIN :{patSearched.CIN}</h1>
                    <h1>{patSearched.phon}</h1>
                </div>
            </div>

            <div className=' bg-gray-50 p-2'>
                <h1 className=' text-xl text-center '>Des RDVs</h1>
                <div className=' w-full'>
                    <h1>Dr. Ahmed ali </h1>
                    <p>Dr note :Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                         ipsam reiciendis dolorem vitae magnam veritatis.</p>
                         <h2 className=' text-end'>Date 12/05/2024</h2>
                </div>
            </div>

            <div className='bg-gray-50 p-2'>
            <h1 className=' text-xl text-center ' >Testes</h1>
                <div className=' w-full'>
                    <h1>test topic</h1>
                    <p>test result :Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                         ipsam reiciendis dolorem vitae magnam veritatis.</p>
                         <h2 className='text-gray-700 text-end'>labo name</h2>
                         <h2 className='text-gray-700 text-end'>Date 12/05/2024</h2>
                </div>
            </div>

        </div>
      
    </div>
  )
}

export default PatientDessier
