import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
}, { timestamps: true }
)
const userModel = mongoose.model("user", userSchema)
export default userModel