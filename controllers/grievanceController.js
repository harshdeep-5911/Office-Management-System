const Grievance = require('../models/Grievance');


const createGrievance = async (req, res) => {
  try {
    const { title, description } = req.body;

    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newGrievance = new Grievance({ title, description });
    await newGrievance.save();

    res.status(201).json({ message: 'Grievance submitted successfully', data: newGrievance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// View all Grievances
const getGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find();
    res.status(200).json({ data: grievances });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update Grievance status
const updateGrievanceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const updatedGrievance = await Grievance.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedGrievance) {
      return res.status(404).json({ error: 'Grievance not found' });
    }

    res.status(200).json({ message: 'Grievance status updated', data: updatedGrievance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createGrievance,
  getGrievances,
  updateGrievanceStatus,
};
