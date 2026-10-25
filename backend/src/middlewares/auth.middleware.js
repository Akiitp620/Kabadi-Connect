// middleware/authenticate.js
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";

//getting token from cookie and verifying


export const authenticateToken =async(req, res, next) => {
  // Get the token from the 'accessToken' cookie
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    const user = await userModel
      .findById(decoded.id)
      .select("-password"); 

    req.user = user;
    next(); // Continue to the next middleware or route handler
  
};










//getting token from header and verifying



// const authenticate = (req, res, next) => {
//   // Get the token from the 'Authorization' header (e.g., "Bearer TOKEN")
//   const authHeader = req.header('Authorization');
//   if (!authHeader) {
//     return res.status(401).json({ message: 'Authorization token is required.' });
//   }

//   // Extract the token part
//   const token = authHeader.split(' ')[1]; 
//   if (!token) {
//     return res.status(401).json({ message: 'Authorization token is required.' });
//   }

//   try {
//     // Verify the token using the secret key
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // Attach the decoded user information to the request object
//     req.user = decoded.user;
//     // Call the next middleware/route handler
//     next(); 
//   } catch (err) {
//     // Handle invalid tokens
//     res.status(401).json({ message: 'Invalid token.' });
//   }
// };

// module.exports = authenticate;
