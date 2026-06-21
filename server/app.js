import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));

// Basic route to test API
app.get('/api', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Abeer Label API',
    });
});

// Root route
app.get('/', (req, res) => {
    const port = process.env.PORT || 4000;
    res.send(`Abeer Label Server is running on ${port}`);
});

export default app;
