import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ImgHero from "../Images/picHome.jpg"
import { IoMdSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { getDoctorsRoute } from "../Routes/routes";
import { Cabstate } from "../Context/cabinatProvider";
import axios from "axios";



const Hero =()=>{
const navigate =useNavigate();
const[searchTxt,setSershText]=useState("");
const[docs,setDocs]=useState([]);
const[Searchdocs,setSearchDocs]=useState([]);
const[searchBy,setSearchBy]=useState("Name");
 const{doctorSelected,setDoctorSelected}=Cabstate();

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

    return(
        <div>

<div id="home" className=" flex flex-col justify-center overflow-visible pt-16">
  <div className=" flex   flex-col w-full p-4 justify-center items-center space-y-2 bg-sky-200">
         <h1 className="text-center text-sky-700 text-3xl font-bold p-4">Cabinet Medical </h1>
            
                <p className="p-2 text-center px-12">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Facere, vitae quas? Repellendus odio, 
                        eaque veniam nostrum dolore sed animi fugiat, 
                        libero aliquid delectus quia dolor facere quam ad dolorem vero</p>

                        <div className=" rounded-sm md:w-3/2 xl:1/2 space-x-5 space-y-1 flex items-center justify-between bg-white  border border-gray-800 p-1">
                    

                        <div className="flex border-e border-gray-800  bg-white ">
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
                            <option>Specailist</option>

                        </select>
                        <select className=" outline-non p-1 bg-transparent  ">
                            <option>Agadir</option>
                            <option>rabat</option>
                            <option>fes</option>

                        </select>

                       

                    </div> 
   </div>

  {searchTxt&& <div className=" w-full items-center justify-center   flex z-50">
    <div className=" bg-gray-100 rounded-xl  p-2 w-1/2 space-y-1 ">
{
    Searchdocs&& Searchdocs.map((item,i)=>{
     return(
        <div key={i} 
         onClick={()=>{onGoToDoctorInfo(item)}}
        className=" text-gray-700 flex  hover:bg-slate-200 p-2 space-x-2 cursor-pointer">
        <img src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600" alt="doctorPic"
          className=" rounded-full w-[50px] h-[50px] "/>
          <div>
          <h1 className=" text-xl text-gray-900">Dr. {item.fullName}</h1>
           <h1>Agadir 154 rue elhay</h1>
         </div>
    </div>)

    })
}
   
    </div>
   </div>}

</div>



</div>
    )
}

export default Hero ;