import axios from "axios";
import { useEffect, useState } from "react";
import { getDepartmetRoute } from "../Routes/routes";

const Department=()=>{
    const [departmets,setDepatrmets]=useState([]);

    useEffect(()=>{
            const getDeps=async()=>{
                const res =await axios.get(getDepartmetRoute);
                if(res.data.deps){
                    setDepatrmets(res.data.deps);
                }
            }
           getDeps(); 
    },[])

    return(
        <div className="">
            <h1 id="departments" 
             className=" text-center p-5 text-2xl font-bold bg-sky-50 rounded">Departments</h1>
            <div className="grid grid-cols-1 gap-10">

{
    departmets.map((item,i)=>{
        return (
            <div key={i} className={` flex  text-gray-950 ${i%2==0?"":"justify-end"} `}>
            <div className="p-4 flex space-x-2 max-w-1/2">
                <img className=" w-[300px] h-[350px] rounded "
                src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600" alt="doctor"/>
                <div className=" space-x-2 space-y-2 px-3  max-w-[550px]"> 
                    <h1 className="text-2xl font-semibold ">{item.name}</h1>
                    <p className=" font-semibold">adipisicing elit. Recusandae non doloribus laboriosam a? 
                    Deleniti quisquam tempore accusantium error dignissimos veritatis blanditiis ipsam temporibus,
                     fugit, tenetur recusandae perferendis laborum. Repellat, dolore.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                         Officia in facere vel dolor doloremque reiciendis id,
                         ut magnam et libero expedita maxime voluptatibus excepturi atque ex velit provident pariatur unde!
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Quis totam, aspernatur velit voluptate id ut nemo vel? Culpa aut architecto ullam fugiat quod!
                         Voluptate sed quae necessitatibus commodi itaque facere.
                    </p>
                    
                </div>
            </div>
        </div>

        )
    })
}
               

            </div>

        </div>
    )
}

export default Department ;