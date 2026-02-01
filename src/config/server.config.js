import dotenv from "dotenv";

dotenv.config({ debug: false });

export const PORT = process.env.PORT || 3001;
export const DB_URL = process.env.DB_URL || (() => { throw new Error('DB_URL environment variable is required'); });
export const IMAGE_SERVER = process.env.IMAGE_SERVER || 'http://localhost:3001';
export const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';