import mongoose from "mongoose";
import { DB_URL } from "../config/server.config.js";

// Logger setup
const logger = {
    info: (msg) => console.log(`[INFO] ${msg}`),
    error: (msg) => console.error(`[ERROR] ${msg}`),
    warn: (msg) => console.warn(`[WARN] ${msg}`)
};

// Event listeners setup (outside connectDB to prevent memory leaks)
mongoose.connection.on("error", (err) => {
    logger.error("MongoDB connection error:", err.message);
    process.exit(1);
});

mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB disconnected");
});

process.on("SIGINT", async () => {
    try {
        await mongoose.connection.close();
        logger.info("MongoDB connection disconnected through app termination");
        process.exit(0);
    } catch (err) {
        logger.error("Error closing MongoDB connection:", err);
        process.exit(1);
    }
});


export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        logger.info("Connected to MongoDB");
    } catch (error) {
        logger.error('Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
};
