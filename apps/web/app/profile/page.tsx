"use client";


import React, { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Auth } from '@/components/Auth';
import { ProfileDetails } from '@/components/ProfileDetails';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-4 mx-auto">
          <h1 className="mb-6 text-2xl font-bold">My Profile</h1>
          
          {!isAuthenticated ? (
            <Auth />
          ) : (
            <ProfileDetails />
          )}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
