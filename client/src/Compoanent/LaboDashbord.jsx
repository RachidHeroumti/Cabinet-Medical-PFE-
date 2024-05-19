import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Cabstate } from '../Context/cabinatProvider';
import axios from 'axios';



export default function LaboDashbord() {

    const[testSearch,settestSearch]=useState("");
    const[isToaddtest,setIstoAddtest]=useState(false)
    const[cinPatiet,setCinPatient]=useState("");
    const[testTitle,setTestTitle]=useState("");
    const[testResult,setTestresult]=useState("");


    const{user} =Cabstate();


 const onAddTest=async()=>{
    

    try{
        if(testResult&&cinPatiet&&testTitle){
            //const res= await axios.post(,{});

        }

    }catch(err){console.log(err)}





    setIstoAddtest(false);
 }

  return (
    <div className=' bg-white'>
        <div className='flex bg-sky-900 h-[200px]'>

        </div>
        <div className='bg-white '>
                <div className='flex justify-between p-4 items-center'>
                    <h1 className=' font-bold text-xl  text-sky-950 '>Testes</h1>
                    <div className=' flex '>
                    <div className=" flex bg-white hover:bg-gray-200 border items-center rounded-full p-2  ">
                         <input type="text" placeholder="Search for Test By patient " 
                           className=" rounded outline-none bg-transparent  "
                           />
                           <IoMdSearch size={25} className=" text-sky-900  "/>
                          </div>

                          <button className=" bg-sky-600 text-white  rounded-3xl  px-2 font-semibold m-1"
                         onClick={()=>setIstoAddtest(true)} 
                           >+ Add</button>
                    </div>

                </div>

                <div className=' grid grid-cols-5 bg-gray-100 text-sky-700 font-bold p-2 border'>

                    <h1>Title</h1>
                    <h1>Patiten</h1>
                    <h1>Date</h1>
                    <h1>Status</h1>
                    <h1>Action</h1>

                </div>

                <div className=' grid grid-cols-5  text-gray-950 font-meduim p-2 border'>

                 <h1>test medical about </h1>
                 <div>
                    <h2>Ahmed hassan</h2>
                    <h2>j54756</h2>
                 </div>
                 <h1>12/05/2024</h1>
                 <h1 className='text-green-700'>Complite</h1>
                 <div className='flex space-x-1'>
                 <MdDelete size={25} className=' text-sky-950 hover:text-sky-900' />
                 <FaEdit  size={25} className=' text-sky-950 hover:text-sky-900'/>
                 </div>
                 </div>

            </div>
            {isToaddtest&&<div className=" z-50 w-full bg-black/80 fixed top-0 end-0 h-screen "></div>}
            {isToaddtest&&<div className=" z-50 fixed top-0  end-0 start-0 ">
                <div className=' flex justify-center items-center h-screen '>
                    <div className=' bg-white border rounded p-5  w-[300px] space-y-2'>
                        <div className=' flex justify-between'>
                        <h1 className='text-xl p-2 font-medium text-sky-950'>Test</h1>
                        <h1 className='text-xl p-2 font-medium text-red-600 cursor-pointer' onClick={()=>{setIstoAddtest(false)}}>X</h1>
                        </div>
                      
                        <div className=' space-y-2 w-full'>
                        <input type='text' placeholder='CIN de Patient ' 
                            className=' outline-none p-1 rounded border bg-transparent '/><br></br>
                            <input type='text' placeholder='test title ' 
                            className=' outline-none p-1 rounded border bg-transparent '/><br></br>
                        
                              <textarea type='text' placeholder='test resulte ' 
                            className=' outline-none w-full p-1 rounded border bg-transparent '/>
                           
                        </div>
                        <button className=' bg-sky-600 text-white p-1 font-semiblod w-full rounded'
                         onClick={()=>{onAddTest()}}
                        >Add</button>
                    </div>

                </div>
                 </div>}
       </div>
  )
}
