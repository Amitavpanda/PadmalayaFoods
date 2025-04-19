

"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner'; // Import toast from sonner

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  phone: string;
  setPhone: (phone: string) => void;
  loginWithOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface User {
  id: string;
  phone: string;
  name?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [phone, setPhone] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  // Mock OTP verification
  const loginWithOtp = async (otp: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login for demo - in real app, verify OTP with backend
      if (otp === '123456' || otp.length === 6) { // Accept any 6-digit OTP for demo
        const mockUser = {
          id: 'user-123',
          phone: phone,
          name: 'Demo User'
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        toast.success("Your message has been sent successfully."); // Success toast
        
        return true;
      } else {
        toast.error("Invalid OTP. Please try again."); // Error toast
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
        toast.error("An error occurred during login. Please try again."); // Error toast
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast.success("You have been logged out successfully."); // Success toast
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        phone, 
        setPhone, 
        loginWithOtp, 
        logout,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
