import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { User, MapPin, ShoppingBag, Heart, PhoneCall, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AddressForm } from '@/components/AddressForm';

export const ProfileDetails = () => {
  const { user, logout } = useAuth();
  const [addresses, setAddresses] = useState([
    { id: '1', label: 'Home', address: '123 Main Street, Apt 4, Cityville, State, 12345' }
  ]);
  
  // Mock order history
  const orders = [
    { 
      id: 'ORD-001', 
      date: '2023-10-12', 
      status: 'Delivered',
      totalAmount: 4500,
      items: [
        { name: 'Premium Basmati Rice', quantity: 5, price: 900 }
      ]
    },
    { 
      id: 'ORD-002', 
      date: '2023-11-24', 
      status: 'Processing',
      totalAmount: 7200,
      items: [
        { name: 'Long Grain Biryani Rice', quantity: 8, price: 900 }
      ]
    }
  ];
  
  // Mock favorites
  const favorites = [
    { id: 'p1', name: 'Premium Basmati Rice', image: '/placeholder.svg' },
    { id: 'p2', name: 'Long Grain Biryani Rice', image: '/placeholder.svg' }
  ];
  
  return (
    <div className="space-y-6">
      {/* User info */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-biryani-100">
                <User className="w-6 h-6 text-biryani-600" />
              </div>
              <div>
                <CardTitle>{user?.name || 'User'}</CardTitle>
                <p className="text-sm text-muted-foreground">{user?.phone}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={logout}
              size="sm"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </CardHeader>
      </Card>
      
      {/* Tabs for different sections */}
      <Tabs defaultValue="orders">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders"><ShoppingBag className="w-4 h-4 mr-1" /> Orders</TabsTrigger>
          <TabsTrigger value="addresses"><MapPin className="w-4 h-4 mr-1" /> Addresses</TabsTrigger>
          <TabsTrigger value="favorites"><Heart className="w-4 h-4 mr-1" /> Favorites</TabsTrigger>
          <TabsTrigger value="contact"><PhoneCall className="w-4 h-4 mr-1" /> Contact</TabsTrigger>
        </TabsList>
        
        {/* Orders Tab */}
        <TabsContent value="orders" className="mt-4">
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map(order => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="h-px my-2 bg-gray-100" />
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-1">
                        <span>{item.name} x {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="h-px my-2 bg-gray-100" />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{order.totalAmount}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">No Orders Yet</h3>
              <p className="text-muted-foreground">When you place orders, they will appear here.</p>
            </div>
          )}
        </TabsContent>
        
        {/* Addresses Tab */}
        <TabsContent value="addresses" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              {addresses.length > 0 ? (
                <div className="space-y-4">
                  {addresses.map(addr => (
                    <div key={addr.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{addr.label}</div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{addr.address}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p>No addresses saved yet.</p>
                </div>
              )}
              <Button className="w-full mt-4 bg-biryani-500 hover:bg-biryani-600">
                Add New Address
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Favorites Tab */}
        <TabsContent value="favorites" className="mt-4">
          {favorites.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {favorites.map(item => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex space-x-3">
                      <div className="w-16 h-16 overflow-hidden rounded-md">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                        </div>
                        <div className="flex justify-end">
                          <Button size="sm" variant="outline">
                            View Product
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">No Favorites Yet</h3>
              <p className="text-muted-foreground">Products you mark as favorites will appear here.</p>
            </div>
          )}
        </TabsContent>
        
        {/* Contact Tab */}
        <TabsContent value="contact" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Shop</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted">
                <h4 className="mb-2 font-medium">BiryaniRice Express</h4>
                <p className="mb-1 text-sm">123 Rice Mill Road, Grain District</p>
                <p className="mb-1 text-sm">Cityville, State - 500001</p>
                <p className="text-sm">Open: Monday - Saturday, 9AM - 8PM</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="mb-2 font-medium">Contact Information</h4>
                <div className="flex items-center space-x-2">
                  <PhoneCall className="w-4 h-4 text-biryani-500" />
                  <p>+91 9876543210</p>
                </div>
                <div className="flex items-center mt-2 space-x-2">
                  <svg className="w-4 h-4 text-biryani-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <p>support@biryanirice.com</p>
                </div>
              </div>
              
              <Button className="w-full mt-4 bg-biryani-500 hover:bg-biryani-600">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
