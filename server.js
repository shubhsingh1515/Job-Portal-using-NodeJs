
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';

// Load env variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/test',testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoutes);

//validation middleware
app.use(errorMiddleware)

// Port
const PORT = process.env.PORT || 8080;

// Listen
app.listen(8080, () => {
  console.log(`Server is running on ${process.env.DEV_MODE} on port ${PORT}`);
});