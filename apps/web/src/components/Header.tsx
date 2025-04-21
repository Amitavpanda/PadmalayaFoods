"use client";


import { ShoppingCart, User, LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Updated import
import { Button } from '@/components/ui/button';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const isAdmin = isAuthenticated && user?.id === 'user-123';

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => router.push('/')}
        >
          <h1 className="text-xl font-bold">
            <span className="text-biryani-500">Biryani</span>
            <span className="text-leaf-500">Rice</span>
            <span className="font-light">Express</span>
          </h1>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-4">
        {isAdmin && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => router.push('/admin')}
              title="Admin Dashboard"
            >
              <LayoutDashboard className="w-5 h-5" />
            </Button>
          )}
          <Button 
            variant="outline" 
            size="icon" 
            className="relative"
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 p-1 text-xs font-bold text-white translate-x-1/2 -translate-y-1/2 rounded-full bg-spice-500">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Button>
          
          <Button 
            variant={isAuthenticated ? "default" : "outline"}
            size="icon"
            onClick={() => router.push('/profile')}
            className={isAuthenticated ? "bg-biryani-500 hover:bg-biryani-600" : ""}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;