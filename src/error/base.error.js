/**
 * Base error class for custom application errors
 */
class BaseError extends Error {
    /**
     * @param {number} code - HTTP status code
     * @param {string} message - Error message
     * @param {any} data - Additional error data
     */
    constructor(code, message, data = null) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.data = data;

        // Optional: maintain proper stack trace (Node.js)
        Error.captureStackTrace?.(this, this.constructor);
    }
}

export default BaseError;