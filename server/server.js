import dotenv from "dotenv";
dotenv.config();


console.log(process.env.MONGO_URI)

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./libs/db.js";
import Urlrouter from "./routes/urlRoutes.js";
import router from "./routes/authRoutes.js";

const PORT = process.env.PORT || 8080;
const app = express();


app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/", router);
app.use("/", Urlrouter);


const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("MongoDB Connection Ready");

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Error starting server:", error);
    process.exit(1);
  }
};

startServer();
