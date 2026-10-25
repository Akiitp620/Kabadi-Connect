import {Router} from "express";
import { handleGetProfile,handleUpdateProfile } from "../controllers/profile.controllers.js";
import {authenticateToken} from "../middlewares/auth.middleware.js";

const profileRouter=Router();
profileRouter.get("/", authenticateToken, handleGetProfile);
profileRouter.put("/", authenticateToken, handleUpdateProfile);
export default profileRouter;