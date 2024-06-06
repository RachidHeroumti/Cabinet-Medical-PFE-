import Test from "../modles/TestMedecaux.js"


export const AddTest=async(req,res)=>{
const{Patient,testSubject,TestResult,laboName}=req.body;

try{
    if(!Patient||!testSubject||!laboName){
        return res.json({message:"all info required!"})
    }
    const testAd=Test({Patient,testSubject,TestResult,laboName});
    await testAd.save();
    res.json({testAd}) ;
}catch(err){console.log(err);}
}
 
export const getTestofPatient=async(req,res)=>{
    const { userId } = req.params;
    try{
        const tests=await Test.find({Patient:userId});

        if(!tests)
            return res.status(200).json({message :"this Paient Has no test yet"})

             res.json({tests});
    }catch(err){console.log(err);}
}

export const getAlltest=async(req,res)=>{
    try{
        const testes=await Test.find().populate("Patient","-password");

        if(!testes) return res.json({message:"no test founf"});

        res.status(200).json({testes});
    }catch(err){console.log(err)}
}

export const addResultTest=async(req,res)=>{
    const{id,result}=req.body;

    try{

        const addResult=await Test.findByIdAndUpdate({_id:id},{TestResult:result});
         
        if(!addResult) return res.json({message:"this Test not found !"});

        return res.json({addResult});

    }catch(err){console.log(err)}

}








