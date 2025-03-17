import jwt from 'jsonwebtoken';


import dotenv from 'dotenv';
dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN!;

// Generate Access Token
export function generateAccessToken(payload: object): string {
    console.log("access token", ACCESS_TOKEN_SECRET);
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// Generate Refresh Token
export function generateRefreshToken(payload: object): string {
    console.log("refresh token", REFRESH_TOKEN_SECRET);
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

// Verify Access Token
export function verifyAccessToken(token: string): object | string {
    console.log("access token", ACCESS_TOKEN_SECRET);
    console.log("token", token);
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

// Verify Refresh Token
export function verifyRefreshToken(token: string): object | string {
    console.log("access token", ACCESS_TOKEN_SECRET);
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
}