const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider' },
  title: String,
  category: String,
  description: String,
  tags: [String],
  experience_level: Number,
  contact: String,
}, {
  timestamps: true 
});

module.exports = mongoose.model('Service', serviceSchema);
