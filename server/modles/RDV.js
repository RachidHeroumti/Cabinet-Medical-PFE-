import mongoose from "mongoose";

const today = new Date();

const RdvSchema = new mongoose.Schema({
  Patient: {
    type: mongoose.Schema.Types.ObjectId, ref: "Users",
    required: true
  },
  Medecin: {
    type: mongoose.Schema.Types.ObjectId, ref: "Users"
  },
  dateRdv: {
    type: Date,
    required: true,
  }
  ,
  Num: { type: Number, required: true },

}, { timestamps: true })

export default mongoose.model("RDVs", RdvSchema);