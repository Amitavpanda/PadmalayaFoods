"use client";


import { ShoppingCart, User, LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Updated import
import { Button } from '@/components/ui/button';

function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => router.push('/')}
        >
          <h1 className="text-xl font-bold">
            <span className="text-biryani-500">Padmalaya</span>
            <span className="text-leaf-500">Foods</span>
          </h1>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="icon" 
            className="relative"
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline"
            size="icon"
            onClick={() => router.push('/profile')}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;