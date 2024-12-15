import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./src/router/authRouter.js";
import connectDB from "./src/database/conncetDB.js"
dotenv.config();

const app=express();
app.use(cors());

const port = process.env.PORT || 8000

connectDB();


app.get("/",(req,res)=>{
    res.send({message:"welcome our oauth"})
})

app.use("/auth/",AuthRouter);

app.listen(port,()=>{
    console.log(`sever start listen ${port}`)
})