import express from "express";
import urlcreate from "../controllers/UrlController/createUrl.js";
import getUrl from "../controllers/UrlController/getUrl.js";
import protectRoute from "../middlewares/auth.js";

const Urlrouter=express.Router();

Urlrouter.post("/create",protectRoute,urlcreate)

Urlrouter.get("/:id",getUrl)
export default Urlrouter 