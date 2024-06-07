import Message from "../modles/Message.js"

export const addMessage=async(req,res)=>{
const{sender,reciver,content}=req.body;

try{
    const Msg= Message({sender,reciver,content});

    await Msg.save();

    res.status(200).json({Msg});

}catch(err){
    console.log(err)
}

}


export const getMessageWithAdmin = async (req, res) => {
    const id = req.params.id;
   
    try {
      const messages = await Message.find({
        $or: [
          { reciver: id },
          { sender: id }
        ]
      });
  
      if (messages.length === 0) {
        return res.json({ message: "no message found!" });
      }
  
      res.status(200).json({ messages });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

