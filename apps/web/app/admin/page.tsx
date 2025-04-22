"use client";


import React from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import { AdminAuth } from '@/components/admin/AdminAuth';
import { useAuth } from '../../context/AuthContext';
const AdminDashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  // Simple admin check - in a real app, you would check for admin role
  const isAdmin = isAuthenticated && user?.id === 'user-123';

  if (!isAdmin) {
    return <AdminAuth />;
  }

  // Redirect to categories by default
  React.useEffect(() => {
    router.push('/admin/categories');
  }, [router]);

  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>Redirecting to Categories...</p>
    </div>

  );
};

export default AdminDashboard;


