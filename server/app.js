import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    process.env.ADMIN_URL    || 'http://localhost:3001',
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// Basic route to test API
app.get('/api', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Abeer Label API',
    });
});

// API Routes
app.use('/api/user', userRoutes);

// Root route
app.get('/', (req, res) => {
    const port = process.env.PORT || 4000;
    res.send(`Abeer Label Server is running on ${port}`);
});

export default app;
