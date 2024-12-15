import express from "express";
import googleLogin from "../controller/googlecontroller.js";
const router=express.Router();


router.get("/google",googleLogin)

export default router;