const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // Add any other fields you want to include
});

module.exports = mongoose.model('Project', ProjectSchema);
