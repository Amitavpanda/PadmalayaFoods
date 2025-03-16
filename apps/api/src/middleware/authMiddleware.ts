import { Request, Response, NextFunction } from 'express';
import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from '../utils/index.js';

export function authenticateAccessToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Auth Header Missing or Invalid');
        return res.status(401).json({ message: 'Access token missing or invalid' });
    }

    const token: any = authHeader.split(' ')[1];

    try {
        const user = verifyAccessToken(token);
        console.log('User verified:', user);
        (req as any).user = user; // Attach user info to the request object
        return next(); // Proceed to the protected route
    } catch (err: any) {
        console.error('Token verification error:', err);

        if (err.name === 'TokenExpiredError') {
            const refreshToken = req.cookies?.secretToken2; // Accessing the refresh token from cookies

            console.log('Refresh token inside auth middleware:', refreshToken);
            if (!refreshToken) {
                return res.status(401).json({ message: 'Refresh token missing' });
            }

            try {
                const refreshPayload = verifyRefreshToken(refreshToken);
                const newAccessToken = generateAccessToken({ userId: (refreshPayload as any).userId });
                console.log("new access token", newAccessToken);
                // Set the new access token in a cookie
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true, // Use HttpOnly to prevent access via JavaScript
                    secure: process.env.NODE_ENV === 'production', // Secure in production
                    maxAge: 15 * 60 * 1000 // Set max age according to your access token expiry
                });

                // Now proceed to the protected route without returning the access token
                return next();
            } catch (refreshError) {
                return res.status(403).json({ message: 'Invalid or expired refresh token' });
            }
        }

        return res.status(403).json({ message: 'Invalid or expired access token' });
    }
}
