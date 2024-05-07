import { useEffect ,useState} from "react";
import { Cabstate } from "../Context/cabinatProvider";
import { IoMdSearch } from "react-icons/io";
import { MdAddCall, MdSearchOff } from "react-icons/md";
import axios from "axios";
import { getPatTestsRoute, getPatientRDVRoute, getUserBycinRoute, getdocRDVRoute } from "../Routes/routes";
import { useNavigate } from "react-router-dom";
import { MdMode,MdDelete } from "react-icons/md";
import PatientDessier from "./PatientDessier";








const Profile=()=>{
    const {user} =Cabstate();
    const [isAdmin,setIsAdmin]=useState(false);
    const[isMedecin,setIsMedecin]=useState(false);
    const navigate =useNavigate();
    const[MyRDVs,setMyRDVs]=useState([]);
    const[Mytests,setMyTests]=useState([]);
    const[txtSearchCIN,setTextSearchCIN]=useState("")
    const[patSearched,setPatsearched]=useState([])
    const[isPatDessier,setIsPatDessier]=useState(false)

  useEffect(()=>{
    if(user){
        if(user.isAdmin)setIsAdmin(true);
        else if(user.isMedecin) setIsMedecin(true);  
    }else{navigate("/");}
  },[user])



  useEffect(()=>{
    const getRDVs_Tests=async()=>{
      try{
        if(!isMedecin){

            const userId=user._id;
           
            const resRDVs = await axios.get(getPatientRDVRoute,{userId});
            const resTests = await axios.get(getPatTestsRoute,{userId});

            if(resRDVs.data.MyRdvs){
                setMyRDVs(resRDVs.data.MyRdvs);
            }
            if(resRDVs.data.tests){
                setMyTests(resRDVs.data.tests);     
            }
            
        }
        else{
            const resRDVs = await axios.get(getdocRDVRoute,{userId:user._id});
        }
        
        }catch(err){console.log(err);}
    }
    getRDVs_Tests();
  },[user]);

const GetPtientByCin=async()=>{
 try{
const nationalId=txtSearchCIN.toString();
console.log(nationalId);
const res = await axios.get(`${getUserBycinRoute}/${nationalId}`);
  console.log(res);
   if(res.data._id){
    setPatsearched(res.data._id);
    setIsPatDessier(true);
   }

 }catch(err){ console.log(err)}
}
    return(
        <div className="">
            {isAdmin&&
             <div className="">
                <div className="p-4 bg-sky-300 flex justify-center items-center">
                    <img src="https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=600" alt="picAdmin" 
                    className="rounded h-[100px] w-[100px]"/>
                    <div className="p-2">
                        <h2 className="text-xl font-bold text-gray-950">Administaration</h2>
                        <h1 className="">{user.fullName}</h1>
                    </div>
               </div>

               <div className=" flex justify-between  space-x-10 p-4">
               <div className=" p-2 space-y-2 space-x-2 rounded bg-gray-200"> 
                    <h1 className=" text-2xl font-bold">Add Departments </h1>
                    <input type="text" placeholder="Department Name"
                      className=" outline-none p-1 px-2 rounded-sm bg-bg-gray-300 hover:bg-gray-100"/>
                      <div className=" space-x-2">
                    

                      <input type="text" placeholder="specialiste 1"
                      className=" outline-none p-1 px-2 rounded-sm bg-bg-gray-300 hover:bg-gray-100"/>
                       <input type="text" placeholder="specialiste 2"
                      className=" outline-none p-1 px-2 rounded-sm bg-bg-gray-300 hover:bg-gray-100"/>
                       <input type="text" placeholder="specialiste 3"
                      className=" outline-none p-1 px-2 rounded-sm bg-bg-gray-300 hover:bg-gray-100"/>
                       <input type="text" placeholder="specialiste 4"
                      className=" outline-none p-1 px-2 rounded-sm bg-bg-gray-300 hover:bg-gray-100"/>


                        </div>
                      <button className=" m-2 bg-sky-400 rounded-xl text-xl p-1 w-full hover:bg-sky-600">Add</button>
                </div> 

                <div className=" p-2 space-y-2 space-x-2 rounded bg-gray-200"> 
                    <h1 className=" text-2xl font-bold">Add Test Information</h1>
                    <input type="text" placeholder="Test .."
                      className=" outline-none p-1 px-2 rounded-sm bg-bg-gray-300 hover:bg-gray-100"/>
                    <input type="text" placeholder="userId .."
                      className=" outline-none p-1 px-2 rounded-sm bg-bg-gray-300 hover:bg-gray-100"/><br></br>
                      <textarea className="p-2 w-full outline-none bg-bg-gray-100 hover:bg-gray-100" placeholder="test result ..."
                      ></textarea>
                      <button className=" m-2 bg-sky-400 rounded-xl text-xl p-1 w-full hover:bg-sky-600">Add</button>
                </div>   

               </div>
            </div>
            }



{!isAdmin  &&user&&
<div>
<div className="flex p-2 ">
                <img src="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600" alt="pic-profile"
                 className=" rounded w-[100px] h-[120px] m-2"/>

                 <div className="px-2 font-semibold text-gray-950 space-y-1 w-full">
                    {isMedecin?<div className="flex justify-between w-full">
                      <div className=" text-xl">
                      <h1 className=" text-sky-800 font-bold"><span className="text-xl px-1">Dr.</span>{user.fullName}</h1>
                      <h2 className=" font-normal text-gray-700 ">RSA :452876</h2>
                      </div>
                      <div className=" flex flex-col justify-end"> 
                        <div className=" flex bg-gray-300 hover:bg-gray-200 items-center rounded m-2 p-1 ">
                          <IoMdSearch size={25} className=" text-gray-800  "/>
                         <input type="text" placeholder="Search for Patient By CIN " 
                           className=" rounded outline-none bg-transparent  "
                           value={txtSearchCIN}
                           onChange={(e)=>{setTextSearchCIN(e.target.value)}}
                           />
                           <button className=" bg-sky-950 text-white rounded-full p-1 "
                            onClick={()=>{GetPtientByCin()}}
                           >Search</button>
                          </div>

                       { patSearched.length>=1&&  <div className=" flex bg-gray-300 p-2 rounded " onClick={()=>{}}>
                            <img src="jhhbgg" alt=""  className="w-[50px] h[50px] rounded-full"/>
                            <h1 className=" text-gray-950 ">Full Name</h1>
                          </div>}
                        
                      </div>
                    </div>

                    :<div className=" text-xl">
                       <h1 className=" text-sky-800 font-bold">{user.fullName}</h1>
                   <a href="" className=" text-sky-300 hover:text-sky-400">{user.email}</a>
                    <div className=" flex space-x-2">
                    <MdAddCall size={25} className=" text-sky-700 hover:bg-white hover:text-sky-800"/>
                    <h3 className="" >{user.phon}</h3>
                    </div>
                    </div>
                    }

                 </div>
              

            </div>

            <div className="flex  space-x-2  flex-col">

         <div className={`py-4 ${isMedecin ?"flex   space-x-2":"space-y-2" }`}>


          <div className=" space-y-2 w-full">
          <h1 className=" text-sky-900 font-bold text-center bg-sky-100  p-2 rounded">Mes Rendez-vous</h1>
                {MyRDVs.length>=1?<div className=" grid grid-cols-1 gap-5 p-4">
                  {
                    MyRDVs.map((item,i)=>{
                      return(
                        <div key={1} className=" flex justify-between p-4  bg-gray-200">
                        <div className="">
                        <h1 className=" text-xl font-bold text-gray-950">Dr.Ahmed Hassan</h1>
                        <h1>Location : hay dakhla Rue alba 14</h1>
                        </div>
                        <div className=" font-semibold text-gray-950">
                         <h1>Date : 12/07/2024 </h1> 
                         <h1>Time : 11:00</h1>
                         <div className=" space-x-4 flex justify-end">
                         <MdDelete size={24} className=" text-sky-900 hover:text-sky-700" />
               
                         </div>
                        </div>
                      </div>
                      )
                    })
                  }

                </div>:
        <h1 className=" text-center">No appoinment yet !</h1>
                }
          </div>
               
     {isMedecin&&<div className=" w-full flex flex-col items-center bg-gray-50 p-2">
                    
                  <div className=" bg-gray-300 p-4 w-full rounded space-y-2 ">
                    <input type="text" placeholder="Enter CIN of Patient" className=" outline-none p-1 rounded"/>
                    <textarea className="text-xl outline-none p-2 w-full rounded" placeholder="add note ..."/><br></br>
                    <button className=" text-xl rounded-xl p-1 px-5 text-white bg-sky-700">Add Note</button>
                  </div>

                 </div> 
                 }
            </div>
    

          { !isMedecin&&  <div className="py-4 ">
                <h1 className=" text-sky-900 font-bold text-center bg-sky-100  p-2 rounded">Les Testes</h1>

                {Mytests.length>=1?<div className=" grid grid-cols-1">
                  {
                    Mytests.map((item,i)=>{
                      return(
                        <div key={i} className=" space-y-2">
                          <h1 className="text-xl">Labo Name </h1>
                          <p>test about ...</p>
                          <p>test result ...</p>
                        </div>
                      )
                    })
                  
                  }

                </div>:
                   <h2 className=" text-center text-gray-600 p-5">No test yet !</h2>
                }
              
            </div>}

            </div> 
        </div>
     }

     {isPatDessier&&<div className=" z-50 w-full bg-black/80 fixed top-0 end-0 h-screen "></div>}
     {isPatDessier&&<div className=" z-50 fixed top-0  end-0 start-0 ">
 
      <PatientDessier setIs={setIsPatDessier}/>
      </div>}
           
        </div>
    )
}

export default Profile;