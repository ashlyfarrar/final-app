const validateCourseData = (data) => {
    const { courseName, creditHours, grade } = data;
    if (!courseName || !creditHours || !grade) {
        throw new Error('Missing required course information');
    }
};

module.exports = { validateCourseData };
