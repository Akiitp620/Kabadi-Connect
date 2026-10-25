import {Router} from "express";
import { createScrapItem, getAllScrapItems, getScrapItemById, updateScrapItemById, deleteScrapItemById } from "../controllers/scrap.controllers.js";
import {authenticateToken} from "../middlewares/auth.middleware.js";
import multer from "multer";
import path from "path";


const scrapRouter=Router();

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null,file.fieldname +"-"+Date.now()+ path.extname(file.originalname))
  }
})
 const upload = multer({ storage: storage })

scrapRouter.post("/add", upload.single("image"), authenticateToken, createScrapItem);
scrapRouter.get("/all-scrap", authenticateToken, getAllScrapItems);
scrapRouter.get("/my-scrap", authenticateToken, getScrapItemById);
scrapRouter.put("/update/:id", authenticateToken, updateScrapItemById);
scrapRouter.delete("/delete/:id", authenticateToken, deleteScrapItemById);

export default scrapRouter;