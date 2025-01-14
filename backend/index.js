import express from "express";
import db from "./database/db.js";
import routers from "./Route/routes.js";
import dotenv from "dotenv";
import userRouter from "./Route/userRoutes.js";
import cron from "node-cron";
import eventModel from "./models/eventModels.js";
import sendEmail from "./controller/sendMail.js";
import cors from "cors"
import path from "path"
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const _dirname =path.resolve()
//ye bhi ek middleware hai joo json ko allow karta hai return karne me ya res me json send and receive karne me 

app.use(express.json());

// cors ka use security purpose ke liye karte hai  ye ek url ke liye hi server run karta hai

const corsOption={
  origin:"http://localhost:3000",
  credential:true,
}

app.use(cors(corsOption));


app.use("/api/v1", routers);
app.use("/api/v1", userRouter);





// Scheduling check karega ki jisbhi user ki me event hoga voo event email send kar dega

cron.schedule("*/1 * * * *", async () => {
  try {
    console.log("Running scheduler task to check events every minute");
    const currentDate = new Date();

    const events = await eventModel.find();

    for (let i = 0; i < events.length; i++) {
      const event = events[i];

      

      const formattedDate = new Date(event.date).toISOString().split("T")[0]; // '2025-01-06'
      const formattedTime = event.time || "00:00"; 
      const eventDateTime = `${formattedDate}T${formattedTime}`;
      const eventDate = new Date(eventDateTime);

      

      //check the difference
      const timediff = eventDate - currentDate;
      


      if (timediff <= 5*60 * 1000 && timediff > 0) {
        await sendEmail(event._id);
        console.log("Email sent to user");
      }
    }
  } catch (error) {
    console.log("Internal server error in scheduler", error);
  }
});

app.use(express.static(path.join(_dirname, "/frontend/build")))
app.get("*",(req,res)=>{
  // res.sendFile(path.join(_dirname, "/frontend/dist/index.html"))
  res.sendFile(path.join(_dirname, "frontend","build","index.html"))
})

// Start the server
app.listen(port, async () => {
  try {
    await db();
    console.log(`Server is running successfully on port ${port}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
});

