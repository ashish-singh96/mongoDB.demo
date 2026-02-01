import Joi from 'joi';

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
        'string.empty': 'Password cannot be empty'
    })
});

const registerSchema = Joi.object({
    fullName: Joi.string().min(2).required().messages({
        'string.min': 'FullName must be at least 2 characters long',
        'any.required': 'FullName is required',
        'string.empty': 'FullName cannot be empty'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
        'string.empty': 'Password cannot be empty'
    })
});

export const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const message = error.details[0].message;
        return res.status(400).json({  code: 400, message: message, data: message });
    }
    next();
};

export const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const message = error.details[0].message;
        return res.status(400).json({    code: 400,   message: message,   data: message });
    }
    next();
};