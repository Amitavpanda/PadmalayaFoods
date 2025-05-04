
import { PrismaClient, User } from "@repo/db/client";
import bcrypt from "bcrypt";
import { error, info } from "@repo/logs/logs";
import twilio from "twilio"
import { OtpVerificationSchema, RegisterUserSchema, LoginUserSchema, ResendOtpSchema } from "@repo/validations/userSchema";
import crypto from "crypto"
import jwt from "jsonwebtoken";
// import { generateAccessToken, generateRefreshToken } from "../utils/index.js";



const prisma = new PrismaClient();

export async function resendOtpService(input: ResendOtpSchema) {
    console.log("inside resendOtpService");
    const { phoneNumber } = input.body;
    console.log("after resendOtpService phoneNUmber")
    try {

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            console.log("account SID", accountSid);
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            const serviceId = process.env.TWILIO_SERVICE_ID;
            let smsKey = process.env.SMS_SECRET_KEY;

            const client = twilio(accountSid, authToken);


            async function createVerification() {

                if (!serviceId) {
                    throw new Error("TWILIO_SERVICE_ID is not set");
                }

                const ttl = 5 * 60 * 1000;
                const expiresIn = Date.now() + ttl;
                try {

                    const verification = await client.verify.v2.services(serviceId)
                        .verifications
                        .create({ to: `+91${phoneNumber}`, channel: 'sms' });

                    const data = `${phoneNumber}.${expiresIn}`
                    let hash = '';
                    if (smsKey !== undefined) {
                        hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex')

                    }
                    const fullHash = `${hash}.${expiresIn}`

                    return { success: true, verificationStatus: verification, hash: fullHash, phoneNumber: phoneNumber }
                }
                catch (err) {
                    return { success: false, error: err }
                }

            }

            const result = await createVerification();
            return result;

        

    }

    catch (err: any) {
        error("Error in resending the OTP", err);

        return { success: false, error: "Error in resending the OTP" }
    }

}


export async function registerService(input: RegisterUserSchema) {
    console.log("inside registerService");
    const { phoneNumber, name } = input.body;
    console.log("after registerService phoneNUmber")
    const ifUser = await prisma.user.findUnique({
        where: {
            phoneNumber: phoneNumber
        }
    })
    try {
        if (ifUser) {
            return { success: false, ifUserExists: true }
        }
        else {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            // console.log("account SID", accountSid);
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            const serviceId = process.env.TWILIO_SERVICE_ID;
            let smsKey = process.env.SMS_SECRET_KEY;

            const client = twilio(accountSid, authToken);


            async function createVerification() {

                if (!serviceId) {
                    throw new Error("TWILIO_SERVICE_ID is not set");
                }

                const ttl = 5 * 60 * 1000;
                const expiresIn = Date.now() + ttl;
                try {

                    const verification = await client.verify.v2.services(serviceId)
                        .verifications
                        .create({ to: `+91${phoneNumber}`, channel: 'sms' });

                    const data = `${phoneNumber}.${expiresIn}`
                    let hash = '';
                    if (smsKey !== undefined) {
                        hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex')

                    }
                    const fullHash = `${hash}.${expiresIn}`

                    return { success: true, verificationStatus: verification, hash: fullHash, phoneNumber: phoneNumber }
                }
                catch (err) {
                    return { success: false, error: err }
                }

            }

            const result = await createVerification();
            return result;

        }

    }

    catch (err: any) {
        error("Error in registering the user", err);

        return { success: false, error: "Error in registering the user" }
    }

}


export async function loginService(input: LoginUserSchema) {
    const { phoneNumber } = input.body;

    const user = await prisma.user.findUnique({
        where: {
            phoneNumber
        }
    })
    if (!user) {
        return { success: false, error: "phoneNumber is not correct or user does not exists" , ifUserExists : false}
    }
    try{
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        console.log("account SID", accountSid);
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const serviceId = process.env.TWILIO_SERVICE_ID;
        let smsKey = process.env.SMS_SECRET_KEY;

        const client = twilio(accountSid, authToken);


        async function createVerification() {

            if (!serviceId) {
                throw new Error("TWILIO_SERVICE_ID is not set");
            }

            const ttl = 5 * 60 * 1000;
            const expiresIn = Date.now() + ttl;
            try {

                const verification = await client.verify.v2.services(serviceId)
                    .verifications
                    .create({ to: `+91${phoneNumber}`, channel: 'sms' });

                const data = `${phoneNumber}.${expiresIn}`
                let hash = '';
                if (smsKey !== undefined) {
                    hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex')

                }
                const fullHash = `${hash}.${expiresIn}`

                return { success: true, verificationStatus: verification, hash: fullHash, phoneNumber: phoneNumber, ifUserExists : true }
            }
            catch (err) {
                return { success: false, error: err }
            }

        }

        const result = await createVerification();
        return result;
    }
    catch(err : any){
        error("Error in login the user", err);

        return { success: false, error: "Error in login the user" }
    }
    

}


export async function otpVerificationService(input: OtpVerificationSchema) {
    const { otp, phoneNumber, fullHash, name } = input.body;

    const accessTokenSecret = process.env.JWT_ACCESS_TOKEN;
    const refreshTokeSecret = process.env.JWT_REFRESH_TOKEN;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const serviceId = process.env.TWILIO_SERVICE_ID;
    const client = twilio(accountSid, authToken);

    const expire = fullHash.split('.')[1];
    let now = Date.now()

    if (expire) {
        if (now > parseInt(expire)) {
            return { success: false, message: "OTP is expired, Please try sending the OTP again", ifIsExpire : true };
        }

    }

    async function createVerificationCheck() {
        if (!serviceId) {
            throw new Error("TWILIO_SERVICE_ID is not set");
        }

        const verificationCheck = await client.verify.v2
            .services(serviceId)
            .verificationChecks.create({
                code: otp,
                to: `+91${phoneNumber}`,
            });


        return verificationCheck.status
    }

    const result = await createVerificationCheck();
    let accessToken = "";
    let refreshToken = "";
    if (result === "approved") {
        if (accessTokenSecret !== undefined) {
            try{
                accessToken = jwt.sign({userId : phoneNumber}, accessTokenSecret, { expiresIn: '15m' });
                console.log("accessToken after otp verification", accessToken);
            }
            catch(err : any){
                console.log("err in generateAccessToken", err)
            }
        }
        if (refreshTokeSecret !== undefined) {
            try{
                refreshToken = jwt.sign({userId : phoneNumber}, refreshTokeSecret, { expiresIn: '7d' });
                console.log("refreshToken after otp verification", refreshToken);
            }
            catch(err : any){
                console.log("err in generateRefreshToken", err)
            }
        }

        try {
            const existingUser = await prisma.user.findUnique({
                where: { phoneNumber },
            });

            if (!existingUser) {
                info("before creating the user");
                await prisma.user.create({
                    data: {
                        phoneNumber,
                        name
                    },
                });
                info("User successfully registered in the database.");
            } else {
                info("User already exists in the database.");
            }
        } catch (dbError) {
            console.error("Error interacting with the database:", dbError);
            return { success: false, message: "Database error. Please try again later." };
        }


        return { success: "intermediate", accessToken, refreshToken }

    }
    else {
        return { success: false, message: "you have entered the incorrect otp" }
    }

}