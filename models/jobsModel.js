
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company : {
        type : String,
        required : [true, "Company name is required"]
    },
    position : {
        type : String,
        required : [true, "Position is required"]
    },
    status : {
        type : String,
        enum : ["interview", "declined", "pending"],
        default : "pending"
    },
    worktype : {
        type : String,
        enum : ["full-time", "part-time", "contract", "freelance"],
        default : "full-time"
    },
    worklocation : {
        type : String,
        required : [true, "Work location is required"]
    },
    createdBy : {
        type : mongoose .Types.ObjectId,
        ref : "User",
    }
} , {timestamps : true});

export default mongoose.model("Job", jobSchema);