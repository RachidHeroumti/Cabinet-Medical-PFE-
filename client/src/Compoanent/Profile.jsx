import { useEffect ,useState} from "react";
import Cookies from "js-cookie"
const Profile=()=>{
    const[user,setUser] =useState("");


    useEffect(()=>{
        const cookieValue = Cookies.get('user');
       cookieValue ? setUser(JSON.parse(cookieValue) ): setUser(null);
        
    },[])



    return(
        <div className="p-4">
            <div className="flex ">
                <img src="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600" alt="pic-profile"
                 className=" rounded w-[200px] h-[250px]"/>
                 <div className="px-2 text-xl font-semibold text-gray-950 space-y-2">
                    <h1 className=" text-sky-800 font-bold">{user.fullName}</h1>
                    <h2 className="">{user.email}</h2>
                    <h3 className="" >CIN : JB54827</h3>
                 </div>

            </div>
            <div className="py-4">
                <h1 className=" text-sky-900 font-bold text-center bg-sky-100  p-2 rounded">Les Rendez-vous</h1>
                <h2 className=" text-center text-gray-600 p-5">No appoinment yet !</h2>
            </div>
            <div className="py-4">
                <h1 className=" text-sky-900 font-bold text-center bg-sky-100  p-2 rounded">Les Testes</h1>
                <h2 className=" text-center text-gray-600 p-5">No test yet !</h2>
            </div>
        </div>
    )
}

export default Profile;