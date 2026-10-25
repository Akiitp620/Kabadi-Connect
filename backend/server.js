import app from "./src/app.js";
import connectDB from "./src/config/db.js";


connectDB();


app.get("/",(req,res)=>{
    res.send("Hello from backend");
});

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});