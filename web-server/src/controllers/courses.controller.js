const getConnection = require('../db-config');
const coursesQueries = require('../queries/courses.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

// Get all courses
exports.getAllCourses = async (req, res) => {
  const con = await getConnection().catch((err) => {
    console.error("Error connecting to database:", err);
    throw err;
  });

  // Execute the query to get all courses
  const courses = await query(con, coursesQueries.ALL_COURSES, []).catch(err => {
    console.error("Error executing query:", err);
    return serverError(res)(err);
  });

  if (!courses.length) {
    return res.status(200).json([]); // Return an empty array if no courses are available
  }

  res.json(courses);
};

// Add a new course
exports.addCourse = async (req, res) => {
  const { courseName, creditHours, grade } = req.body;

  // Validation
  if (!courseName || !creditHours || !grade) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (typeof creditHours !== 'number' || creditHours <= 0) {
    return res.status(400).json({ message: 'Invalid credit hours' });
  }
  if (isNaN(grade) || grade < 0 || grade > 4) {
    return res.status(400).json({ message: 'Invalid grade. It should be a decimal between 0 and 4' });
  }

  const con = await getConnection().catch((err) => {
    console.error("Error connecting to database:", err);
    throw err;
  });

  const result = await query(con, coursesQueries.INSERT_COURSE(courseName, creditHours, grade)).catch(err => {
    console.error("Error executing query:", err);
    return serverError(res)(err);
  });

  if (result.affectedRows !== 1) {
    return res.status(500).json({ msg: 'Unable to add course.' });
  }

  res.status(201).json({ msg: 'Course added successfully!', id: result.insertId });
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;  // Get course ID from request parameters

  try {
    const con = await getConnection();  // Get database connection

    // Execute the query to delete the course by its ID
    const result = await query(con, coursesQueries.DELETE_COURSE(id)); 

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Course not found' });  // Course not found
    }

    res.status(200).json({ msg: 'Course deleted successfully' });  // Successfully deleted
  } catch (err) {
    console.error('Error deleting course:', err);  // Log error if query fails
    return serverError(res)(err);  // Handle server error
  }
};