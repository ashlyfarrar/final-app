const express = require('express');
const coursesController = require('../controllers/courses.controller');

const router = express.Router();

// Define routes for courses
router.post('/', coursesController.addCourse);
router.get('/', coursesController.getAllCourses);
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;
