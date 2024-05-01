import mongoose from "mongoose"

const TestSchema=mongoose.Schema({
    Patient:{
        type: mongoose.Schema.Types.ObjectId, ref: "Users",
         required: true
    },
    testSubject:{
        type :String,
        required :true
    },
    laboName:{
        type: String,
        required :true,
    },
    TestResult:{
        type :String,
        default:""
    }
},{ timestamps: true })

export default mongoose.model("Test",TestSchema);