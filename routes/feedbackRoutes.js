const express = require('express');
const router = express.Router();


const {submitUserFeedback , submitProviderFeedback}=require('../controller/feedbackController.js');
const {verifyUserToken,verifyProviderToken}=require('../middleware/authMiddleware.js');

router.post('/userfeedback',verifyUserToken,submitUserFeedback);
router.post('/providerfeedback',verifyProviderToken,submitProviderFeedback);


module.exports = router;