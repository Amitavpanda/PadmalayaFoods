"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  phone: string;
  setPhone: (phone: string) => void;
  // loginWithOtp: (otp: string, fullHash: String) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  setIsAuthenticated: (value: boolean) => void; // Add this line
  redirectAfterAuth: (path: string) => void; // Add this line
}

interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
  const [redirectPath, setRedirectPath] = useState<string | null>(null); // Store redirect path
  const router = useRouter();

  const redirectAfterAuth = (path: string) => {
    console.log('Redirecting to authentication page for:', path);
    setRedirectPath(path);
    router.push(`/auth?redirect=${encodeURIComponent(path)}`); // Redirect to auth page with the original path
  };

  useEffect(() => {
    if (isAuthenticated && redirectPath) {
      console.log('User is authenticated, redirecting to:', redirectPath);
      const pathToRedirect = redirectPath; // Store the path temporarily
      setRedirectPath(null); // Clear the redirect path immediately
      router.push(pathToRedirect); // Redirect to the stored pathRedirect to the stored path
    }
  }, [isAuthenticated, redirectPath, router]);

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     const accessToken = document.cookie.includes('secretToken1');
  //     const refreshToken = document.cookie.includes('secretToken2');

  //     if (accessToken && refreshToken) {
  //       try {
  //         const response = await axios.get('/api/profile', { withCredentials: true });
  //         setUser(response.data.user);
  //         setIsAuthenticated(true);
  //       } catch (error) {
  //         console.error('Error fetching user profile:', error);
  //         setIsAuthenticated(false);
  //       }
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   };

  //   checkAuthentication();
  // }, []);

  // const loginWithOtp = async (otp: string, fullHash: String): Promise<boolean> => {
  //   setIsLoading(true);

  //   try {
  //     const response = await axios.post('http://0.0.0.0:4000/otpVerification', { phoneNumber: phone, otp, fullHash });
  //     if (response.data.success) {
  //       const { accessToken, refreshToken, user } = response.data;
  //       localStorage.setItem('accessToken', accessToken);
  //       localStorage.setItem('refreshToken', refreshToken);
  //       localStorage.setItem('user', JSON.stringify(user));
  //       setUser(user);
  //       setIsAuthenticated(true);
  //       return true;
  //     } else {
  //       console.error(response.data.message);
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //     return false;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated, // Add this line
        user,
        phone,
        setPhone,
        logout,
        isLoading,
        redirectAfterAuth, // Add this line
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
