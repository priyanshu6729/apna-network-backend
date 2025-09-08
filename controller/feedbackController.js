const UserFeedback = require('../models/UserFeedback');
const ProviderFeedback = require('../models/ProviderFeedback');


exports.submitUserFeedback = async (req, res) => {
  try {
    const { rating, feedbackText, tags, recommend, anonymous,id} = req.body;

    const feedback = new UserFeedback({
      user: id,
      rating,
      feedbackText,
      tags,
      recommend,
      anonymous,
    });

    await feedback.save();
    res.status(200).json({ success: true, message: 'User feedback submitted.' });
  } catch (err) {
    console.error('User feedback error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.submitProviderFeedback = async (req,res) => {
  try {
    const { rating, feedbackText, tags, recommend, anonymous } = req.body;

    const feedback = new ProviderFeedback({
      provider: req.provider.id,
      rating,
      feedbackText,
      tags,
      recommend,
      anonymous,
    });

    await feedback.save();
    res.status(200).json({ success: true, message: 'Provider feedback submitted.' });
  } catch (err) {
    console.error('Provider feedback error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};