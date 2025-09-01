import express from "express";
import registerUser from "../controllers/authcontrollers/signup.js";
import loginUser from "../controllers/authcontrollers/login.js";
import protectRoute from "../middlewares/auth.js";
import checkAuth from "../controllers/authcontrollers/checkAuth.js";

const router=express.Router();

router.post("/signup",registerUser);

router.post("/login",loginUser);

router.get("/check",protectRoute,checkAuth);

export default router
