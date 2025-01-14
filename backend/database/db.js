import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const mongourl = process.env.MONGOOSE_URL;

const db = async () => {
  try {
    await mongoose.connect(mongourl);
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
  }
};

export default db;
