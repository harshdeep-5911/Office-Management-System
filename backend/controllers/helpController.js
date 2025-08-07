const Help = require('../models/Help');

// Submit Help message (Contact Us)
const createHelpMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // Validation: Check if message exists
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create and save new help message
    const newHelp = new Help({ message });
    await newHelp.save();

    // Return success response
    res.status(201).json({ message: 'Help message submitted successfully', data: newHelp });
  } catch (err) {
    // Error handling
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all Help messages (optional functionality)
const getHelpMessages = async (req, res) => {
  try {
    const helpMessages = await Help.find();
    res.status(200).json({ data: helpMessages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createHelpMessage,
  getHelpMessages
};
