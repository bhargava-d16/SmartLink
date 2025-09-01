import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // load .env

const mongo_url = process.env.MONGO_CONN; // must match your .env key

const connectDB = async () => {
  try {
    if (!mongo_url) {
      throw new Error("MongoDB connection string is missing. Check your .env file.");
    }

    await mongoose.connect(mongo_url);
    console.log("✅ MongoDB Connected",mongoose.connection.name);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;

