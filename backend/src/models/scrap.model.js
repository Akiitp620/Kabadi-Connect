import mongoose from "mongoose";

const ScrapSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
    },

    price: {
      type: Number,
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    unit: {
      type: String,
    },
    pricePerUnit: {
      type: Number,
      default: 0
    },

    description: {
      type: String
    },
    scrapImgUrl: {
      type: String
    },
    address: {
      type: String
    },
    city: {
      type: String
    },
    condition: {
      type: String,
    },
    prefrence: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Scrap = mongoose.model("Scrap", ScrapSchema);

export default Scrap;