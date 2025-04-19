

"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: {
    distributor: number;
    dealer: number;
    hotel: number;
  };
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalAmount: number;
  buyerType: 'distributor' | 'dealer' | 'hotel';
  setBuyerType: (type: 'distributor' | 'dealer' | 'hotel') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [buyerType, setBuyerType] = useState<'distributor' | 'dealer' | 'hotel'>('distributor');
  
  // Calculate total item count
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total amount based on buyer type
  const totalAmount = items.reduce(
    (total, item) => total + item.price[buyerType] * item.quantity, 
    0
  );

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
    
    const savedBuyerType = localStorage.getItem('buyerType');
    if (savedBuyerType) {
      setBuyerType(savedBuyerType as 'distributor' | 'dealer' | 'hotel');
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Save buyer type to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('buyerType', buyerType);
  }, [buyerType]);

  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity } 
            : i
        );
      }
      
      return [...prevItems, item];
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity,
        clearCart,
        itemCount,
        totalAmount,
        buyerType,
        setBuyerType
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
