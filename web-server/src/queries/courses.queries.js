const db = require('../db-config');

// Add course
const addCourse = (courseName, creditHours, grade) => {
    const query = 'INSERT INTO courses (course_name, credit_hours, grade) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [courseName, creditHours, grade], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// Get all courses
const getAllCourses = () => {
    const query = 'SELECT * FROM courses';
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Delete course
const deleteCourse = (id) => {
    const query = 'DELETE FROM courses WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = { addCourse, getAllCourses, deleteCourse };
