"use client";


import React from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Updated import
import { 
  LayoutGrid, 
  Package, 
  ShoppingBag, 
  FileText, 
  LogOut 
} from 'lucide-react';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { 
      title: 'Categories', 
      path: '/admin/categories', 
      icon: LayoutGrid 
    },
    { 
      title: 'Products', 
      path: '/admin/products', 
      icon: Package 
    },
    { 
      title: 'Orders', 
      path: '/admin/orders', 
      icon: ShoppingBag 
    },
    { 
      title: 'Content', 
      path: '/admin/content', 
      icon: FileText 
    },
  ];

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center p-4">
              <h1 className="text-xl font-bold">
                <span className="text-biryani-500">Admin</span>
                <span className="text-leaf-500">Dashboard</span>
              </h1>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    isActive={pathname === item.path}
                    onClick={() => router.push(item.path)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {menuItems.find(item => item.path === pathname)?.title || 'Dashboard'}
            </h2>
            <SidebarTrigger />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;