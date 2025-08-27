
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

console.log("🔍 MONGO_URI =", MONGO_URI); // Add this line to debug

export const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
