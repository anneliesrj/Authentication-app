const mongoose = require('mongoose');
const User = require('./models/user'); 
const Credential = require('./models/credential'); 

// connection URL 
const connectionURL = 'mongodb+srv://anneliesrj:%40zAjjGbLWaULt46@cluster0.mexnhxu.mongodb.net/?retryWrites=true&w=majority';

// Connect to the MongoDB database
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample user data
const sampleUserData = [
  {
    username: 'user1',
    password: 'password1',
    role: 'normal',
  },
  {
    username: 'user2',
    password: 'password2',
    role: 'management',
  },
  {
    username: 'user3',
    password: 'password3',
    role: 'admin',
  },
];

// Sample credential data
const sampleCredentialData = [
  {
    name: 'Website Login',
    username: 'webuser',
    password: 'webpassword',
    division: 'Finance',
    ou: 'News Management',
  },
  {
    name: 'Server Access',
    username: 'serveruser',
    password: 'serverpassword',
    division: 'IT',
    ou: 'Software Reviews',
  },
  {
    name: 'Financial Account',
    username: 'financeuser',
    password: 'financepassword',
    division: 'Finance',
    ou: 'Opinion Publishing',
  },
];

// Insert sample data into the database
User.insertMany(sampleUserData)
  .then(() => {
    console.log('Sample user data added to the database');
    return Credential.insertMany(sampleCredentialData);
  })
  .then(() => {
    console.log('Sample credential data added to the database');
  })
  .catch((error) => {
    console.error('Error adding sample data:', error);
  })
  .finally(() => {
    // Close the database connection
    mongoose.connection.close();
  });
