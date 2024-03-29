// backend/controllers/userController.js

const Student = require('../models/Student');
const bcrypt = require('bcrypt');

exports.registerStudent = async (req, res) => {
  const { name, rollnumber, studentClass, password } = req.body;

  console.log(name);

  try {
    let user = await Student.findOne({ rollnumber });

    if (user) {
      return res.status(400).json({ message: 'Roll number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new Student({
      name,
      rollnumber,
      studentClass,
      password : hashedPassword
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.loginStudent = async (req, res) => {
  const { rollnumber, password } = req.body;

  try {
    // Check if the student exists in the database
    const student = await Student.findOne({ rollnumber });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(password, student.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
