import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { FaCommentMedical } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getDoctorsRoute } from "../Routes/routes";
import { Cabstate } from "../Context/cabinatProvider";
import axios from "axios";
import Messages from "../componentChat/Messages";
import { AiOutlineMessage } from "react-icons/ai";



const Hero =()=>{
const navigate =useNavigate();
const[searchTxt,setSershText]=useState("");
const[docs,setDocs]=useState([]);
const[Searchdocs,setSearchDocs]=useState([]);
const[searchBy,setSearchBy]=useState("Name");
 const{doctorSelected,setDoctorSelected}=Cabstate();
 const[isMsg,setMsg]=useState(false);

useEffect(() => {
    const getDoctors = async () => {
        try {
            const res = await axios.get(getDoctorsRoute);
            if (res.data.Doctors) {
                setDocs(res.data.Doctors);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    
        getDoctors();
    
}, []); 

useEffect(() => {
    if(docs){
        if(searchBy==="Name"){
            if(searchTxt){
            setSearchDocs(
                docs.filter((item) => {
                    const itemName = item.fullName.toLowerCase();
                    const txtSTolwr=searchTxt.toLowerCase()
                    return itemName.startsWith(txtSTolwr);
                })
            )}

        }else if(searchBy==="Department"){
            if(searchTxt){
            setSearchDocs(
                docs.filter((item) => {
                    const itemName = item.Departement.name.toLowerCase();
                    const txtSTolwr=searchTxt.toLowerCase()
                    return itemName.startsWith(txtSTolwr);
                })
            );}
        }else{
            if(searchTxt){
            setSearchDocs(
                docs.filter((item) => {
                    const itemName = item.Service.toLowerCase();
                    const txtSTolwr=searchTxt.toLowerCase()
                    return itemName.startsWith(txtSTolwr);
                })
            );}
        }
        }

}, [searchTxt, searchBy,docs]);

 const onGoToDoctorInfo=(item)=>{
    setDoctorSelected(item);
    navigate("/dashbord/doctor");
    return ;
 }

const onSetMessage=(is)=>{
 setMsg(is);
}

    return(
        <div >

<div id="home" className=" flex flex-col justify-center overflow-visible pt-16 bg-sky-400 h-[300px]">
  <div className=" flex   flex-col w-full p-4 justify-center items-center space-y-2">
         <h1 className="text-center text-sky-800 text-3xl font-bold p-4">Cabinet Medical </h1>
         <p className="p-2 text-center px-12">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Facere, vitae quas? Repellendus odio, 
                        eaque veniam nostrum dolore sed animi fugiat, 
                        libero aliquid delectus quia dolor facere quam ad dolorem vero</p>

         <div className=" rounded-md md:w-3/2 xl:w-1/2 space-x-5 space-y-1 flex items-center justify-between  
                         bg-white  border border-md border-gray-800 p-1">

                        <div className="flex border-md  border-e  border-gray-800  bg-white ">
                        <IoMdSearch size={30} className=' text-gray-800'/>
                        <input className=" outline-none p-1 bg-transparent px-3"
                        type="text"
                        value={searchTxt}
                        onChange={(e)=>{setSershText(e.target.value)}}
                        placeholder="Search for doctor By"
                        />
                        </div>
                      
                        <select  value={searchBy} onChange={(e)=>{setSearchBy(e.target.value)}}
                         className=" outline-non p-1 bg-transparent border-e border-gray-800 ">
                            <option>Name</option>
                            <option>Department</option>
                            <option>Speciality</option>

                        </select>
                        <select className=" outline-non p-1 bg-transparent  ">
                            <option>Select City</option>
                            <option>Agadir</option>
                            <option>Rabat</option>
                            <option>Casabalnca</option>
                            <option>tanger</option>
                            <option>Marrakech</option>
                            <option>Asafi</option>
                            <option>fes</option>

                        </select>

                       

                        </div> 

 
   </div>

   <div className=" flex justify-center relative w-full ">
      {searchTxt&&Searchdocs.length>=1&& <div className="absolute top-0 w-1/2  ">
            
            <div className=" bg-gray-100 rounded-xl  p-2  space-y-1 w-full">
        
              { Searchdocs&& Searchdocs.map((item,i)=>{
             return(
                <div key={i} 
                 onClick={()=>{onGoToDoctorInfo(item)}}
                className=" text-gray-700 flex  hover:bg-slate-200 p-2 space-x-2 cursor-pointer">
                <img src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600" alt="doctorPic"
                  className=" rounded-full w-[50px] h-[50px] "/>
                  <div>
                  <h1 className=" text-xl text-gray-900">Dr. {item.fullName}</h1>
                   <h1>{item.address}</h1>
                 </div>
            </div>)
        
            })
        }
           
            </div>
           </div>}
   </div>



</div>





   {isMsg && <div className="z-50 fixed top-10 rounded-sm end-0  h-[70%] "> 
    <Messages />
   </div>}


 { 
  <AiOutlineMessage size={45} onClick={()=>{ onSetMessage(!isMsg)}} className=" fixed bottom-10 end-10 text-sky-900"/>
}
    
</div>
    )
}

export default Hero ;