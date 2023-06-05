const mongoose = require('mongoose');
const otpschema= new mongoose.Schema({
    email: {
        type: String,
        // required: true,
        unique: true,
        lowercase: true,
      },
      mobile: {
        type: String,
        required: true,
      },
      otp: {
        type: String,
        required: true
      },
      createdAt: { 
        type: Date, 
        default: Date.now, 
        index: { expires: 400 } 
    },
    },
    // { timeStamps: true }
  );
  
  module.exports = mongoose.model("otp", otpschema);
  
