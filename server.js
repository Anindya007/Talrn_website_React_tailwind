import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/server/routes/auth.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(authRoutes);



export default app;