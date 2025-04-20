"use client";


import BottomNav from "@/components/BottomNav";
import {CategoriesSection} from "@/components/CategoriesSection";
import Header from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import {TopDealsSection} from "@/components/TopDealsSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
    // In a real app, this would trigger a search API call
  };

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <Header />

      <main className="flex-1">
        <div className="container px-4 py-4 mx-auto">
          {/* Hero section with search */}
          <div className="relative py-6 mb-4 overflow-hidden rounded-xl bg-gradient-to-r from-biryani-500 to-biryani-600">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative z-10 p-4">
              <h1 className="mb-2 text-2xl font-bold text-white">
                Premium Rice<br />Delivered to Your Doorstep
              </h1>
              <p className="mb-6 text-white/80">
                Find the perfect rice for your needs
              </p>
              <SearchBar 
                onSearch={handleSearch} 
                className="mb-2 md:w-96" 
              />
            </div>
          </div>

          {/* Buyer type information banner */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <h2 className="mb-2 text-lg font-semibold">Pricing Information</h2>
              <p className="mb-3 text-sm text-muted-foreground">
                We offer special pricing based on your purchase quantity:
              </p>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center mb-2">
                    <Badge className="bg-blue-500">Distributor</Badge>
                  </div>
                  <p className="text-sm">Purchase 5000+ packets to qualify for our lowest wholesale prices.</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center mb-2">
                    <Badge className="bg-green-500">Dealer</Badge>
                  </div>
                  <p className="text-sm">Purchase 1000+ packets to qualify for special dealer rates.</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center mb-2">
                    <Badge className="bg-amber-500">Hotel</Badge>
                  </div>
                  <p className="text-sm">Purchase 100+ packets to qualify for bulk hotel prices.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main content */}
          <div className="space-y-8">
            <TopDealsSection />
            <CategoriesSection />

            {/* About section */}
            <div className="p-6 border rounded-xl">
              <h2 className="mb-4 text-xl font-bold">About BiryaniRice Express</h2>
              <p className="mb-3 text-muted-foreground">
                We are a premium rice supplier dedicated to providing the highest quality rice for all your needs.
                Our selection includes specialty rice varieties perfect for biryani, as well as everyday table rice.
              </p>
              <p className="text-muted-foreground">
                With years of experience in the industry, we understand the importance of quality rice for
                restaurants, hotels, distributors, and individual customers. We source our rice directly from
                the best farms to ensure exceptional taste and quality with every grain.
              </p>

              <div className="grid gap-4 mt-6 md:grid-cols-3">
                <div className="p-4 text-center border rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-biryani-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-biryani-600">
                      <path d="m7 11 2-2-2-2"></path><path d="M11 13h4"></path><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    </svg>
                  </div>
                  <h3 className="mb-1 font-medium">Quality Guaranteed</h3>
                  <p className="text-sm text-muted-foreground">Premium rice sourced from the finest farms</p>
                </div>

                <div className="p-4 text-center border rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-biryani-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-biryani-600">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <h3 className="mb-1 font-medium">Safe Delivery</h3>
                  <p className="text-sm text-muted-foreground">Securely packaged and delivered to your doorstep</p>
                </div>

                <div className="p-4 text-center border rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-biryani-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-biryani-600">
                      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                    </svg>
                  </div>
                  <h3 className="mb-1 font-medium">Customer Support</h3>
                  <p className="text-sm text-muted-foreground">Dedicated team available to assist you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
