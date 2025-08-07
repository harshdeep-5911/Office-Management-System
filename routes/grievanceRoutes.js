const express = require('express');
const router = express.Router();

// Importing controller functions
const { createGrievance, getGrievances, updateGrievanceStatus } = require('../controllers/grievanceController');

// Submit Grievance (using controller function)
router.post('/', createGrievance);

// View all Grievances (using controller function)
router.get('/', getGrievances);

// Update Grievance status (using controller function)
router.put('/:id', updateGrievanceStatus);

module.exports = router;
