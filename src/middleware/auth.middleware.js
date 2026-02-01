import jwt from "jsonwebtoken";
import httpContext from "express-http-context";

import UnauthorizedError from "../error/unAuthorize.error.js";
import { JWT_SECRET } from "../config/server.config.js";

export const verifyUserToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(new UnauthorizedError("Authorization Code is Missing"));
        }

        let validateToken;
        try {
            validateToken = jwt.verify(authHeader, JWT_SECRET);
        } catch (jwtError) {
            return next(new UnauthorizedError("Invalid or expired token"));
        }

        if (!validateToken.loginId) {
            return next(new UnauthorizedError("Invalid token payload"));
        }

        const userProfileService = container.resolve('userProfileService');
        const fetchAdminProfile = await userProfileService.getProfileViaId(
            validateToken.loginId
        );

        if (!fetchAdminProfile) {
            return next(new UnauthorizedError("User not found"));
        }

        if (authHeader !== fetchAdminProfile.token) {
            return next(new UnauthorizedError("Invalid Token"));
        }

        httpContext.set("loginDetails", validateToken);
        next();
    } catch (err) {
        next(err);
    }
};