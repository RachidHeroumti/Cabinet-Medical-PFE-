import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ImgHero from "../Images/picHome.jpg"

const Hero =()=>{
const navigate =useNavigate();


 const ToAddRDV = async()=>{
const userToken=Cookies.get("ut");
if(userToken){
    navigate('/rdv');
    return ;
}
navigate('/login');
 }
    return(
<div id="home" className="bg-sky-100 flex justify-between my-12 ">
  <div className=" flex   sm:flex-col w-full p-4 justify-center items-center">
         <h1 className="text-center text-sky-700 text-3xl font-bold">Welecom To Our </h1>
            <h3 className=" text-center text-2xl font-semibold text-sky-600 px-2">Cabinet Medical</h3>
                <p className="p-2 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Facere, vitae quas? Repellendus odio, 
                        eaque veniam nostrum dolore sed animi fugiat, 
                        libero aliquid delectus quia dolor facere quam ad dolorem vero</p>
                     <div className=" space-x-2 space-y-1  flex items-center ">
                        <button  className=" bg-sky-600 hover:bg-sky-700 text-white rounded-full  p-2  sm:px-5 "
                         onClick={()=>{ToAddRDV()}}
                        >New RDV</button>
                        <button 
                        className="border hover:  border-sky-700 hover:bg-sky-200 text-sky-700 rounded-full  p-2  sm:px-5 "
                        onClick={()=>{navigate('/doctors')}}
                        >Doctor's</button>
                    </div>
    </div>
                  <img src={ImgHero} alt="homePage"
                 className="w-full max-h-[500px]"/>
</div>
    )
}

export default Hero ;