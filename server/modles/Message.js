import mongoose, { Mongoose } from "mongoose";


const messageSchema=mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId, ref: "Users",
        required:true
    },
    reciver :{
        type:mongoose.Schema.Types.ObjectId, ref: "Users",
        required:true
      },
    
      conetnt:{
        type:String ,
        required:true
      }
})


export default mongoose.model("Message",messageSchema);