const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', adminSchema);