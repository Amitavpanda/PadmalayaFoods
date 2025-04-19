import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const Auth = () => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState<string>('');
  const { phone, setPhone, loginWithOtp, isLoading } = useAuth();
  
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phone && phone.length >= 10) {
      // In a real app, send OTP to the phone number
      console.log(`Sending OTP to ${phone}`);
      setStep('otp');
    }
  };
  
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp && otp.length === 6) {
      const success = await loginWithOtp(otp);
      if (!success) {
        setOtp('');
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
                
                <Button 
                  type="submit" 
                  className="w-full bg-biryani-500 hover:bg-biryani-600"
                  disabled={!phone || phone.length < 10 || isLoading}
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
