import express from "express"
import User from "../modles/User.js";
import generateToken from "../config/generateToken.js"

export const Register = async (req, res) => {
const{fullName, email, password, isMedecin,isAdmin,nationalId,phon,dateNaissance
  ,Departement,Service,address,city ,description,cabenitName } = req.body;
  let user;
  try {
    if (!fullName || !email || !password||!nationalId||!dateNaissance||!phon)
               return res.status(401).json({ message: "all info required !" })
    user = await User.findOne({ email });
    if (!user) {
      if (!isAdmin) {
        if (!isMedecin) {
          //Patient
          user = User({ fullName, email, password,nationalId,dateNaissance ,phon });
          await user.save();

          res.status(200).json({
            "_id": user._id,
            "fullName": user.fullName,
            "email": user.email,
            "Date de Naissance":user.dateNaissance,
            "phon":user.phon,
            "isAdmin":user.isAdmin,
            "isMedecin":user.isMedecin,
            token: generateToken(user._id)
          });


        } else {
          //Medecin
          user = User({ fullName, email, password,nationalId,dateNaissance ,phon, isMedecin,Departement
            ,Service,address,city,description,cabenitName });
          await user.save();

          res.status(200).json({
            "_id": user._id,
            "fullName": user.fullName,
            "email": user.email,
            "address": user.address,
            "isMedecin":  user.isMedecin,
            "Date_Naissance": user.dateNaissance,
            "Department": user.Departement,
            "Services": user.Service,
            "nationalId":user.nationalId,
            "city": user.city,
            "description": user.description,
            "CabinetName": user.cabenitName ,
            token: generateToken(user._id)
          });
        }
      } else {
        //Admin:
      }

    } else return res.status(200).json({ message: "User alredy Existe !" });



  } catch (err) {
    console.log(err);
  }
}

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatchPassword = await user.matchPassword(password);
      if (!isMatchPassword) {
        return res.status(200).json({ message: "Email or password Invalide!" });
      }
      res.status(200).json({
        "_id": user._id,
            "fullName": user.fullName,
            "email": user.email,
            "Date de Naissance":user.dateNaissance,
            "phon":user.phon,
            "isAdmin":user.isAdmin,
            "isMedecin":user.isMedecin,
            token: generateToken(user._id)
      });
    } else res.status(200).json({ message: "Email or Password inccorrect !" });

  } catch (err) { console.log(err); }
}

export const getUser = async (req, res) => {
  const Id = req.params.id

  try {
    const user = await User.findById(Id);

    if (!user) {
      return res.status(401).json({ message: "user not found !" });
    }

    res.status(200).json({
      "_id": user._id,
    "fullName": user.fullName,
    "email": user.email,
    "CIN":user.nationalId,
    "phon":user.phon,});
  } catch (err) { console.log(err) };

}

export const getDoctors = async (req, res) => {
 
  try {
    const Doctors = await User.find({isMedecin:true}).populate("Departement");
    if (!Doctors) {
    return  res.status(401).json({ message: "no Doctor's found !" });
    }
    res.status(200).json({Doctors});

  } catch (err) { console.log(err) };

}

export const updateUser=async (req,res)=>{
  const id= re.params.id;
  const{profile}=req.body;

  try{ 
    const upUser=await User.updateOne({id},{profile});

    if(!upUser) return res.json({message:"user not found!"});

 
    res.status(200).json({
      "_id": upUser._id,
    "fullName": upUser.fullName,
    "email": upUser.email,
    "CIN":upUser.nationalId,
    "phon":upUser.phon,
  "profile":upUser.profile});
 
  }catch(err){console.log(err);}
}
export const getuserByCIN=async(req,res)=>{
  const {nationalId} = req.params;
  try{
    const usrPat=await User.findOne({nationalId});
    if(!usrPat)return res.json({message:"User not found"}) ;
     console.log(usrPat);
     return res.status(200).json({
      "_id": usrPat._id,
    "fullName": usrPat.fullName,
    "email": usrPat.email,
    "CIN":usrPat.nationalId,
    "phon":usrPat.phon,}); 
  }catch(err){console.log(err)}
}