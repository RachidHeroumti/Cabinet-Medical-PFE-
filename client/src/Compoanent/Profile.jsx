import { useEffect ,useState} from "react";
import { Cabstate } from "../Context/cabinatProvider";
import { IoMdSearch } from "react-icons/io";
import { MdAddCall, MdSearchOff } from "react-icons/md";
import axios from "axios";
import { addNoteRoute, addRDVRoute, deletRDVRoute, getPatTestsRoute, getPatientRDVRoute, getUserBycinRoute, getdocRDVRoute } from "../Routes/routes";
import { useNavigate } from "react-router-dom";
import { MdMode,MdDelete } from "react-icons/md";
import PatientDessier from "./PatientDessier";
import DachbordAdmin from "./DachbordAdmin";
import LaboDashbord from "./LaboDashbord";






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
    const[patAddNoteCIN,setPatAddNoteCin]=useState("");
    const[noteText,setNoteText]=useState("");
  
    const[isLabo,setIslabo]=useState(false)

  useEffect(()=>{
    if(user){
        if(user.isAdmin===true)setIsAdmin(true);
        else if(user.isMedecin===true) setIsMedecin(true); 
        else if(user.isLabo===true)  setIslabo(true)

         
    }else{navigate("/");}
  },[user])

  useEffect(()=>{
    const getRDVs_Tests=async()=>{
      try{
        if(!user._id) return;
        if(!isMedecin){
            const userId=user._id;
            
            const resRDVs = await axios.get(`${getPatientRDVRoute}/${userId}`);
            const resTests = await axios.get(getPatTestsRoute,{userId});

            if(resRDVs.data.MyRdvs){
                setMyRDVs(resRDVs.data.MyRdvs);
               // const dtRDV=new Date(resRDVs.data.MyRdvs.dateRdv)
                //setDt(new Date(dtRDV.getDay(),dtRDV.getMonth(),dtRDV.getFullYear()))
            }
            if(resRDVs.data.tests){
                setMyTests(resTests.data.tests);     
            }
            
        }
        else if(!isAdmin){
          const userId=user._id;
            const resRDVs = await axios.get(`${getdocRDVRoute}/${userId}`);
            if(resRDVs.data.MyRdvs){
              setMyRDVs(resRDVs.data.MyRdvs);
          }
        }
        
        }catch(err){console.log(err);}
    }
    getRDVs_Tests();
  },[user,isAdmin,isMedecin]);

const GetPtientByCin=async()=>{
 try{
const nationalId=txtSearchCIN.toString();
const res = await axios.get(`${getUserBycinRoute}/${nationalId}`);
 
   if(res.data._id){
    setPatsearched(res.data);
   }

 }catch(err){ console.log(err)}
}
  const onAddNote=async()=>{
  if(!noteText||!patAddNoteCIN) return console.log("some info not there");
     try{
      const nationalId=patAddNoteCIN.toString();
      const resUser = await axios.get(`${getUserBycinRoute}/${nationalId}`);
    
        if(resUser.data._id){
          const Patient=resUser.data._id;
          const resAddtest=await axios.post(addNoteRoute,
            {Patient,Medecin:user._id,noteText})
            if(resAddtest.data.noteAdded._id){
              setNoteText("");
              setPatAddNoteCin("");
              console.log("added succefully");
            }
        }else{
          console.log("errooor in getting patient id by cin");
        }

     }catch(err){console.log(err)}

  }

 const DeleteRdv =async(item)=>{
  const rdvs=MyRDVs;
  try{
   const res = await axios.get(`${deletRDVRoute}/${item._id}`);
       console.log(res);
    setMyRDVs(
      rdvs.filter((it)=>{
        return it._id!== item._id;
      })
     )
  }catch(err){console.log(err);}
   
 }


    return(
        <div className=" mt-16">
        {isAdmin &&  <DachbordAdmin/>}
        {isLabo&&<LaboDashbord/>}


{!isAdmin&&!isLabo  &&user&&
<div className="p-3">
<div className="flex p-2 ">
                <img src="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600" alt="pic-profile"
                 className=" rounded-full w-[150px] h-[150px] m-2"/>

                 <div className="px-2 font-semibold text-gray-950 space-y-1 w-full">
                    {isMedecin?<div className="flex justify-between w-full">
                      <div className=" text-xl">
                      <h1 className=" text-sky-800 font-bold"><span className="text-xl px-1">Dr.</span>{user.fullName}</h1>
                      <h2 className=" font-normal text-gray-800 "><span className=" font-medium">Cabinet Name</span> : elkhadi cab</h2>
                      <h1 className="font-normal text-gray-800"><span className=" font-medium">Medical License Number </span>: 245685</h1>
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

                       { patSearched._id&&  <div className=" flex bg-gray-300 p-2 rounded space-x-2 " onClick={()=>{setIsPatDessier(true)}}>
                            <img src={patSearched.profile} alt="" 
                             className="w-[60px] h[60px] rounded-full"/>
                            <h1 className=" text-gray-950 ">{patSearched.fullName}</h1>
                          </div>}
                        
                      </div>
                    </div>

                    :<div className=" text-xl  ">
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

      <div className={`flex  space-x-2  w-full ${isMedecin? "flex-col":"flex-row justify-between"}`}>
         <div className={`py-4   ${isMedecin ?"flex   space-x-2":"flex   w-full " }`}>

          <div className=" space-y-2 flex flex-col w-full bg-gray-200 ">
          <h1 className=" text-sky-900 font-bold text-center border bg-gray-300  p-2 rounded">Mes Rendez-vous</h1>
                {MyRDVs.length>=1?<div className=" grid grid-cols-1 gap-5 p-4">
                  {
                    MyRDVs.map((item,i)=>{
                      return(
                        <div key={i} className=" flex justify-between p-4  bg-gray-100">
                        <div className="">
                        <h1 className=" text-xl font-bold text-gray-950">{isMedecin?item.Patient.fullName:"Dr ."+item.Medecin.fullName}</h1>
                        <h1>Location : {item.Medecin.address}</h1>
                        </div>
                        <div className=" font-semibold text-gray-950">
                   {     // const dtRDV=new Date(resRDVs.data.MyRdvs.dateRdv)
                //setDt(new Date(dtRDV.getDay(),dtRDV.getMonth(),dtRDV.getFullYear()))
              }
              <h1>Date: {new Date(item.dateRdv).getDate()}/{new Date(item.dateRdv).getMonth() + 2}/{new Date(item.dateRdv).getFullYear()}</h1>


                         <h1>Time : {item.Num+7}:00</h1>
                         <div className=" space-x-4 flex justify-end">
                      { !isMedecin&&  <MdDelete size={24} className=" text-sky-900 hover:text-sky-700" 
                          onClick={()=>{DeleteRdv(item)}}/>}
               
                         </div>
                        </div>
                      </div>
                      )
                    })
                  }

                </div>:
              <h1 className=" text-center ">No appoinment yet !</h1>
                }
          </div>
               

       {isMedecin&&
    <div className=" flex w-full flex-col items-center bg-gray-200 p-2">
                  <div className=" bg-gray-300 p-4 w-full rounded space-y-2 ">
                    <input type="text" placeholder="Enter CIN of Patient" className=" outline-none p-1 rounded"
                     value={patAddNoteCIN}
                     onChange={(e)=>{setPatAddNoteCin(e.target.value)}}/>
                    <textarea className="text-xl outline-none p-2 w-full rounded"
                       placeholder="add note ..."
                       value={noteText} 
                       onChange={(e)=>{setNoteText(e.target.value)}}/><br></br>
                    <button className=" text-xl rounded-xl p-1 px-5 text-white bg-sky-700"
                    onClick={()=>{onAddNote()}}
                    >Add Note</button>
                  </div>

                 </div> 
                 }

                 {/***   */}
            </div>
    
    
          { !isMedecin&&  <div className="my-4 w-full bg-gray-200 border-spacing-1">
                <h1 className=" text-sky-900 font-bold text-center bg-gray-300  p-2 rounded">Les Testes</h1>

                {Mytests.length>=1?<div className=" grid grid-cols-1">
                  {
                    Mytests.map((item,i)=>{
                      return(
                        <div key={i} className=" space-y-2 bg-gray-300 rounded">
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
 
      <PatientDessier setIs={setIsPatDessier} patSearched={patSearched}/>
      </div>}

        </div>
    )
}

export default Profile;