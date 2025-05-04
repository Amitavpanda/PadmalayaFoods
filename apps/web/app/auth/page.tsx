"use client"  

import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from '../../context/AuthContext'; // Adjust the import path as necessary
import { useRouter, usePathname } from 'next/navigation'; // Updated import
 const Auth = () => {
  const { setIsAuthenticated } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState<string>('');
  const [name, setName] = useState<string>(''); // Add state for name
  const [fullHash, setFullHash] = useState<string>(''); // Add state for fullHash
  const [phone, setPhone] = useState<string>(''); // Add state for phone
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add state for isLoading
  const router = useRouter();
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (phone && phone.length >= 10 && name) { // Ensure name is provided
      try {
        const response = await axios.post('http://0.0.0.0:4000/register', { phoneNumber: phone, name });
        if (response.data.success) {
          setFullHash(response.data.hash); // Store fullHash for OTP verification
          setStep('otp');
        } else if (response.data.ifUserExists) {
          setName(''); // Clear name field if user exists
          setStep('otp');
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp && otp.length === 6) {
      setIsLoading(true);
      try {
        const response = await axios.post('http://0.0.0.0:4000/otpVerification', {
          phoneNumber: phone,
          otp,
          fullHash,
        }, {
          withCredentials: true, // Ensure cookies are sent and received
        });

        if (response.data.success) {
          console.log('OTP verified successfully');
          console.log('Cookies after OTP verification:', document.cookie); // Log cookies to verify storage
        } else {
          console.error('OTP verification failed:', response.data.message);
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {step === 'phone' ? 'Sign In / Register' : 'Enter OTP'}
          </CardTitle>
          <CardDescription>
            {step === 'phone' 
              ? 'Enter your phone number to continue' 
              : `We've sent a verification code to ${phone}`
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    maxLength={10}
                    className="mb-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mb-2"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-biryani-500 hover:bg-biryani-600"
                  disabled={!phone || phone.length < 10 || !name || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    'Send OTP'
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">One-Time Password</Label>
                  <div className="flex justify-center my-4">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-biryani-500 hover:bg-biryani-600"
                  disabled={!otp || otp.length < 6 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        
        <CardFooter className="justify-center">
          {step === 'otp' && (
            <Button 
              variant="ghost" 
              onClick={() => setStep('phone')}
              disabled={isLoading}
            >
              Change Phone Number
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
export default Auth;