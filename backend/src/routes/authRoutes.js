// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const authStudent = require('../controllers/authStudent');
const authTeacher = require('../controllers/authTeacher');

// Register a new user
router.post('/student/register', authStudent.registerStudent);
router.post('/student/login', authStudent.loginStudent);
router.get('/student/:rollnumber', authStudent.profileStudent);
router.post('/teacher/register', authTeacher.registerTeacher);
router.post('/teacher/login', authTeacher.loginTeacher);
router.get('/teacher/:username',  authTeacher.profileTeacher);
router.get('/students', authStudent.allStudent);
router.put('/students/:rollnumber/mark-present',authStudent.presentStudent);
router.put('/students/:rollnumber/mark-absent', authStudent.absentStudent);

module.exports = router;
