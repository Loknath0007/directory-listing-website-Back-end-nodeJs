const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/assets', express.static(__dirname + 'assets'));

// Database
connectDB();

// Auth Routes
const authRouter = require('./routes/authRouter');
app.use('/api', authRouter);

// Category Routes
const categoryRouter = require('./routes/categoryRouter');
app.use('/api/categories', categoryRouter);

// Location Routes
const locationRouter = require('./routes/locationRouter');
app.use('/api/location', locationRouter);

// Post Routes
const postRouter = require('./routes/postRouter');
app.use('/api/posts', postRouter);

// User Routes
const userRouter = require('./routes/userRoute');
app.use('/users', userRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
