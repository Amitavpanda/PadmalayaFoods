


"use client";
import React, { useEffect, useState } from 'react';
import { CategoryCard } from '@/components/CategoryCard';
import { Skeleton } from '@/components/ui/skeleton';

// Mock categories for development
const mockCategories = [
  {
    id: 'biryani-rice',
    name: 'Biryani Rice',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'table-rice',
    name: 'Table Rice',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&auto=format&fit=crop&q=80',
  },
];

export const CategoriesSection = () => {
  const [categories, setCategories] = useState<typeof mockCategories>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch categories
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/categories');
        // const data = await response.json();
        
        // Using mock data for development
        setTimeout(() => {
          setCategories(mockCategories);
          setIsLoading(false);
        }, 600);
      } catch (error) {
        console.error('Failed to fetch categories', error);
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Categories</h2>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((_, idx) => (
            <Skeleton key={idx} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <CategoryCard 
              key={category.id} 
              id={category.id} 
              name={category.name} 
              image={category.image} 
            />
          ))}
        </div>
      )}
    </section>
  );
};
