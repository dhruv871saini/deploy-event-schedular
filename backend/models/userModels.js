import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
    verified:{type:Boolean, default:false},
    verificationToken:{type:String, default:null},
    tokenExpire :{type:Date,default:null}
   
}, { timestamps: true }
)
const userModel = mongoose.model("user", userSchema)
export default userModel