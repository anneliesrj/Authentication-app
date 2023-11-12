// server/models/user.js

// Create a model for a user with role, and reference to OU and division
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  ou: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OU', // Refer to the OU model
  },
  division: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Division', // Refer to the Division model
  },
});

module.exports = mongoose.model('User', userSchema);
