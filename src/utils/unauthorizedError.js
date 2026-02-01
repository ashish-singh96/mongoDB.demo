export const unauthorizedError = (message = 'Unauthorized access') => {
    const error = new Error(message);
    error.statusCode = 401;
    return error;
};