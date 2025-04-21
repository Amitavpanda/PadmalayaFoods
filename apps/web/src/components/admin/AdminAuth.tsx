import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

export const AdminAuth = () => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const { setPhone: setAuthPhone, loginWithOtp, isLoading } = useAuth();

    const handleSendOtp = () => {
        if (!phone || phone.length < 10) {
            toast.error("Please enter a valid phone number");
            return;
        }

        setAuthPhone(phone);
        setOtpSent(true);

        toast.success("OTP sent successfully! Use 123456 for demo purposes.");
    };

    const handleLogin = async () => {
        if (!otp || otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }

        const success = await loginWithOtp(otp);

        if (!success) {
            toast.error("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">
                        <span className="text-biryani-500">Admin</span>
                        <span className="text-leaf-500">Dashboard</span>
                    </h1>
                    <p className="mt-2 text-gray-600">Login to access admin features</p>
                </div>

                <div className="space-y-6">
                    {!otpSent ? (
                        <>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <Button
                                className="w-full"
                                onClick={handleSendOtp}
                                disabled={isLoading}
                            >
                                {isLoading ? "Sending..." : "Send OTP"}
                            </Button>

                            <div className="text-sm text-center text-gray-500">
                                <p>For demo purposes, use any phone number.</p>
                                <p>The OTP code is 123456.</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <label htmlFor="otp" className="text-sm font-medium text-gray-700">
                                    One-Time Password
                                </label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="Enter the 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                />
                            </div>

                            <Button
                                className="w-full"
                                onClick={handleLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? "Verifying..." : "Login"}
                            </Button>

                            <Button
                                variant="link"
                                className="w-full"
                                onClick={() => setOtpSent(false)}
                            >
                                Use a different phone number
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
