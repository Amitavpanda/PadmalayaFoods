"use client"


import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import  Header  from '@/components/Header';
import  BottomNav  from '@/components/BottomNav';
import { SearchBar } from '@/components/SearchBar';
import { Skeleton } from '@/components/ui/skeleton';

// Mock products for development
const mockBiryaniProducts = [
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
  {
    id: '5',
    name: 'Classic Basmati Rice',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80',
    description: 'Traditional basmati rice with excellent elongation after cooking.',
    price: {
      distributor: 1900,
      dealer: 2100,
      hotel: 2300,
    },
  },
  {
    id: '6',
    name: 'Golden Sella Rice',
    image: 'https://images.unsplash.com/photo-1612728463082-ccb6a0108a4f?w=800&auto=format&fit=crop&q=80', 
    description: 'Premium parboiled rice with excellent cooking qualities and golden color.',
    price: {
      distributor: 1700,
      dealer: 1900,
      hotel: 2100,
    },
  },
];

const mockTableProducts = [
  {
    id: '7',
    name: 'Premium Table Rice',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    description: 'High-quality table rice suitable for everyday cooking.',
    price: {
      distributor: 1500,
      dealer: 1700,
      hotel: 1900,
    },
  },
  {
    id: '8',
    name: 'Long Grain White Rice',
    image: 'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=800&auto=format&fit=crop&q=80',
    description: 'Long grain white rice perfect for side dishes and main meals.',
    price: {
      distributor: 1400,
      dealer: 1600,
      hotel: 1800,
    },
  },
  {
    id: '9',
    name: 'Brown Rice',
    image: 'https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?w=800&auto=format&fit=crop&q=80',
    description: 'Nutritious brown rice with nutty flavor and chewy texture.',
    price: {
      distributor: 1600,
      dealer: 1800,
      hotel: 2000,
    },
  },
  {
    id: '10',
    name: 'Short Grain Rice',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
    description: 'Perfect for dishes requiring sticky texture and soft consistency.',
    price: {
      distributor: 1700,
      dealer: 1900,
      hotel: 2100,
    },
  },
];

const mockCategories = {
  'biryani-rice': {
    name: 'Biryani Rice',
    products: mockBiryaniProducts,
  },
  'table-rice': {
    name: 'Table Rice',
    products: mockTableProducts,
  },
};

const CategoryPage = ({ params }: { params: { id: string } }) => {
  const { id } = params; // Access the id after unwrapping
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Simulate API call to fetch category products
    const fetchCategoryProducts = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/categories/${categoryId}/products`);
        // const data = await response.json();
        
        // Using mock data for development
        setTimeout(() => {
          if (id && mockCategories[id as keyof typeof mockCategories]) {
            const category = mockCategories[id as keyof typeof mockCategories];
            setProducts(category.products);
            setFilteredProducts(category.products);
            setCategoryName(category.name);
          } else {
            // Handle invalid category
            setProducts([]);
            setFilteredProducts([]);
            setCategoryName('Category Not Found');
          }
          setIsLoading(false);
        }, 700);
      } catch (error) {
        console.error('Failed to fetch category products', error);
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchCategoryProducts();
    }
  }, [id]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredProducts(products);
      return;
    }
    
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) || 
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredProducts(filtered);
  };
  
  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <Header />
      
      <main className="flex-1">
        <div className="container px-4 py-4 mx-auto">
          {/* Category header */}
          <div className="mb-6">
            <h1 className="mb-2 text-2xl font-bold">{categoryName}</h1>
            <SearchBar 
              onSearch={handleSearch} 
              placeholder={`Search in ${categoryName}...`} 
              className="mt-4"
            />
          </div>
          
          {/* Products grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
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
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8">
              <p className="mb-2 text-lg font-medium text-center">No products found</p>
              <p className="text-center text-muted-foreground">
                {searchQuery ? 
                  `No products matching "${searchQuery}" in this category.` : 
                  'This category is currently empty.'}
              </p>
            </div>
          )}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default CategoryPage;
