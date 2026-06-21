import app from './app.js';
import dotenv from 'dotenv';
import mongoConnection from './configs/database.js';

// Load environment variables
dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 4000;

// Connect to Database
mongoConnection();

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    });
});
