// server/models/credentials.js

// Create a model for credentials with reference to division and ou.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const credentialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  division: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'divisions', // Reference to the Division model
    required: true,
  },
  ou: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ous', // Reference to the OU model
    required: true,
  },
});

module.exports = mongoose.model('Credential', credentialSchema);
