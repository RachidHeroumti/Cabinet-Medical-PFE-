import { useEffect, useState } from "react";
import { FaBookMedical } from "react-icons/fa6";
import { AllServices } from "../data/data";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { FaSuitcaseMedical } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";




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

    
    const iconMap = [
        FaUserDoctor,
         FaBookMedical,
         LiaNotesMedicalSolid,
        FaSuitcaseMedical,
        FaUserDoctor
      ]


    return(
       <div className=" max-w-[1640px] pt-16 pb-3 bg-sky-50 " id="services">
         <h1 className=" text-2xl font-bold text-center p-4">Our Services</h1>
        <div className=" flex p-3 justify-center  space-x-4">

       {   services&& services.map((item,i)=>{
         const IconComponent = iconMap[i];
        return (
     <div key={i} className=" rounded-sm w-[200px] flex flex-col items-center p-5 bg-sky-50 hover:bg-sky-100 space-y-2 ">
            <IconComponent size={50} className=" text-sky-600 " />
            <h1 className="  text-center font-bold ">{item}</h1>
            <p className=" text-center">
                </p>
            </div>
        )
       })  }
           
        </div>
        <div className=" flex items-center justify-center p-5">
      { /* <button className=" text-gray-100 rounded-full p-1 px-3 bg-sky-600 " onClick={()=>{
            showAll ?setShowAll(false):setShowAll(true)
        }}>{!showAll ? "View More Services" : "View less"}</button>**/}
        </div>
    
       </div> 
    )
}
export default Services ;