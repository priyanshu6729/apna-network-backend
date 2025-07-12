const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ServiceProvider = require('../models/ServiceProvider');

exports.verifyUserToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  
  if (!token) return res.status(401).json({ message: 'No token provided (user)' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error('User token error:', err);
    return res.status(401).json({ message: 'Invalid token (user)' });
  }
};

exports.verifyProviderToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided (provider)' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const provider = await ServiceProvider.findById(decoded.id).select('-password');
    if (!provider) return res.status(404).json({ message: 'Service provider not found' });

    req.provider = provider;
    next();
  } catch (err) {
    console.error('Provider token error:', err);
    return res.status(401).json({ message: 'Invalid token (provider)' });
  }
};