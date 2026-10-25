import Scrap from "../models/scrap.model.js";
import {v2 as cloudinary }from "cloudinary"
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


//Creating Scrap item
export const createScrapItem = async (req, res) => {
  try {
    const sellerId = req.user?._id || req.user?.id;
    const filepath=req.file?.path;
    console.log(filepath)
    const cloudinaryRes= await cloudinary.uploader.upload(filepath,{
      resource_type:"auto",
      folder:"crops"
    })
    const scrapImgUrl=cloudinaryRes.url;
    const { title,category,quantity,unit, description, price } = req.body;
    const ScrapItem = await Scrap.create({sellerId, title, category, quantity, unit, scrapImgUrl, description, price });
    res.status(201).json({ message: "Scrap item created successfully", ScrapItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//getting all Scrap items

export const getAllScrapItems = async (req, res) => {
  try {
    const ScrapItems = await Scrap.find();
    res.status(200).json({ message: "Scrap items retrieved successfully", ScrapItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//getting Scrap item by id

export const getScrapItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const ScrapItem = await Scrap.findById(id);
        if (!ScrapItem) {
            return res.status(404).json({ message: "Scrap item not found" });
        }
        res.status(200).json({ message: "Scrap item retrieved successfully", ScrapItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//getting Scrap item by user id

export const getScrapItemsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const ScrapItems = await Scrap.find({ userId });
        res.status(200).json({ message: "Scrap items retrieved successfully", ScrapItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//getting Scrap item by category

export const getScrapItemsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const ScrapItems = await Scrap.find({ category });
        res.status(200).json({ message: "Scrap items retrieved successfully", ScrapItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//updating Scrap item by id

export const updateScrapItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, quantity, unit, scrapImgUrl, description, price, address, city, condition } = req.body;
        const ScrapItem = await Scrap.findByIdAndUpdate(id, { title, category, quantity, unit, scrapImgUrl, description, price, address, city, condition }, { new: true });
        if (!ScrapItem) {
            return res.status(404).json({ message: "Scrap item not found" });
        }
        res.status(200).json({ message: "Scrap item updated successfully", ScrapItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//deleting Scrap item by id

export const deleteScrapItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const ScrapItem = await Scrap.findByIdAndDelete(id);
        if (!ScrapItem) {
            return res.status(404).json({ message: "Scrap item not found" });
        }
        res.status(200).json({ message: "Scrap item deleted successfully", ScrapItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
