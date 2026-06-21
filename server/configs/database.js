import mongoose from "mongoose";

const mongoConnection = async () => {
    mongoose.connection.on('connected', () => {
        console.log('MongoDB Connected Successfully!');
    });

    // I changed maatikalaa to abeer-label to match your project name. 
    // If you specifically want 'maatikalaa', you can change it back.
    await mongoose.connect(`${process.env.MONGO_URI}/abeer-label`);
}

export default mongoConnection;
