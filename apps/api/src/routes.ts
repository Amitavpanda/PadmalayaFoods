import { Express, Request, Response } from "express";
import validate from "./middleware/validateResource.js";
import {registerUserSchema, loginUserSchema, otpVerificationSchema, resendOtpSchema} from "@repo/validations/userSchema";
import { loginHandler, logOutHandler, otpVerificationHandler, registerHandler, resendOtpHandler } from "./controllers/users.controller.js";
import { authenticateAccessToken } from "./middleware/authMiddleware.js";

function routes(app : Express){
    app.get('/healthcheck', (req : Request, res : Response)  => res.sendStatus(200));
    
    app.use((req: Request, res: Response, next) => {
        console.log("CORS Headers:", res.getHeaders()); // Log headers for each route
        next();
    });

    app.post('/register', validate(registerUserSchema), registerHandler);
    app.post('/otpVerification', validate(otpVerificationSchema), otpVerificationHandler)
    app.post('/login', validate(loginUserSchema), loginHandler);
    app.post('/logout', logOutHandler);
    app.post('/resendOtp', validate(resendOtpSchema) , resendOtpHandler);
    app.get('/profile', authenticateAccessToken, (req, res) => {
        res.json({ message: 'User profile'});
    });

    // app.get('/paymentAPI', authenticateAccessToken, (req, res) => {
    //     res.json({ message: 'User profile'});

    //     // 
    // });

    
    // app.get('/addTOCart', (req, res) => {
    //     res.json({ message: 'User profile'});

        // 
    // });
    




}

export default routes;