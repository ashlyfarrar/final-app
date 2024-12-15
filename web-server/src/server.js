require('dotenv').config(); // Add this line at the top

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const coursesRoutes = require('./routes/courses.routes');
const { error404, error500 } = require('./middleware/errors.middleware');

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); // Ensure this path is correct
app.use('/api/courses', coursesRoutes);

// Handle 404 requests
app.use(error404);

// Handle 500 requests
app.use(error500);

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});
