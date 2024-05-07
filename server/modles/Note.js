import mongoose from "mongoose";


const NoteSchema=mongoose.Schema({
    Medecin:{type :mongoose.Types.ObjectId,ref:"users",required:true},
    Patient:{type :mongoose.Types.ObjectId,ref:"users",required:true},
    noteText:{type:String,required:true}

})

export default mongoose.model("Note",NoteSchema);