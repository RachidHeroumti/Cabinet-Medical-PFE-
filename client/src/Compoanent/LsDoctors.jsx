import { MdAddCall } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { getDoctorsRoute } from "../Routes/routes";

const LsDoctors=()=>{

    const[doctors,setDoctors]=useState([]);


    useEffect(() => {
        const getDoctors = async () => {
            console.log("getDoctors executed!")
            try {
                const res = await axios.get(getDoctorsRoute);
                if (res.data.Doctors) {
                    setDoctors(res.data.Doctors);
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
    
        
            getDoctors();
        
    }, []); 
    


    return(
        <div className=" " id="doctors">
            <div className="grid grid-cols-1 gap-6 py-12">
                 
   {
    doctors && doctors.map((item,i)=>{

    return  (  <div key={i} className="flex bg-sky-50">
        <img className="w-[200px] h-[250px] rounded m-2"
         src="https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=600" alt="profile"/>
        <div className=" space-y-2">
            <h1 className=" text-xl font-semibold text-gray-950">{item.fullName} </h1>
            <h3 className=" font-semibold ">Service : {item.Service} </h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p>   deleniti laboriosam voluptates ex architecto cumque, maiores accusamus! Asperiores, fugit.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p>   deleniti laboriosam voluptates ex architecto cumque, maiores accusamus! Asperiores, fugit.</p>
            <div className="flex space-x-1">
                <button className="rounded bg-sky-600 text-white px-2">8:00</button>
                <p className=" font-semibold text-gray-600">to</p>
                <button className="rounded bg-sky-600 text-white px-2">12:00</button>
                <p className=" font-semibold text-gray-600">And</p>
                <button className="rounded bg-sky-600 text-white px-2">2:00</button>
                <p className=" font-semibold text-gray-600">to</p>
                <button className="rounded bg-sky-600 text-white px-2">18:00</button>
            </div>
            <div className="flex space-x-1">
                
            </div>
            <div className=" flex justify-between">
                
            <div className=" flex sm:space-x-5 ">
                <h1 className="">0658794672</h1>
            <MdAddCall size={25} className=" text-sky-700 hover:bg-white hover:text-sky-800"/>
            <FaWhatsapp size={25} className=" text-sky-700 hover:bg-white hover:text-sky-800"/>
            </div>
            </div>
            
        </div>
    </div>)
    })
}
           
            </div>

        </div>
    )
}

export default LsDoctors ;