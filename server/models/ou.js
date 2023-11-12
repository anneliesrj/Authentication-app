// server/models/ou.js

// Create a model for a Organisational Unit
const mongoose = require('mongoose');

const ouSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const OU = mongoose.model('OU', ouSchema);

module.exports = OU;

