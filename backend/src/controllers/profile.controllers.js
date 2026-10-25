//profile controller
//GET /api/profile
import User from "../models/user.model.js";

export const handleGetProfile = async (req, res) => {   
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: error.message });
    }
};

//Update profile controller
//PUT /api/profile/update   
export const handleUpdateProfile = async (req, res) => {
    try {
        const { name, phone, village, district } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select("-password");
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: error.message });
    }
};      

