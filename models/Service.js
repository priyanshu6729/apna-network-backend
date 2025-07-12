const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider' },
  title: String,
  category: String,
  description: String,
  tags: [String],
  experience_level: String,
  contact: String,
  images: [String],
  active: { type: Boolean, default: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Service', serviceSchema);
