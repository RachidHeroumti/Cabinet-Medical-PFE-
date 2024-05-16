import { FaClinicMedical } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import { Cabstate } from "../Context/cabinatProvider";
import { FaCommentMedical } from "react-icons/fa";
import Cookies from "js-cookie"


const NavBar =()=>{
  const[logState,setLogState]=useState("Login");
  const{user,setUser}=Cabstate();
  const navigate =useNavigate();
 const[isNotify,setIsnotfiy]=useState(false);



    
    const goToProfile=()=>{
        if(user){
            navigate("/profile");
        }else{
            navigate("/login");
        }
    }

    const handleShowNotification = () => {
        if (Notification.permission === 'granted') {
          new Notification('Hello', { body: 'This is a notification!' });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification('Hello', { body: 'This is a notification!' });
            }
          });
        }
      };


    return(
        <div className=" max-w-full fixed top-0 w-full flex justify-between shadow  bg-sky-400 text-sky-900  p-4  ">
            <div className=" flex space-x-2">
            <FaClinicMedical size={30} className=" text-sky-700"/>
            <h2 className=" text-2xl font-bold">Doctori</h2>
            </div>

            <div className=" flex space-x-10 font-semibold  text-sky-900 ">
                <a href="#home" className="hover:text-sky-950"
                 onClick={()=>{navigate("/#home")}}                
                >Home</a>
               
                <h1 className="hover:text-sky-950 cursor-pointer" onClick={()=>{goToProfile()}}>Profile</h1>

                <a href="#about" className="hover:text-sky-950"
                 onClick={()=>{navigate("/#about")}}   
                >About us</a>
              {  //<IoIosNotifications onClick={()=>{handleShowNotification()}} size={25}  className="hover:text-sky-950"/>
              }
              
                <h1 className="hover:bg-sky-900 bg-sky-700 cursor-pointer text-white rounded-md px-1" 
                onClick={()=>{navigate("/register")}}>{logState}/Register</h1>
            </div>
           
           


        </div>
    )
}

export default NavBar