import mongoose from "mongoose";

const mongoConnection = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('MongoDB Connected Successfully!');
        });
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB error:', err);
        });

        await mongoose.connect(`${process.env.MONGO_URI}/abeer-label`);
    } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    }
}

export default mongoConnection;