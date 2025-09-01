import express from "express";
import urlcreate from "../controllers/UrlController/createurl.js";
import getUrl from "../controllers/UrlController/getUrl.js";

const Urlrouter=express.Router();

Urlrouter.post("/create",urlcreate)

Urlrouter.get("/get",getUrl)
export default Urlrouter