import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

//importing routes
import authRouter from "./routes/auth.routes.js";
import scrapRouter from "./routes/scrap.routes.js";
import profileRouter from "./routes/profile.routes.js";

const app = express();


app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

//routes
app.use("/api/auth",authRouter);
app.use("/api/scrap",scrapRouter);
app.use("/api/profile",profileRouter);

app.get("/",(req,res)=>{
    res.send("Hello from backend");
});







export default app;