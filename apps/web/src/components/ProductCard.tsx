import React, { useState } from 'react';
import { Heart, PlusCircle, MinusCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    description: string;
    price: {
      distributor: number;
      dealer: number;
      hotel: number;
    };
  };
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [buyerType, setBuyerType] = useState<'distributor' | 'dealer' | 'hotel'>('distributor'); // Added buyerType state

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart as ${buyerType}`); // Mock implementation
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const distributorPrice = product.price.distributor;
  const dealerPrice = product.price.dealer;
  const hotelPrice = product.price.hotel;

  const priceToShow = product.price[buyerType]; // Fixed buyerType usage

  const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);

  const formattedDistributorPrice = formatPrice(distributorPrice);
  const formattedDealerPrice = formatPrice(dealerPrice);
  const formattedHotelPrice = formatPrice(hotelPrice);
  const formattedCurrentPrice = formatPrice(priceToShow);

  const buyerTypeRequirements = {
    distributor: '5000+ packets',
    dealer: '1000+ packets',
    hotel: '100+ packets'
  };

  return (
    <div className={cn(
      "bg-white rounded-xl overflow-hidden product-card-shadow transition-all hover:shadow-md",
      className
    )}>
      {/* Product Image with favorite button */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full transition-transform hover:scale-105"
          loading="lazy"
        />
        <button 
          className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full"
          onClick={toggleFavorite}
        >
          <Heart 
            className={cn(
              "w-5 h-5 transition-colors", 
              isFavorite ? "fill-spice-500 text-spice-500" : "text-gray-400"
            )} 
          />
        </button>
      </div>
      
      {/* Product details */}
      <div className="p-3">
        <h3 className="mb-1 font-medium text-md">{product.name}</h3>
        <p className="mb-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        
        <div className="flex flex-col gap-2">
          {/* Price section with all price types */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-biryani-600">{formattedCurrentPrice}</p>
              <Badge className="capitalize" variant={
                buyerType === 'distributor' ? 'default' : 
                buyerType === 'dealer' ? 'secondary' : 'outline'
              }>
                {buyerType}
              </Badge>
            </div>
            
            <div className="flex items-center mt-1 space-x-1 text-xs text-muted-foreground">
              <span>Min. qty: {buyerTypeRequirements[buyerType]}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-0.5 rounded-full hover:bg-gray-100">
                    <Info className="w-3 h-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px]">
                  <div className="space-y-1 text-xs">
                    <p>Distributor: {formattedDistributorPrice} (min. {buyerTypeRequirements.distributor})</p>
                    <p>Dealer: {formattedDealerPrice} (min. {buyerTypeRequirements.dealer})</p>
                    <p>Hotel: {formattedHotelPrice} (min. {buyerTypeRequirements.hotel})</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          {/* Quantity and Add to cart */}
          <div className="flex mt-1 space-x-2">
            <div className="flex items-center flex-1 overflow-hidden border rounded-md">
              <button 
                onClick={decrementQuantity}
                className="p-1"
              >
                <MinusCircle className="w-5 h-5 text-gray-500" />
              </button>
              <Input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="flex-1 h-8 text-center border-none"
                min="1"
              />
              <button 
                onClick={incrementQuantity}
                className="p-1"
              >
                <PlusCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <Button 
              onClick={handleAddToCart}
              className="bg-biryani-500 hover:bg-biryani-600"
              size="sm"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};