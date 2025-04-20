"use client";



import React, { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for development
const mockTopDeals = [
  {
    id: '1',
    name: 'Premium Basmati Biryani Rice',
    image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800&auto=format&fit=crop&q=80',
    description: 'Extra-long grain premium basmati rice perfect for making authentic biryani.',
    price: {
      distributor: 2000,
      dealer: 2200,
      hotel: 2500,
    },
  },
  {
    id: '2',
    name: 'Sella Basmati Rice',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&auto=format&fit=crop&q=80',
    description: 'Pre-cooked sella basmati rice with excellent cooking properties and aroma.',
    price: {
      distributor: 1800,
      dealer: 2000,
      hotel: 2200,
    },
  },
  {
    id: '3',
    name: 'Royal Basmati Rice',
    image: 'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=800&auto=format&fit=crop&q=80',
    description: 'Premium quality royal basmati rice with exceptional flavor and aroma.',
    price: {
      distributor: 2200,
      dealer: 2400,
      hotel: 2700,
    },
  },
  {
    id: '4',
    name: 'Organic Biryani Rice',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80',
    description: 'Organically grown biryani rice, free from chemicals and pesticides.',
    price: {
      distributor: 2500,
      dealer: 2700,
      hotel: 3000,
    },
  },
];

export const TopDealsSection = () => {
  const [deals, setDeals] = useState<typeof mockTopDeals>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch top deals
    const fetchDeals = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/top-deals');
        // const data = await response.json();
        
        // Using mock data for development
        setTimeout(() => {
          setDeals(mockTopDeals);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Failed to fetch top deals', error);
        setIsLoading(false);
      }
    };
    
    fetchDeals();
  }, []);
  
  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Top Deals</h2>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl">
              <Skeleton className="aspect-square w-full" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
