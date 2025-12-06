// import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js"
// const express = require("express");
import cors from "cors"
dotenv.config();

const app = express();
connectDB();
app.use(cors({origin:"http://localhost:5173"}))


app.use(rateLimiter);
app.use("/api/notes",notesRoutes);


app.listen(5001,()=>{console.log("Server Started");});

