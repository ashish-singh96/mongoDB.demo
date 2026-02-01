import BaseError from "./base.error.js";

class NotFoundError extends BaseError {
    constructor(message, data) {
        super(404, message, data);
    }
}

export default NotFoundError;