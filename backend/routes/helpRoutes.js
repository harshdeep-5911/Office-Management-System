const express = require('express');
const router = express.Router();

// Import the controller functions
const { createHelpMessage, getHelpMessages } = require('../controllers/helpController');

// Submit Help message (Contact Us) - Uses the controller function
router.post('/', createHelpMessage);

// Optional route to get all Help messages (if needed)
router.get('/', getHelpMessages);

module.exports = router;
