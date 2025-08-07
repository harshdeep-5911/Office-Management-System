const express = require('express');
const { parse } = require('json2csv');
const Project = require('../models/Project'); // Import your MongoDB model

const router = express.Router();

// Route to download project data as CSV
router.get('/download', async (req, res) => {
  try {
    const projectData = await Project.find(); // Fetch your data from MongoDB

    if (!projectData || projectData.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    const csv = parse(projectData); // Convert data to CSV format
    console.log('Generated CSV:', csv); // Log the CSV for debugging

    res.setHeader('Content-Disposition', 'attachment; filename="project-data.csv"');
    res.setHeader('Content-Type', 'text/csv');

    res.status(200).send(csv); // Send the CSV data as the response
  } catch (error) {
    console.error('Error downloading data:', error);
    res.status(500).json({ message: 'Error fetching data from MongoDB', error: error.message });
  }
});

module.exports = router;
