import userModel from "../models/user.model.js";

//Adding address to user profile
const addAddressToUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { street, city, state, zipCode, country } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAddress = { street, city, state, zipCode, country };
    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { addAddressToUserProfile };