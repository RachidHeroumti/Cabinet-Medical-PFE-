import Note from "../modles/Note.js";


export const addNote=async(req,res)=>{
    const {Medecin,Patien,noteText}=req.body;

    try{
        const noteAdded=Note({
            Patien,Medecin,noteText
        })
        await noteAdded.save();
        return res.status(200).json({noteAdded});
    }catch(err){console.log(err)}
}

export const getNotePatient=async(req,res)=>{
    const{Patien}=req.body
    try{
        const notes= await Note.find({Patien}) ;
        if(!notes) return res.json({message :"There no notes for this patien "});
        return res.status(200).json({notes});

    }catch(err){console.log(err)}
}

