
import React from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  className?: string;
}

export const CategoryCard = ({ id, name, image, className }: CategoryCardProps) => {
    const router = useRouter();
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl cursor-pointer transition-transform hover:scale-105",
        className
      )}
      onClick={() => router.push(`/category/${id}`)}
    >
      {/* Image with gradient overlay */}
      <div className="relative aspect-square">
        <img 
          src={image} 
          alt={name} 
          className="object-cover w-full h-full"
          loading="lazy" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      
      {/* Category name */}
      <div className="absolute bottom-0 w-full p-3">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>
    </div>
  );
};