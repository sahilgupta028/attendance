const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');

exports.registerTeacher = async (req, res) => {
  const { name, contact, subject, password } = req.body;

  console.log(name);

  try {
    let user = await Teacher.findOne({ name });

    if (user) {
      return res.status(400).json({ message: 'Name already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new Teacher({
      name,
      contact,
      subject,
      password : hashedPassword
    });

    await user.save();

    const token = await user.generateToken();

    res.status(201).json({ message: 'User registered successfully' , token: token , userId: user._id.toString()});

    console.log(token);


  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.loginTeacher = async (req, res) => {
  const { name, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ name });

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    const isPasswordMatch = await bcrypt.compare(password,teacher.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = await teacher.generateToken();
    res.status(200).json({ token });

    console.log("login done");
    console.log(token);

  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  const tokenString = token.split(' ')[1]; 
  console.log("Token: ", tokenString);

  console.log(SECRET);

  jwt.verify(tokenString, SECRET, (err, decodedToken) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    console.log("Decoded Token: ", decodedToken);
    req.userId = decodedToken.userId;
    next();
  });
};


// exports.requireAuth = (req, res, next) => {
//   const token = req.headers.authorization;

//   console.log("hi");
//   console.log(token);

//   if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//   }

//   console.log("token");
//   console.log(token);

//   console.log(req.headers.authorization);

//   jwt.verify(token, SECRET, (err, decodedToken) => {
//       if (err) {
//           return res.status(401).json({ message: 'Invalid token' });
//       }

//       req.userId = decodedToken.userId;
//       next();
//   });
// };


exports.profileTeacher = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log("token2");
    console.log(token);

    jwt.verify(token, SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const user = await Teacher.findById(decodedToken.userId);

      console.log(user);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ user: { name: user.name, subject: user.subject } });
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};