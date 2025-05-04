import { Request, Response, NextFunction } from 'express';
import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from '../utils/index.js';

export function authenticateAccessToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    const refreshToken = authHeader && authHeader.split(' ')[2]; // Bearer <token>
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);

    try {
        if (!accessToken) {
            return res.status(401).json({ message: 'Access token missing' });
        }
        const user = verifyAccessToken(accessToken);
        console.log('User verified:', user);
        (req as any).user = user; // Attach user info to the request object
        return next(); // Proceed to the protected route
    } catch (err: any) {
        console.error('Token verification error:', err);

        if (err.name === 'TokenExpiredError') {
            console.log('Access token expired, checking refresh token');

            if (!refreshToken) {
                return res.status(401).json({ message: 'Refresh token missing' });
            }

            try {
                const refreshPayload = verifyRefreshToken(refreshToken);
                const newAccessToken = generateAccessToken({ userId: (refreshPayload as any).userId });
                console.log("new access token", newAccessToken);

                // Attach the new access token to the request object
                req.headers['authorization'] = `Bearer ${newAccessToken}`;
                (req as any).newAccessToken = newAccessToken; // Optional: Attach it to a custom property

                // Proceed to the next middleware or route handler
                return next();
            } catch (refreshError) {
                return res.status(403).json({ message: 'Invalid or expired refresh token' });
            }
        }

        return res.status(403).json({ message: 'Invalid or expired access token' });
    }
}
