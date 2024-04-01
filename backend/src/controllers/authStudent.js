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
    const student = await Student.findOne({ rollnumber });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

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

exports.profileStudent = async (req, res) => {
  try {
    const profile = await Student.findOne({ rollnumber: req.params.rollnumber });
    console.log(req.params);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.allStudent = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.presentStudent = async (req, res) => {
  try {
    const { rollnumber } = req.params;
    const student = await Student.findOne({ rollnumber });
    student.totalPresent += 1;
    student.totalClasses += 1;
    student.lastSeen = new Date();
    await student.save();
    res.json(student);
  } catch (error) {
    console.error('Error marking student present:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.absentStudent = async (req, res) => {
  try {
    const { rollnumber } = req.params;
    const student = await Student.findOne({ rollnumber });
    student.totalClasses += 1;
    await student.save();
    res.json(student);
  } catch (error) {
    console.error('Error marking student absent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.students = async (req, res) => {
  try {
    const { name, totalPresent, totalClasses } = req.body;
    const student = new Student({ name, totalPresent, totalClasses });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    console.error('Error adding new student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
