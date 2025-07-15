// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g., "carpenters"
  title: { type: String, required: true },             // e.g., "Carpenters"
  subtitle: String,
  image: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
