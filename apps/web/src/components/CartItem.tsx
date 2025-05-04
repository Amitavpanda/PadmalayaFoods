import React from 'react';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    image: string;
    price: {
      distributor: number;
      dealer: number;
      hotel: number;
    };
    quantity: number;
  };
}

export const CartItem = ({ item }: CartItemProps) => {
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      // updateQuantity(item.id, value);
    }
  };
  
  const incrementQuantity = () => {
    // updateQuantity(item.id, item.quantity + 1);
  };
  const decrementQuantity = () => {
    if (item.quantity > 1) {
      // updateQuantity(item.id, item.quantity - 1);
    }
  };
  
  const priceToShow = item.price['distributor'];
  const totalPrice = priceToShow * item.quantity;
  
  const formattedPrice = new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(priceToShow);
  
  const formattedTotalPrice = new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(totalPrice);
  
  return (
    <div className="flex items-start p-3 space-x-3 border-b border-gray-100 last:border-0">
      {/* Product Image */}
      <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-md">
        <img 
          src={item.image} 
          alt={item.name} 
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      
      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium">{item.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{formattedPrice} each</p>
        
        {/* Quantity Adjuster */}
        <div className="flex items-center mt-2 space-x-2">
          <div className="flex items-center flex-1 max-w-[120px] border rounded-md">
            <button 
              onClick={decrementQuantity}
              className="p-1"
            >
              <MinusCircle className="w-4 h-4 text-gray-500" />
            </button>
            <Input
              type="number"
              value={item.quantity}
              onChange={handleQuantityChange}
              className="h-8 text-center border-none"
              min="1"
            />
            <button 
              onClick={incrementQuantity}
              className="p-1"
            >
              <PlusCircle className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Price and Actions */}
      <div className="flex flex-col items-end space-y-2">
        <span className="font-semibold">{formattedTotalPrice}</span>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => {
            // removeItem(item.id);
          }}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
