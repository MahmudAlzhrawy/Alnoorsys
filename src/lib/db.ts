import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
    throw new Error("Missing DB_URL environment variable.");
}

console.log('DB_URL:', DB_URL);

export async function dbConection() {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(DB_URL!); 
        }
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error("Failed to connect to MongoDB", e);
        process.exit(1);
    }
}
