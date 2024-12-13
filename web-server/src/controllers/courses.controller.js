const coursesQueries = require('../queries/courses.queries');

// Add course
const addCourse = async (req, res) => {
    const { courseName, creditHours, grade } = req.body;
    if (!courseName || !creditHours || !grade) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const result = await coursesQueries.addCourse(courseName, creditHours, grade);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error('Error adding course:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await coursesQueries.getAllCourses();
        res.status(200).json(courses);
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete course
const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await coursesQueries.deleteCourse(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        console.error('Error deleting course:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { addCourse, getAllCourses, deleteCourse };
