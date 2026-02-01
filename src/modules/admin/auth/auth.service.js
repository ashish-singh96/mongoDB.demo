import { adminRepository } from "./auth.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config/server.config.js';

class AuthService {

    async login(email, password) {
        try {
            const admin = await adminRepository.findByEmail(email);
            if (!admin || !await bcrypt.compare(password, admin.password)) {
                throw new Error('Invalid credentials');
            }
            const token = jwt.sign({ id: admin._id, email }, JWT_SECRET, { expiresIn: '24h' });
            return { token, admin: { id: admin._id, email, name: admin.name } };
        } catch (error) {
            console.log("error in login", error.message)
            throw error;
        }
    }

    async register(data) {
        try {
            if (await adminRepository.findByEmail(data.email)) {
                const error = new Error('Admin already exists');
                error.statusCode = 409;
                throw error;
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const admin = await adminRepository.create({ ...data, password: hashedPassword });
            return { admin: { id: admin._id, email: admin.email, name: admin.name } };
        } catch (error) {
            console.log("error in registration", error.message)
            throw error;
        }
    }
}

export const authService = new AuthService();