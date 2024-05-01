import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema({

  fullName: {type: String,required: true,},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true, min: 6, },
  nationalId: { type: String ,required: true, unique: true},
  dateNaissance:{type:Date,required :true},
  phon: { type: String ,unique :true ,required: true, unique: true},
  profile: {type: String,default: "",},

  isAdmin: {type: Boolean,required: true,default: false},
  isMedecin: { type: Boolean, required: true, default: false},
  Departement: {type: mongoose.Schema.Types.ObjectId, ref: "Departements"},
  Service :{ type :String},
  address:{type:String},
  city:{type:String},
  description :{ type :String },
  cabenitName:{ type :String}


}, { timestamps: true });



UserSchema.methods.matchPassword = async function (Enterpassword) {
  return await bcryptjs.compare(Enterpassword, this.password);
}

UserSchema.pre('save', async function (next) {
  if (!this.isModified) {
    return next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = bcryptjs.hashSync(this.password, salt);

});











export default mongoose.model("Users", UserSchema);
