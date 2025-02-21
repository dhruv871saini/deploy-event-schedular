import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModels.js";
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";
import nodemailer from "nodemailer"
import crypto from "crypto"

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})
const sendMailMiddleware = async (id) => {
  try {
    const verifyid= await userModel.findById(id)
    if(!verifyid ){
      throw new Error("User ID is not found in nodemailer")
    }
    const verificationToken= crypto.randomBytes(32).toString("hex")
    const tokenExpire= Date.now()+5*60*1000;
    verifyid.verificationToken=verificationToken;
    verifyid.tokenExpire=tokenExpire;
    await verifyid.save()
    const mailOptions = {
      from: "Verification Mail <dhruvsystemchnm@gmail.com>",
      to: verifyid.userEmail,
      subject: "Verification Mail",
      html: `<p>Click on the link to verify your email account: <br>
      <a href="https://deploy-event-schedular.onrender.com/api/v1/verified/${verifyid.userEmail}/token/${verificationToken}">Click here for verification</a></p>`
    }
    const info = await transporter.sendMail(mailOptions)
    console.log(info.messageId)
  } catch (error) {
    console.log(error)
  }
}


// User Sign-up
export const userSignUp = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  if (!userName || !userEmail || !userPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await userModel.findOne({ userEmail });
    if (existingUser) {
      return res.send("Email is already registered");
    }
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    
    const newUser = new userModel({
      userName,
      userEmail,
      userPassword: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Verification link send successfully on your Email" });

  } catch (error) {
    console.log("Error in Sign-up:", error);
     res.status(500).json({ message: "Internal server error" });
  }
};

// User Login

export const userLogin = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await userModel.findOne({ userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    if (user.verified == false) {
      sendMailMiddleware(user._id)
      return res.status(404).json({message:"Verification link send successfully on your Email"})
    }
    // token is created by jwt

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error in Login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const Checks = (req, res) => {
  try {
    res.status(200).json({ message: "Server running successfullyfeer" });
  } catch (error) {
    console.error("Error in check API:", error);
  }
};


// verify user by email 
export const verifyUser = async (req, res) => {
  const {email,token} =req.params;

  try {
    if(!email||!token){
      return res.status(400).json({message:"Invalid url"})
    }
    const user = await userModel.findOne({userEmail:email})
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    if(Date.now()>user.tokenExpire){
      return res.status(404).json({message:"verification link is expired "})
    }
    user.verified=true;
    user.verificationToken=null;
    user.tokenExpire=null;
    await user.save()
    return res.status(200).json({message:"hello sir "})
  } catch (error) {
    console.log(error)
  }
}