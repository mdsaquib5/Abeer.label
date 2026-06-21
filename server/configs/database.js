import mongoose from "mongoose";

const mongoConnection = async () => {
    mongoose.connection.on('connected', () => {
        console.log('MongoDB Connected Successfully!');
    });

    await mongoose.connect(`${process.env.MONGO_URI}/abeer-label`);
}

export default mongoConnection;