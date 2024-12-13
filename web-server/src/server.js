const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const coursesRoutes = require('./routes/courses.routes'); // Import the courses routes

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/courses', coursesRoutes); // Use the courses routes

// Handle 404 errors (if a route is not found)
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

