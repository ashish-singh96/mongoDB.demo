import BaseError from "./base.error.js";

class ForbiddenError extends BaseError {
    constructor(message = "Access forbidden") {
        super(message, 403);
        this.name = "ForbiddenError";
    }
}

export default ForbiddenError;