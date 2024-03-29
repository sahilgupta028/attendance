const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const { DATABASE_URL } = process.env;

app.use(bodyParser.json());

app.use(cors());

app.use(cookieParser());

app.use('/api/v1', authRoutes);

// Connect to MongoDB
mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });