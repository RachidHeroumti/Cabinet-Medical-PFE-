import React, { useEffect, useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Cabstate } from '../Context/cabinatProvider';
import axios from 'axios';
import { BsHospital } from "react-icons/bs";
import { addTesteRoute, getTesteRoute, getUserBycinRoute } from '../Routes/routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function LaboDashbord() {

    const[testSearch,settestSearch]=useState("");
    const[isToaddtest,setIstoAddtest]=useState(false)
    const[cinPatient,setCinPatient]=useState("");
    const[testTitle,setTestTitle]=useState("");
    const[testResult,setTestresult]=useState("");
    const[alltestes,setAllTest]=useState([]);
    const[patientToaddTestId,setPatToaddTestId]=useState("");

    const{user} =Cabstate();



    const toastOption = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };


      useEffect(()=>{
        const getTestes=async()=>{
            try{
                const res = await axios.get(getTesteRoute);
                if(res.data.testes){
                    setAllTest(res.data.testes);
                }

            }catch(err){console.log(err)}
        }
        getTestes();
      },[]);



 const GetPtientByCin=async(cin)=>{
        try{
       const nationalId=cin.toString();
       const res = await axios.get(`${getUserBycinRoute}/${nationalId}`);
          if(res.data._id){
           setPatToaddTestId(res.data._id);
          }
        }catch(err){ console.log(err)}
       }


     


 const onAddTest=async()=>{
    
    
    try{
        console.log(cinPatient,testTitle);

        if(testResult&&cinPatient&&testTitle){
            GetPtientByCin(cinPatient);
            
            console.log(patientToaddTestId);
            if(patientToaddTestId){  
                console.log(patientToaddTestId);
                const res= await axios.post(addTesteRoute,{Patient:patientToaddTestId,testSubject:testTitle,TestResult:testResult,laboName:"labo rasbi"});
                console.log(res);
                if(res.data.testAd){
                    setIstoAddtest(false);
                    toast.success("added successfuly",toastOption);
                }
            
            }
                 

        }else{toast.error("all information required")}

    }catch(err){console.log(err)}





    setIstoAddtest(false);
 }

 const onDeleteTest =(item)=>{
    const MyTestes=alltestes;
    try{
    // const res = await axios.get(`${deletRDVRoute}/${item._id}`);
         //console.log(res);
      setAllTest(
        MyTestes.filter((it)=>{
          return it._id!== item._id;
        })
       )
    }catch(err){console.log(err);}
     h
 }
  return (
    <div className=' bg-white'>
        <div className='flex  bg-sky-900 h-[200px] justify-center items-center p-4'>
       
            <BsHospital size={100} className=' text-sm text-white'/>
            <div className='p-2'>
            <h1 className=' text-xl text-white px-2'>Le nom de laboratoire </h1>
            <h1 className=' text-gray-100'>Location : <span>Hay salam agadir</span> </h1>
            <h2></h2>
            </div>
          

        </div>
        <div className='bg-white '>
                <div className='flex justify-between p-4 items-center'>
                    <h1 className=' font-bold text-xl  text-sky-950 '>Testes</h1>
                    <div className=' flex '>
                    <div className=" flex bg-white hover:bg-gray-200 border border-sky-800 items-center rounded-3xl p-2  ">
                         <input type="text" placeholder="Search for Test By patient " 
                           className=" rounded outline-none bg-transparent  "
                           />
                           <IoMdSearch size={25} className=" text-sky-900 " 
                            value={testSearch}
                            onChange={(e)=>{settestSearch(e.target.value)}}
                           />
                          </div>

                          <button className=" bg-sky-600 text-white  rounded-3xl  px-2 font-semibold m-1"
                         onClick={()=>setIstoAddtest(true)} 
                           >+ Add</button>
                    </div>

                </div>

                <div className=' grid grid-cols-6 bg-gray-100 text-sky-700 font-bold p-2 border'>

                    <h1>Title</h1>
                    <h1>Patiten</h1>
                    <h1>CIN</h1>
                    <h1>Date</h1>
                    <h1>Status</h1>
                    <h1>Action</h1>

                </div>



                {alltestes&&alltestes.map((item,i)=>{
                    return(
                        <div key={i} className=' grid grid-cols-6   font-meduim p-2 px-4 text-black border'>
                        <h1>{item.testSubject}</h1>
                        
                           <h2>{item.Patient.fullName}</h2> 
                           <h2>{item.Patient.nationalId}</h2>
                        
                        <h1>{new Date(item.createdAt).getDate()}/{new Date(item.createdAt).getMonth() + 1}/{new Date(item.createdAt).getFullYear()}</h1>
                        <h1 className='text-green-700'>Normale</h1>
                        <div className=' space-x-2 flex'>
            <button className='rounded-xl bg-gray-300 p-2 hover:bg-slate-400'>Edit</button>
            <button className='rounded-xl bg-gray-300 p-2 hover:bg-slate-400' onClick={()=>{onDeleteTest(item)}}>Delete</button>
               </div> 
                        </div>
                    )
                })
                   
                 }










            </div>
            {isToaddtest&&<div className=" z-50 w-full bg-black/80 fixed top-0 end-0 h-screen "></div>}
            {isToaddtest&&<div className=" z-50 fixed top-0  end-0 start-0 ">
                <div className=' flex justify-center items-center h-screen '>
                    <div className=' bg-white border rounded p-5  w-[500px] space-y-2'>
                        <div className=' flex justify-between'>
                        <h1 className='text-xl p-2 font-medium text-sky-950'>Test</h1>
                        <h1 className='text-xl p-2 font-medium text-red-600 cursor-pointer' onClick={()=>{setIstoAddtest(false)}}>X</h1>
                        </div>
                      
                        <div className=' space-y-2 w-full'>
                        <input type='text' placeholder='CIN de Patient '
                        value={cinPatient} 
                        onChange={(e)=>{setCinPatient(e.target.value)}}
                            className=' outline-none p-1 rounded border bg-transparent '/><br></br>

                            <input type='text' placeholder='test title ' 
                            className=' outline-none p-1 rounded border bg-transparent '
                            value={testTitle} 
                            onChange={(e)=>{setTestTitle(e.target.value)}} 
                            /><br></br>
                        
                            <textarea type='text' placeholder='test resulte ' 
                            className=' outline-none w-full p-1 rounded border bg-transparent '
                            value={testResult} 
                            onChange={(e)=>{setTestresult(e.target.value)}}
                            />
                           
                        </div>
                        <button className=' bg-sky-600 text-white p-1 font-semiblod w-full rounded'
                         onClick={()=>{onAddTest()}}
                        >Add</button>
                    </div>

                </div>
                 </div>}

                 <ToastContainer />
       </div>
  )
}
