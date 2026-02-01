import httpContext from "express-http-context";

// Simple logger
const logger = {
    info: (msg) => console.log(`[INFO] ${msg}`)
};

export const response = (code, message, data, req = {}) => {
    const loginDetails = httpContext.get("loginDetails");
    const logDetails = {
        method: req.method || 'UNKNOWN',
        endPoint: req.originalUrl || 'UNKNOWN',
        userId: loginDetails?.loginId || 'ANONYMOUS',
        code,
        message,
        timestamp: new Date().toISOString()
    };
    try {
        logger.info(JSON.stringify(logDetails));
    } catch (logError) {
        console.error('Failed to log response:', logError.message);
    }

    return { code, message, data };
};