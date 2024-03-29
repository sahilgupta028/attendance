// backend/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollnumber: {
    type: String,
    required: true,
    unique: true
  },
  studentClass: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Student = mongoose.model('Student', userSchema);

module.exports = Student;
