// server/models/division.js

// Create a model for division 

const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const Division = mongoose.model('Division', divisionSchema);

module.exports = Division;
