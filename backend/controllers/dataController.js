const asyncHandler = require('express-async-handler');
const YourModel = require('../models/yourModel'); 

const getDataFile = asyncHandler(async (req, res) => {
  const data = await YourModel.find(); 
  const fileContent = JSON.stringify(data, null, 2); 

  
  res.setHeader('Content-Disposition', 'attachment; filename="project-data.json"');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(fileContent);
});

module.exports = { getDataFile };
