// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const authStudent = require('../controllers/authStudent');
const authTeacher = require('../controllers/authTeacher');

// Register a new user
router.post('/student/register', authStudent.registerStudent);
router.post('/student/login', authStudent.loginStudent);
router.post('/teacher/register', authTeacher.registerTeacher);
router.post('/teacher/login', authTeacher.loginTeacher);
router.get('/teacher', authTeacher.requireAuth,  authTeacher.profileTeacher);

module.exports = router;
