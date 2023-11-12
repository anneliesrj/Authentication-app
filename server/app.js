// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the models
const User = require('./models/user');
const Credential = require('./models/credential');
const OU = require('./models/ou'); 
const Division = require('./models/division'); 

// Import the routes
const authRouter = require('./routes/auth');
const credentialsRoute = require('./routes/credentials');
const tokenVerificationRoute = require('./routes/token-verification');
const assignRoute = require('./routes/assign');
const userRoute = require('./routes/users');
const ouDivisionRoute = require('./routes/ouDivision');


const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// MongoDB Atlas connection URI 
const uri = 'mongodb+srv://anneliesrj:%40zAjjGbLWaULt46@cluster0.mexnhxu.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());

// Use routes
app.use(authRouter);
app.use(credentialsRoute);
app.use(tokenVerificationRoute);
app.use(assignRoute);
app.use(userRoute);
app.use(ouDivisionRoute);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
