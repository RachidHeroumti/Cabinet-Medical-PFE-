import mongoose from "mongoose";

const DepScema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  picture:{
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  services: [{ type: String }]
}, { timestamps: true });

export default mongoose.model("Departements", DepScema);