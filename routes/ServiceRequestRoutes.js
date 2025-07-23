const express = require('express');
const ServiceRequest = require('../models/ServiceRequest ');
const router = express.Router();

// CREATE a service request
router.post('/', async (req, res) => {
  try {
    const request = new ServiceRequest(req.body);
    const savedRequest = await request.save();
    res.status(201).json({ success: true, data: savedRequest });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET all service requests
router.get('/', async (req, res) => {
  try {
    const requests = await ServiceRequest.find()
      .populate('user_id')
      .populate('service_id')
      .populate('provider_id');
    res.json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET service requests by user ID
router.get('/user/:user_id', async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ user_id: req.params.user_id })
      .populate('service_id')
      .populate('provider_id');
    res.json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET service requests by service ID
router.get('/service/:service_id', async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ service_id: req.params.service_id })
      .populate('user_id')
      .populate('provider_id');
    res.json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET service requests by provider ID
router.get('/provider/:provider_id', async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ provider_id: req.params.provider_id })
      .populate({
        path: 'user_id',
        select: ['phone', 'name'],
      })
      .populate({
        path: 'service_id',
        select: 'category',
      })
      .sort({ request_date: -1 });
    res.json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE a full service request
router.put('/:id', async (req, res) => {
  try {
    const updated = await ServiceRequest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// ✅ UPDATE status only
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['requested', 'accepted', 'in_progress', 'completed', 'cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }

  try {
    const updated = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Service request not found' });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE a service request
router.delete('/:id', async (req, res) => {
  try {
    await ServiceRequest.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Service request deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
