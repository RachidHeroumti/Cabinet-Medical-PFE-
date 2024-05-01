import { useEffect ,useState} from "react";
import { Cabstate } from "../Context/cabinatProvider";
import { IoMdSearch } from "react-icons/io";
const Profile=()=>{
    const {user} =Cabstate();
    const [isAdmin,setIsAdmin]=useState(false);
    const[isMedecin,setIsMedecin]=useState(false);

  useEffect(()=>{
    if(user){
        if(user.isAdmin)setIsAdmin(true);
        else if(user.isMedecin) setIsMedecin(true);
        
    }
  },[user])



    return(
        <div className="p-4">
            <div className="flex ">
                <img src="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600" alt="pic-profile"
                 className=" rounded w-[100px] h-[150px]"/>
                 <div className="px-2 text-xl font-semibold text-gray-950 space-y-2">
                    <h1 className=" text-sky-800 font-bold">{user.fullName}</h1>
                    <h2 className=" text-sky-300">{user.email}</h2>
                    <h3 className="" >CIN : JB54827</h3>
                    <h3 className="" >0655986742</h3>
                 </div>
                 {isMedecin&&<div className=" flex justify-end w-full">
                    <div className="  ">
                    <IoMdSearch size={30} className=' text-gray-800'/>
                        <input className="p-1 px-2 bg-gray-300 outline-none rounded"
                         type="text" placeholder="Search for Patient"/>
                  </div>
                 </div>

                 }

            </div>

            <div className="flex  space-x-2  flex-col">

            <div className="py-4  ">
                <h1 className=" text-sky-900 font-bold text-center bg-sky-100  p-2 rounded">Les Rendez-vous</h1>
                <h2 className=" text-center text-gray-600 p-5">No appoinment yet !</h2>
            </div>

            <div className="py-4 ">
                <h1 className=" text-sky-900 font-bold text-center bg-sky-100  p-2 rounded">Les Testes</h1>
                <h2 className=" text-center text-gray-600 p-5">No test yet !</h2>
            </div>

            </div>
           
        </div>
    )
}

export default Profile;