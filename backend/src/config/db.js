import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log("MongoDB URI not configured - running without database");
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Database Connected");
  } catch (error) {
    console.log(" DB Connection Failed:", error.message);
    process.exit(1);
  }
}

export default connectDB;