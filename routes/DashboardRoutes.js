const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controller/dashboardController');
const {verifyAdminToken }= require('../middleware/authMiddleware')

router.get('/stats', verifyAdminToken, getDashboardStats);

module.exports = router;
