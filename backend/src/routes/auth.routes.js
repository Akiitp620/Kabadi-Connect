import {Router} from "express";
import {handleUserLogin, handleUserRegister, handleLogout} from "../controllers/auth.controllers.js";
import {authenticateToken} from "../middlewares/auth.middleware.js";


const authRouter = Router();

//user register and login routes
authRouter.post("/signup", handleUserRegister);

authRouter.post("/login", handleUserLogin);

authRouter.post("/logout", authenticateToken, handleLogout);


export default authRouter;