// server/routes/token-verification.js

// this was created for testing

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


// This route will verify the token and send a response
router.get('/verify', (req, res) => {
  console.log('Verify route accessed');
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ error: 'Token not provided' });
  }
  
  // Remove the "Bearer " prefix
  const tokenValue = token.split(' ')[1];
  
  // Verify the token using the extracted value
  jwt.verify(tokenValue, 'cooltech', (err, decoded) => {
    if (err) {
      console.log('Error during token verification:', err);
      return res.status(403).json({ error: 'Invalid token' });
    }
  
    // Log the decoded payload
    console.log('Token Payload:', decoded);
  
    res.status(200).json({ message: 'Token is valid', payload: decoded });
  });
  
});



module.exports = router;
