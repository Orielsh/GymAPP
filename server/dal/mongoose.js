const uri = require("../config/db")
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      await mongoose.connect(uri);
      console.log('Successfully connected to MongoDB')
    } catch (err) {
      console.log('Error connecting to MongoDB', err.message)
      process.exit(1)
    }
  };

module.exports = connectDB;