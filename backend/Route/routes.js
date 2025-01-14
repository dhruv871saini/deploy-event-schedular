import express from "express";
import {
  CreateEvent,
  deleteEvent,
  getEvent,
  updateEvent,
} from "../controller/EventController.js";
import { verifyToken } from "../middleware/authentication.js";

const routers = express.Router();

// Routes
routers.post("/events", verifyToken ,CreateEvent);
routers.get("/events",verifyToken ,getEvent);
routers.delete("/events/:id", verifyToken ,deleteEvent);
routers.patch("/events/:id",verifyToken ,updateEvent );

export default routers;