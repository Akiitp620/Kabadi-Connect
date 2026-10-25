import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["seller", "buyer"],
    required: true
  },
  name: {
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  businessname:{
    type:String,
    require:true
  },
  phone: {
    type:String,
    require:true
  },
  password: {
    type:String,
    require:true
  },
   city:{
    type:String,
    require:true
  },
   

},{timeseries:true});

export default mongoose.model("User", userSchema);