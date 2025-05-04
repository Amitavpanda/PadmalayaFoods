"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Auth } from '@/components/Auth';
import { ProfileDetails } from '@/components/ProfileDetails';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';

const ProfilePage = () => {
  const router = useRouter();
  const { redirectAfterAuth } = useAuth();
  interface User {
    name: string;
    email: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get('secretToken1'); // Retrieve the token from cookies
        if (!token) {
          console.warn('Token not found in cookies, redirecting to authentication');
          redirectAfterAuth('/profile'); // Redirect to auth page with return path
          return;
        }
        
        console.log('Sending cookies for authentication');

        const response = await axios.get('http://0.0.0.0:4000/profile', {
          withCredentials: true, // Ensure cookies are sent
        });

        setUser(response.data.user);
      } catch (error) {
        console.error('Authentication failed:', error);
        if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
          redirectAfterAuth('/profile'); // Redirect to auth page with return path
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [redirectAfterAuth]);

  if (loading) return <div>Loading...</div>;

  if (!user) return null; // Redirecting to Auth

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-4 mx-auto">
          <h1 className="mb-6 text-2xl font-bold">My Profile</h1>
          <ProfileDetails userDetails={{ name: user.name, email: user.email }} />
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
