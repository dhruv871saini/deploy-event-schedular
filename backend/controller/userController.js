import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModels.js";

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

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

    res.status(201).json({ message: "User registered successfully" });
    
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
// token is created by jwt

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token,user });
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
