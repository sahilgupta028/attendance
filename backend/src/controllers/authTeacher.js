const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');

exports.registerTeacher = async (req, res) => {
  const { username, name, contact, subject, password } = req.body;

  console.log(username);

  try {
    let user = await Teacher.findOne({ username });

    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new Teacher({
      username,
      name,
      contact,
      subject,
      password : hashedPassword
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });


  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.loginTeacher = async (req, res) => {
  const { username, password } = req.body;

  try {
    const teacher = await Teacher.findOne({username });

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    const isPasswordMatch = await bcrypt.compare(password,teacher.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

     const token = jwt.sign({ userId: teacher._id }, SECRET);
    res.status(200).json({ token });
    console.log("login done");

  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.profileTeacher = async (req, res) => {
  try {
    const profile = await Teacher.findOne({ username: req.params.username });
    console.log(profile);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};