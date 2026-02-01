import BaseError from "./base.error.js";

class UnauthorizedError extends BaseError {
    constructor(message, data) {
        super(401, message, data);
    }
}

export default UnauthorizedError;