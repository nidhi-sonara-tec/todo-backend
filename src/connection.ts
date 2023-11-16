// Connect to MongoDB
require('dotenv').config();

const mongoose = require('mongoose');

//Connect to database
export const connectToDatabase = async () => {
    await mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error:any) => {
      console.error('Error connecting to MongoDB', error);
    })
};

// Disconnect from the database
export const closeDB = async () => {
  await mongoose.connection.close();
};

 