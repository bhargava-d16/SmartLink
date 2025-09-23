import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./libs/db.js";
import Urlrouter from "./routes/urlRoutes.js";
import router from "./routes/authRoutes.js";
import analyticsrouter from "./routes/analyticsRoutes.js";
import { redirectService } from "./services/redirect.service.js";


dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

app.use(cors({ origin:process.env.APP_URL, credentials: true }));

app.use("/", router);
app.use("/", Urlrouter);
app.use("/", analyticsrouter);

app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Direct browser access to: ${id}`);
    
    const urlObj = await redirectService(id);
    
    if (urlObj && urlObj.fullUrl) {
      console.log(`Redirecting to: ${urlObj.fullUrl}`);
      return res.redirect(urlObj.fullUrl);
    } else {
      return res.status(404).send('<h1>URL Not Found</h1><p>This short URL does not exist.</p>');
    }
  } catch (error) {
    console.error('Redirect error:', error);
    return res.status(500).send('<h1>Server Error</h1>');
  }
});

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("MongoDB Connection Ready");

    app.listen(PORT, '0.0.0.0',() => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Error starting server:", error);
    process.exit(1);
  }
};

startServer();
