import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: any;
}

export const verifyAndRollSession = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ error: "Access Denied. Please log in." });
    }

    try {
        const secretKey = process.env.JWT_SECRET || "super_secret_key_change_me";
        const verified = jwt.verify(token, secretKey);
        
        req.user = verified;

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 21 * 24 * 60 * 60 * 1000
        });

        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired session." });
    }
};