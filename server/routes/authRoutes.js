import express from "express";
import registerUser from "../controllers/authcontrollers/signup.js";
import loginUser from "../controllers/authcontrollers/login.js";
import protectRoute from "../middlewares/auth.js";
import checkAuth from "../controllers/authcontrollers/checkAuth.js";
import logout from "../controllers/authcontrollers/logout.js";

const router=express.Router();

router.post("/signup",registerUser);

router.post("/login",loginUser);

router.get("/check",protectRoute,checkAuth);

router.post("/logout",logout);

export default router
