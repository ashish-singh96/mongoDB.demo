import { authService } from './auth.service.js';
import { response } from '../../../utils/apiResponse.js';


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        const responseData = response(200, "login successfull", result, req);
        res.status(200).json(responseData);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        const responseData = response(201, "register successfull", result, req);
        res.status(201).json(responseData);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const responseData = response(statusCode, error.message, null, req);
        res.status(statusCode).json(responseData);
    }
};

export const logout = (req, res) => {
    try {
        const  result = response(200, "logout successfull", null, req);
        res.status(200).json(result);
    } catch (error) {
        console.log("error in logout", error.message);
        throw error;
    }
};