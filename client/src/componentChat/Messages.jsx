import React, { useEffect, useState } from 'react'
import { Cabstate } from '../Context/cabinatProvider';
import { Await } from 'react-router-dom';
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
        <div className="flex-grow  flex flex-col bg-gray-300 mt-16 rounded-md p-1 w-[400px] shadow-xl">

            <div className="w-full flex-grow bg-gray-50 dark:bg-gray-900 my-2 p-2 overflow-y-auto">

       {   messages&&messages.map((item,i)=>{
         return(
            <div className={`flex ${item.sender ===user._id ?"justify-start":"justify-end"} `}>
              <div className={`flex items-end w-auto ${item.sender===user._id ?"bg-sky-700":"bg-sky-500"}  dark:bg-gray-800 m-1 rounded-xl rounded-br-none sm:w-3/4 md:w-auto`}>
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



            <div className=" rounded-xl rounded-tr-none rounded-tl-none bg-gray-100 dark:bg-gray-800">
                <div className="flex items-center">

                    <div className="search-chat flex flex-grow p-2">
                        <input className="input text-gray-700 dark:text-gray-200 text-sm p-2 focus:outline-none bg-gray-100 dark:bg-gray-800  flex-grow rounded-l-md" type="text" placeholder="Type your message ..."
                         value={messageContent}
                         onChange={(e)=>{setContentMsg(e.target.value)}}
                        />
                        <div className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200  flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            onClick={()=>{onSendMessage()}}>
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
