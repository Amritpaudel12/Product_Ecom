
import mongoose from "mongoose";
import { DATABASE_NAME } from "../utils/constants.js"
import dotenv from 'dotenv';
dotenv.config();
console.log("Database Name ", DATABASE_NAME);
console.log("MONGODB_URI ", process.env.MONGODB_URI);
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE_NAME}`);
        console.log(`Database Connected ! HOST NAME ${connection.connection.host}`);
    } catch (error) {
        console.log(`Error occured while connecting to database ${error.message}`);
    }
}

export { connectDB };