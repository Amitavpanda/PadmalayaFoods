"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import { AdminAuth } from '@/components/admin/AdminAuth';

const AdminDashboard = () => {
  const router = useRouter();

  // Simple admin check - in a real app, you would check for admin role
  const isAdmin = true; // Assuming the user is always an admin for this example

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


