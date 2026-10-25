//ceateing trade request controller
import TradeRequest from "../models/tradeRequest.model.js";
import User from "../models/user.model.js";

//create trade request
export const createTradeRequest = async (req, res) => {
  try {
    const { userId, tradeDetails } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const tradeRequest = await TradeRequest.create({ userId, tradeDetails });
    res.status(201).json({ message: "Trade request created successfully", tradeRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//get all trade requests
export const getAllTradeRequests = async (req, res) => {
  try { 
    const tradeRequests = await TradeRequest.find();
    res.status(200).json({ message: "Trade requests retrieved successfully", tradeRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get trade request by id
export const getTradeRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const tradeRequest = await TradeRequest.findById(id);
    if (!tradeRequest) {
      return res.status(404).json({ message: "Trade request not found" });
    }
    res.status(200).json({ message: "Trade request retrieved successfully", tradeRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

