import React, { useState } from 'react'

function Departments() {
const[isToaddDep,setIsToaddDep]=useState(true)

  return (
    <div id='departments' className='flex justify-end  bg-gray-200 p-5  space-x-3'>
       <div className=' grid grid-cols-1 gap-2 bg-white shadow-sm rounded-xl h-fit'>
       <div className=' flex  text-gray-800 bg-sky-100 border p-2 rounded-md  font-semibold space-x-5'>
            <h1>Department Name</h1> 
            <h1>Medcin Number</h1> 
         </div>
         <div className=' flex  border p-2 rounded-md   space-x-5'>
            <h1 className=' w-full'>Department topic</h1> 
            <h1 className=' w-full'>14</h1>
         </div>
      
       </div>


     { isToaddDep&& <div className="p-2 space-y-2 space-x-2 rounded bg-white shadow-sm"> 
                <h1 className="text-2xl font-bold">Add Departments</h1>
                <input type="text" placeholder="Department Name" className="outline-none p-1 px-2 rounded-sm bg-bg-gray-300 hover:bg-gray-100"/>
                <div className=" grid grid-cols-2  gap-3 ">
                    {[1, 2, 3, 4].map((index) => (
                        <input key={index} type="text" placeholder={`specialiste ${index}`} className="outline-none p-1 px-2 rounded-sm bg-bg-gray-300 hover:bg-gray-100"/>
                    ))}
                </div>
                <button className="m-2 bg-sky-400 rounded-xl text-xl p-1 w-full hover:bg-sky-600">Add</button>
            </div> }
    </div>
  )
}

export default Departments
