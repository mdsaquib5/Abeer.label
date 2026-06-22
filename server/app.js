import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
    'http://localhost:3000',
    'http://localhost:3001',
].filter(Boolean);

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

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic route to test API
app.get('/api', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Abeer Label API',
    });
});

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Root route
app.get('/', (req, res) => {
    const port = process.env.PORT || 4000;
    res.send(`Abeer Label Server is running on ${port}`);
});

export default app;
