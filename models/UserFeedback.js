const mongoose = require('mongoose');

const userFeedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  feedbackText: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  recommend: {
    type: Boolean,
  },
 
  feedbackType: {
    type: String,
    enum: ['service'],
    default: 'service',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UserFeedback', userFeedbackSchema);