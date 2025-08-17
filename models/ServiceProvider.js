const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  fatherName: String,
  location: String,
  aadhar: Number,
  village: String,
   dob: {
    type: Date,
  },
   tehsil: {
    type: String,
  },
  district: {
    type: String,
  },
  panchayat:{
    type: String
  },
  availability: {
    from: { type: String },                                     
    to: { type: String }
  },
  created_at: { type: Date, default: Date.now },               
  last_login: { type: Date }                                   
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);