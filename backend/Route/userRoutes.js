import express from "express";
import {  Checks, userLogin, userSignUp } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignUp); 
userRouter.post("/login", userLogin);
userRouter.get("/check",Checks)  

export default userRouter;
