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

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://smart-link-omega.vercel.app",
    credentials: true,
  })
);



app.use("/", router);
app.use("/", Urlrouter);
app.use("/", analyticsrouter);

app.get('/get/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id.includes('.')) return res.status(404).end();

    console.log(`Direct browser access to: ${id}`);
    const urlObj = await redirectService(id);

    if (urlObj?.fullUrl) {
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
    await connectDB();
    console.log("MongoDB Connected");

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
