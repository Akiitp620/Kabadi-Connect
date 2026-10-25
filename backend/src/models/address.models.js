import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    // Contact details at the pickup location
  contactName: {
    type: String,
    required: [true, 'Contact name is required'],
    trim: true
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone number is required'],
    trim: true
  },
  
  // Street details
  addressLine1: {
    type: String,
    required: [true, 'Street address is required'],
    trim: true
  },
  addressLine2: {
    type: String,
    trim: true // Unit, building, apartment, suite number
  },
  
  // Regional details
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State/Province/Region is required'],
    trim: true
  },
  postalCode: {
    type: String,
    required: [true, 'Postal/ZIP code is required'],
    trim: true
  },
  },
  { timestamps: true }
);

export const Address = mongoose.model("Address", addressSchema);