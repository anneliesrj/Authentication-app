const mongoose = require('mongoose');
const OU = require('./models/ou'); 
const Division = require('./models/division'); 

// connection URL 
const connectionURL = 'mongodb+srv://anneliesrj:%40zAjjGbLWaULt46@cluster0.mexnhxu.mongodb.net/?retryWrites=true&w=majority';

// Connect to the MongoDB database
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample OU data
const sampleOUData = [
  {
    name: 'News Management',
  },
  {
    name: 'Software Reviews',
  },
  {
    name: 'Hardware Reviews',
  },
  {
    name: 'Opinion Publishing',
  },
];

// Sample Division data
const sampleDivisionData = [
  {
    name: 'Finance',
  },
  {
    name: 'IT',
  },
  {
    name: 'Writing',
  },
  {
    name: 'Development',
  },
];

// Insert sample OU data into the database
OU.insertMany(sampleOUData)
  .then(() => {
    console.log('Sample OU data added to the database');
  })
  .catch(error => {
    console.error('Error adding sample OU data:', error);
  })
  .finally(() => {
    // Close the database connection
    mongoose.connection.close();
  });
