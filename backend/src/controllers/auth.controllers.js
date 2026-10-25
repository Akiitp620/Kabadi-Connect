import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
//user register controllers
const handleUserRegister=async(req,res)=>{
    try {
        const {role,name,email,businessname,phone,password,city}=req.body;
    
//         if (!role || !name || !phone || !password || !email || !city || !businessname ) {
//       return res.status(400).json({
//      message: "All fields are required"
//   });
// }
        //checking user existence
        const isAlreadyRegistered =await User.findOne({phone});
    
        if(isAlreadyRegistered){
            return res.status(400).json({
                message:"User already registered with this phone number"
            });
        }
    
        const hashedpassword = await bcrypt.hash(password,11);
        
        const newUser = new User({
            role,
            name,
            email,
            businessname,
            phone,
            city,
            password:hashedpassword
        });
    
        const data=await newUser.save();
    
        return res.status(201).json({
            message:"User registered successfully",
            data
        });
    } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({message:"Something went wrong"})
}
    }


//user login controllers
const handleUserLogin=async(req,res)=>{
   try {
     const {email,password} = req.body;
 
     //checking user existence
     const user =await User.findOne({email});
 
     if(!user){
         return res.status(400).json({
             message:"User not found with this email"
         });
     }
     const isPasswordMatch = await bcrypt.compare(password,user.password);
 
     if(!isPasswordMatch){
         return res.status(400).json({
             message:"Invalid password"
         });
     }
      const token = jwt.sign({
         id: user._id
     }, process.env.JWT_SECRET, {
         expiresIn: "1d"
     });
     
     res.cookie("token", token, {
         httpOnly: true,
         sameSite: "strict",
         maxAge: 30 *24 * 60 * 60 * 1000 // 30 day
     });
 
     return res.status(200).json({
         message: "User logged in successfully",
         token,
         user
     });
   } catch (error) {
       res.status(500).json({message:"Something went wrong"})       
   }
}


const handleLogout=(req,res)=>{
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

const handleCheckUser=(req,res)=>{
     try {
     const token = req.cookies.token;
     console.log("token",token)
     if (!token) {
       return res.status(401).json({ isAuthenticated: false });
     }
     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
       if (err) {
         return res.status(401).json({ isAuthenticated: false });
       }
       res.status(200).json({ isAuthenticated: true, userId: decoded.id });
     });
     
   } catch (error) {
     console.log("ERROR:", error);
     res.status(500).json({ message: "Something went wrong" });
   }

}


export {handleUserLogin,handleUserRegister,handleLogout,handleCheckUser};