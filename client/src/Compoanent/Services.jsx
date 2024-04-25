import { useEffect, useState } from "react";
import { FaBookMedical } from "react-icons/fa6";
import { AllServices } from "../data/data";
const Services =()=>{
    const[services,setServices]=useState([]);
    const[showAll,setShowAll]=useState(false);

    useEffect(()=>{
        if(!showAll){
            const srvs=AllServices.slice(0,4);
            setServices(srvs);
        }else{
            setServices(AllServices);
        }
    },[showAll]);

    return(
       <div className=" max-w-[1640px] p-14" id="services">
         <h1 className=" text-2xl font-bold text-center p-4">Our Services</h1>
        <div className=" grid grid-cols-2 sm:grid-cols-4 gap-6 p-5">

       {   services&& services.map((item,i)=>{
        return (
     <div key={i} className=" rounded-sm flex flex-col items-center p-4 bg-sky-50 hover:bg-sky-100 space-y-2">
            <FaBookMedical size={50} className=" text-sky-400 " />
            <h1 className=" text-xl text-center">{item}</h1>
            <p className=" text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil expedita optio asperiores harum eveniet,
                </p>
            </div>
        )
       })  }
           
        </div>
        <div className=" flex items-center justify-center p-5">
        <button className=" text-gray-100 rounded-full p-1 px-3 bg-sky-600 " onClick={()=>{
            showAll ?setShowAll(false):setShowAll(true)
        }}>{!showAll ? "View More Services" : "View less"}</button>
        </div>
    
       </div> 
    )
}
export default Services ;