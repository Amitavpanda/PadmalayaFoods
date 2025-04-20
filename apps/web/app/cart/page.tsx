"use client";


import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../../context/CartContext';
import { CartItem } from '@/components/CartItem';
import  Header  from '@/components/Header';
import  BottomNav  from '@/components/BottomNav';
import {toast} from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'; // Updated import
import { useAuth } from '../../context/AuthContext';

const CartPage = () => {
  const { items, totalAmount, buyerType, setBuyerType } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = () => {
    setIsProcessing(true);
    
    if (!isAuthenticated) {
        toast.error('Please log in to proceed to checkout.');
      setIsProcessing(false);
      router.push('/profile');
      return;
    }
    
    // Proceed to checkout
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/checkout');
    }, 500);
  };

  const formattedTotal = new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR',
    maximumFractionDigits: 0 
  }).format(totalAmount);
  
  // Buyer type requirements info
  const buyerTypeRequirements = {
    distributor: 'Need to purchase at least 5000 packets to qualify for distributor prices.',
    dealer: 'Need to purchase at least 1000 packets to qualify for dealer prices.',
    hotel: 'Need to purchase at least 100 packets to qualify for hotel prices.'
  };
  
  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.push('/')}
              className="mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </div>
          
          {items.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {/* Cart items */}
              <div className="col-span-2 overflow-hidden bg-white border rounded-xl">
                {/* Buyer type selection */}
                <div className="p-4 border-b">
                  <h3 className="mb-2 font-medium">Price Category</h3>
                  <RadioGroup 
                    value={buyerType} 
                    onValueChange={(val) => setBuyerType(val as 'distributor' | 'dealer' | 'hotel')}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="distributor" id="distributor" />
                      <Label htmlFor="distributor">Distributor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dealer" id="dealer" />
                      <Label htmlFor="dealer">Dealer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hotel" id="hotel" />
                      <Label htmlFor="hotel">Hotel</Label>
                    </div>
                  </RadioGroup>
                  
                  {/* Show requirement info for selected buyer type */}
                  <div className="p-2 mt-2 text-sm text-yellow-800 bg-yellow-50 rounded-md">
                    <p>{buyerTypeRequirements[buyerType]}</p>
                  </div>
                </div>
                
                {/* Cart items list */}
                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
              
              {/* Order summary */}
              <div className="col-span-1">
                <div className="sticky p-4 overflow-hidden bg-white border rounded-xl top-20">
                  <h3 className="mb-4 text-lg font-medium">Order Summary</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formattedTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>₹0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>₹0</span>
                    </div>
                    <div className="h-px my-2 bg-gray-100" />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formattedTotal}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6 bg-biryani-500 hover:bg-biryani-600"
                    disabled={isProcessing}
                    onClick={handleCheckout}
                  >
                    {isProcessing ? 'Processing...' : (
                      <>
                        Checkout 
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="p-6 mb-6 rounded-full bg-muted">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="64" 
                  height="64" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-biryani-500"
                >
                  <circle cx="8" cy="21" r="1"/>
                  <circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-semibold">Your cart is empty</h2>
              <p className="mb-6 text-muted-foreground">Start adding products to your cart from our catalog.</p>
              <Button onClick={() => router.push('/')} className="bg-biryani-500 hover:bg-biryani-600">
                Start Shopping
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default CartPage;
