import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import AppError from "../errors/AppErrors";

import authConfig from "../../config/auth";

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT token is missing.", 401);
    }

    const { secret } = authConfig.jwt;

    const [, token] = authHeader.split(" ");

    try {
        const decoded = verify(token, secret);

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new AppError("invalid JWT token.", 401);
    }
}

export default ensureAuthenticated;
