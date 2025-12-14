// import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js"
// const express = require("express");
import path, { dirname } from 'path'
import cors from "cors"
const __dirname = path.resolve()
dotenv.config();

const app = express();
connectDB();
app.use(express.json())
if (process.env.NODE_ENV!=="production"){
app.use(cors({origin:"http://localhost:5173"}))
}
app.use(rateLimiter)
app.use("/api/notes",notesRoutes);
if (process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.use("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })


}

app.listen(5001,()=>{console.log("Server Started");});

