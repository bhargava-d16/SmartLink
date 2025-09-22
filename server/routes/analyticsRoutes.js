import express from "express";
import analytics from "../controllers/analyticsController/analytics.js";
import protectRoute from "../middlewares/auth.js";
import sendlinks from "../controllers/analyticsController/links.js";
const analyticsrouter = express.Router();

analyticsrouter.get("/analytics",protectRoute,analytics);

analyticsrouter.get("/links",protectRoute,sendlinks);

export default analyticsrouter;
