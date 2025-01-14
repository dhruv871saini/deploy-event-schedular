import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }, category: {
        type: String,
        enum: ["Work", "Personal", "Birthday"],
        required: true,

    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"user", // reference of user schema
        required:true
    }
}, { timestamps: true }
)
const eventModel = mongoose.model("event", eventSchema)
export default eventModel;