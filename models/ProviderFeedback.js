const mongoose = require('mongoose');

const providerFeedbackSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider',
    required: true,
  },
  rating: { type: Number, min: 1, max: 5, required: true },
  feedbackText: { type: String },
  tags: [String],
  recommend: { type: Boolean },
 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ProviderFeedback', providerFeedbackSchema);