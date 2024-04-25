import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Cookies from 'js-cookie';
import axios from "axios";
import { addRDVRoute, getDepartmetRoute, getDoctorsRoute } from "../Routes/routes";
import { useNavigate } from "react-router-dom";

const RDV =()=>{
const[isDocSelected,setIsDoctorSelected] = useState(false);
const[textSearch, setTextSearch] = useState("");
const[user,setUser] =useState("");
const[doctors,setDoctors]=useState([]);
const[selectDoctor,setSelectDoctor]=useState([]);
const[deps,setDeps]=useState([]);
const[depSelect,setDepSelect]=useState("");
const[serSelect,setSerSelect]=useState("");
const[sers,setSers]=useState([]);
const[messgeEr,setMessageEr]=useState("");
const[dayRdv,setDayRdv]=useState("1");
const[monthRdv,setMonthRdv]=useState("1");
const[isRdvAdded,setisRDVAdded]=useState(false);

const navigate=useNavigate("");

useEffect(()=>{
    const cookieValue = Cookies.get('user');
   cookieValue ? setUser(JSON.parse(cookieValue) ): setUser(null);
    
},[])

useEffect(() => {
    const getDoctors = async () => {
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

useEffect(()=>{
    const getDeps=async()=>{
       const res= await axios.get(getDepartmetRoute);
       if(res.data.deps){
        setDeps(res.data.deps);
       }


    }
    getDeps();
},[])

useEffect(()=>{
if(depSelect&&deps){
   
    const itemSelected = deps.filter((idep)=>{
        return idep.name === depSelect
    })
    setSers(itemSelected[0].services);
}
},[depSelect]);

const setDoctorInfo=(item)=>{
    setSelectDoctor(item)
    setIsDoctorSelected(true);
}


const onAddRDV=async()=>{
    setMessageEr("");
//const { Patient, Medecin, day, month } = req.body;
const Patient=user._id;
const Medecin=selectDoctor._id;
try{
 

    const today=new Date();
    if(!Patient||!Medecin||!dayRdv||!monthRdv){
        setMessageEr("Enter all information and choose a doctor");
        return false;
    }
    if(dayRdv<=today.getDay()&&monthRdv<today.getMonth()+1){
        setMessageEr("Choose a future date!");
        return false;
    }
    const res=await axios.post(addRDVRoute,{Patient,Medecin,day:dayRdv,month:monthRdv});

    console.log(res)
    if(res.data.rdv){
        setisRDVAdded(true);
    }else{
        setMessageEr(res.data.message);
    }
}catch(er){console.log(er);}

}


    return(
<div className="p-12">
    <div className=" sm:space-y-4" >
       {user && <div className=" space-y-2 text-xl bg-gray-200 p-4 rounded">
            <h1 className=" font-semibold p-2">Patient information</h1>
            <h1 className=" font-medium text-gray-900">{user.fullName}</h1>
            <h2 className=" text-sky-700 ">{user.email}</h2>
            <h2>CNI : JB5555</h2>
            <h3> 061254897</h3>
        </div>}
        <div className=" sm:flex space-x-2">
            <h1 className=" text-xl font-semibold">Department</h1>

            <select value={depSelect} onChange={(e)=>setDepSelect(e.target.value)} className="p-1">
        <option value="">Select a depratment</option>
        {deps.map((item, i) => (
          <option key={i} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

        </div>

        <div className=" sm:flex space-x-2">
            <h1 className=" text-xl font-semibold">Services</h1>
            <select className="px-2 " value={serSelect} onChange={(e)=>{setSerSelect(e.target.value)}} >
                { sers.map((item,i)=>{
      return ( 
          <option key={i} className=" p-1 ">{item}</option>
             )
                })
                  }
              
            </select>
        </div>

<h1 className=" text-xl font-bold text-gray-950">Date de rendez-vous</h1>
        <div className=" space-x-2 flex ">
            <h1 className="p-1 font-medium">Select  Month :</h1>
            <input type="number" className=" outline-none rounded-sm p-1 bg-sky-100 hover:bg-sky-200 " 
            value={monthRdv}
            onChange={(e)=>{setMonthRdv(e.target.value)}}
             max={12} min={1}/>

            <h1 className="p-1 font-medium">Day:</h1>
            <input type="number" className=" outline-none rounded-sm p-1 bg-sky-100 hover:bg-sky-200 " 
            max={31} min={1} 
            value={dayRdv}
            onChange={(e)=>{setDayRdv(e.target.value)}}
            />
       
        </div>



       {isDocSelected&&selectDoctor&&
        <div className=" space-y-2 text-xl bg-gray-200 p-4 rounded">
            <h1 className=" font-semibold p-2">Doctor information</h1>
            <h1 className=" font-medium text-gray-900">{selectDoctor.fullName}</h1>
            <h2 className=" text-sky-700 ">{selectDoctor.email}</h2>
            <h1>{selectDoctor.Service}</h1>
            <h3> {selectDoctor.phon}</h3>
        </div>
       }

    {messgeEr!=""?<p className=" text-red-600 text-xl">{messgeEr}</p>:""}
<div className=" space-y-2">
    <h1 className=" text-center text-xl font-bold bg-sky-50 p-2">Doctors</h1>

    <div className="flex border rounded-md items-center sm:px-5 ">
          <CiSearch size={20} className=" font-bold" />
          <input placeholder="Search For Doctor By Name "
            className=" outline-none sm:p-2 rounded-lg hover:bg-gray-50 sm:text-xl w-full"
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
          />
        </div>

    <div  className=" grid grid-cols-4 gap-12 justify-center sm:p-12">

       {doctors&&doctors.map((item,i)=>{
return (
     <div key={i} className=" flex  items-center flex-col space-y-2 max-w-[600px] bg-sky-50 rounded-sm p-4">
         <img src="https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=600" alt="pic"
          className=" rounded-full w-[100px] h-[100px] "/>
          <h1>{item.fullName}</h1>
          <p className=" text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
          <button className=" rounded-sm  border border-sky-700 p-1 hover:bg-sky-300 "
          onClick={()=>setDoctorInfo(item)}
          >Add +</button>
     </div>
     )

       })}
        

    </div>
</div>

    </div>
    <button className=" fixed bottom-0 end-0 m-16 p-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-center "
    onClick={()=>{onAddRDV()}}>Add RDV</button>



    {//isRdvAdded? <div className="w-screen h-screen z-10 bg-black/80"></div> 
    //:""
    }
     {isRdvAdded ? <div className='fixed h-screen w-full bg-black/80 top-0 left-0 z-10'>
         </div> : ""}
    {isRdvAdded ?
    <div className=" w-full h-screen fixed top-0 left-0 z-10 p-4  flex justify-center items-center">
        <div className="flex space-x-2 justify-center bg-white rounded-sm p-5 ">
            <h1 className=" text-green-600 text-xl">Added Successfully!</h1>
            <button className=" font-bold border border-sky-700 p-1 rounded-sm" onClick={()=>{setisRDVAdded(false);navigate("/")}}>Done</button>
            </div>
 
    </div>
    :""}
</div>
    )
}
export default RDV ;