// models/ServiceRequest.js
const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  provider_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider',
    required: true,
  },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'in_progress', 'completed', 'cancelled'],
    default: 'requested',
  },
  request_date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
