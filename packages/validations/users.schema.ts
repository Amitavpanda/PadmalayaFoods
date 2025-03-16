import * as z from "zod";
import { object, number, string, TypeOf } from "zod";
import path from "path";


const registerPayload = {
  body: z.object({
    name: z.string().min(1).max(255),
    phoneNumber : z.string().length(10, 'Phone Number should be 10 digits'),
  }),
};

const resendOtpPayload = {
  body: z.object({
    phoneNumber : z.string().length(10, 'Phone Number should be 10 digits'),
  }),
};

const loginPayload = {
  body: z.object({
    phoneNumber : z.string().length(10, 'Phone Number should be 10 digits'),
  }),
}

const otpVerificationPayload = {
  body: z.object({
      otp : z.string().min(1).max(7),
      phoneNumber : z.string().min(1).max(11, 'Phone Number should be of 10 digits'),
      fullHash : z.string(),
      name : z.string().optional()
  }),
}



  export const registerUserSchema = z.object({
      ...registerPayload,
  });
  export const loginUserSchema = z.object({
    ...loginPayload,
});
export const otpVerificationSchema = z.object({
  ...otpVerificationPayload,
});
export const resendOtpSchema = z.object({
  ...resendOtpPayload,
});


export type ResendOtpSchema = z.infer<typeof resendOtpSchema>;  
export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
export type LoginUserSchema = z.infer<typeof loginUserSchema>;
export type OtpVerificationSchema = z.infer<typeof otpVerificationSchema>;