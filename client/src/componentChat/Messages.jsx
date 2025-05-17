import React, { useEffect, useState } from 'react'
import { Cabstate } from '../Context/cabinatProvider';
import axios from 'axios';
import { addMessageRoute, getMessageRoute } from '../Routes/routes';

const Messages = () => {
 const[messages,setMessages]=useState([]);
 const[messageContent,setContentMsg] =useState("");
 
 const{user}=Cabstate()


  useEffect(()=>{
    const getMessages= async()=>{
         const id=user._id;
     const res = await axios.get(`${getMessageRoute}/${id}`);
     console.log(res)
     if(res.data.messages){
        setMessages(res.data.messages)
     }
    }

    getMessages();
  },[])


  const onSendMessage =async()=>{
    const id=user._id;
     const adminId="6633cf0b74139fcd34c3278a"
     try{
        const res = await axios.post(addMessageRoute,{sender:id,reciver:adminId,content:messageContent});
         console.log(res) ;
         
         if(res.data.Msg){   
            const msg=res.data.Msg;
            setMessages([...messages, msg]);
            setContentMsg("");
         }
            

     }catch(err){console.log(err);}
  }
    return (
        <div className=" flex flex-col bg-gray-300 h-full relative rounded-md p-1 sm:w-[400px] shadow-xl">

<div className="w-full h-15 p-1 bg-sky-600 shadow-md rounded-xl rounded-bl-none rounded-br-none">
                <div className="flex p-2 align-middle items-center">
                    <div className="p-2 md:hidden rounded-full mr-1 hover:bg-sky-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </div>
                    <div className="border rounded-full border-white p-1/2">
                        <img className="w-14 h-14 rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar"/>
                    </div>
                    <div className="flex-grow p-2">
                        <div className="text-md text-gray-50 font-semibold">Ahmed Jamal </div>
                       
                    </div>
                  
                </div>
            </div>
            <div className="w-full flex-grow bg-gray-50 my-2 p-2 overflow-y-auto">

       {   messages&&messages.map((item,i)=>{
         return(
            <div className={`flex ${item.sender ===user._id ?"justify-start":"justify-end"} `} key={i}>
              <div className={`flex items-end w-auto ${item.sender===user._id ?"bg-sky-700":"bg-sky-500"}  m-1 rounded-xl rounded-br-none sm:w-3/4 md:w-auto`}>
                 <div className="p-1">
                     <div className="text-gray-50">
                         {item.content}
                    </div>
                 </div>
             </div>
        </div>
         )
       }) 
       
                }
        
            
                
            </div>



            <div className=" rounded-xl rounded-tr-none rounded-tl-none bg-gray-100 absolute bottom-0 w-full">
                <div className="flex items-center">

                    <div className="search-chat flex flex-grow p-2">
                        <input className="input text-gray-700 text-sm p-2 focus:outline-none bg-gray-100 flex-grow rounded-l-md" type="text" placeholder="Type your message ..."
                         value={messageContent}
                         onChange={(e)=>{setContentMsg(e.target.value)}}
                        />
                        <div className="bg-gray-100 flex justify-center items-center pr-3 text-gray-400 rounded-r-md cursor-pointer" onClick={onSendMessage}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Messages
