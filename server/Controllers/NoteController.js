import Note from "../modles/Note.js";


export const addNote=async(req,res)=>{
    const {Medecin,Patient,noteText}=req.body;

    try{
        const noteAdded=Note({
            Patient,Medecin,noteText
        })
        await noteAdded.save();
        return res.status(200).json({noteAdded});
    }catch(err){console.log(err)}
}

export const getNotePatient=async(req,res)=>{
    const{Patient}=req.body
    try{
        const notes= await Note.find({Patient}) ;
        if(!notes) return res.json({message :"There no notes for this patien "});
        return res.status(200).json({notes});

    }catch(err){console.log(err)}
}

