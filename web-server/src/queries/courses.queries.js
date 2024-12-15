exports.CREATE_COURSES_TABLE = `
  CREATE TABLE IF NOT EXISTS courses (
    id INT NOT NULL AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL,
    credit_hours INT NOT NULL,
    grade DECIMAL(3, 2) NOT NULL,
    PRIMARY KEY (id)
  )
`;


// Add a course for a user
exports.INSERT_COURSE = (courseName, creditHours, grade) => {
    const escapedCourseName = courseName.replace(/'/g, "\\'");
    return `INSERT INTO courses (course_name, credit_hours, grade) 
            VALUES ('${escapedCourseName}', ${creditHours}, ${grade})`; 
  };
  
  // Get all courses for a user
  exports.ALL_COURSES = `SELECT * FROM courses`;
  
  // Delete a course for a user
  exports.DELETE_COURSE = (courseId) =>
    `DELETE FROM courses WHERE id = ${courseId}`;
  