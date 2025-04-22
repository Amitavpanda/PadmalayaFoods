"use client";


import React, { useState } from 'react';
import { Plus, Pencil, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {toast} from "sonner";
// Mock data for demonstration
const mockCustomers = [
  { id: 'cust-1', name: 'John Doe', phone: '9876543210' },
  { id: 'cust-2', name: 'Jane Smith', phone: '8765432109' }
];

const mockProducts = [ 
  { id: 'prod-1', name: 'Premium Basmati Rice', price: 900 },
  { id: 'prod-2', name: 'Classic Rice', price: 700 }
];

type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

const mockOrders = [
  { 
    id: 'order-1', 
    customerId: 'cust-1', 
    items: [
      { productId: 'prod-1', quantity: 5, price: 900 }
    ],
    total: 4500,
    orderDate: '2023-06-10T10:30:00',
    deliveryDate: '2023-06-15T14:00:00',
    deliveryStatus: 'Delivered',
    paymentStatus: 'Paid'
  },
  { 
    id: 'order-2', 
    customerId: 'cust-2', 
    items: [
      { productId: 'prod-2', quantity: 3, price: 700 }
    ],
    total: 2100,
    orderDate: '2023-06-12T11:45:00',
    deliveryDate: null,
    deliveryStatus: 'Processing',
    paymentStatus: 'Pending'
  }
];

const OrdersManager = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [newOrder, setNewOrder] = useState({ 
    customerId: '', 
    items: [{ productId: '', quantity: 1, price: 0 }],
    deliveryStatus: 'Processing',
    paymentStatus: 'Pending',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: ''
  });

  const handleAddOrder = () => {
    if (!newOrder.customerId || newOrder.items.some(item => !item.productId || item.quantity < 1)) {
        toast.error("Please fill in all required fields");
      return;
    }

    // Calculate total
    const total = newOrder.items.reduce((sum, item) => {
      const product = mockProducts.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    // In a real app, you would call the API here
    const newOrderWithId = {
      ...newOrder,
      id: `order-${Date.now()}`,
      total,
      orderDate: new Date().toISOString(),
    };

    setOrders([...orders, newOrderWithId]);
    setNewOrder({ 
      customerId: '', 
      items: [{ productId: '', quantity: 1, price: 0 }],
      deliveryStatus: 'Processing',
      paymentStatus: 'Pending',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: ''
    });
    setIsAddDialogOpen(false);
    
    toast.success("Order added successfully");
  };

  const handleEditOrder = () => {
    if (!currentOrder) return;

    // In a real app, you would call the API here
    const updatedOrders = orders.map(order => 
      order.id === currentOrder.id ? currentOrder : order
    );
    
    setOrders(updatedOrders);
    setIsEditDialogOpen(false);
    
    toast.success("Order updated successfully");
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not scheduled';
    return new Date(dateString).toLocaleDateString();
  };

  const getCustomerName = (customerId: string) => {
    const customer = mockCustomers.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown Customer';
  };

  const getProductName = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };

  const addItemToNewOrder = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { productId: '', quantity: 1, price: 0 }]
    });
  };

  const updateNewOrderItem = (index: number, field: keyof typeof newOrder.items[0], value: any) => {
    const updatedItems = [...newOrder.items];
  
    if (field === 'productId') {
      const product = mockProducts.find(p => p.id === value);
      updatedItems[index] = {
        ...updatedItems[index],
        productId: value || '', // Ensure productId is always a string
        price: product ? product.price : 0,
        quantity: updatedItems[index]?.quantity || 1 // Ensure quantity is always a number
      };
    } else {
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: field === 'quantity' ? (value || 1) : (value || ''),
        productId: updatedItems[index]?.productId || '',
        quantity: updatedItems[index]?.quantity || 1,
        price: updatedItems[index]?.price || 0
      };
    }
  
    setNewOrder({
      ...newOrder,
      items: updatedItems.map(item => ({
        productId: item.productId || '',
        quantity: item.quantity || 1,
        price: item.price || 0
      })) // Ensure all items conform to the expected type
    });
  };

  const removeItemFromNewOrder = (index: number) => {
    if (newOrder.items.length === 1) return;
    
    const updatedItems = newOrder.items.filter((_, i) => i !== index);
    setNewOrder({
      ...newOrder,
      items: updatedItems
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Manage Orders</h3>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Order
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Delivery Status</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{getCustomerName(order.customerId)}</TableCell>
              <TableCell>₹{order.total}</TableCell>
              <TableCell>{formatDate(order.orderDate)}</TableCell>
              <TableCell>{order.deliveryStatus}</TableCell>
              <TableCell>{order.paymentStatus}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    setCurrentOrder(order);
                    setIsViewDialogOpen(true);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    setCurrentOrder(order);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No orders found. Add an order to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Add Order Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="customer" className="text-sm font-medium">
                Customer *
              </label>
              <Select
                value={newOrder.customerId}
                onValueChange={(value) => setNewOrder({...newOrder, customerId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} ({customer.phone})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Order Items *</label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addItemToNewOrder}
                >
                  Add Item
                </Button>
              </div>
              
              {newOrder.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center border p-2 rounded-md">
                  <div className="col-span-6">
                    <Select
                      value={item.productId}
                      onValueChange={(value) => updateNewOrderItem(index, 'productId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProducts.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} (₹{product.price})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateNewOrderItem(index, 'quantity', parseInt(e.target.value) || 0)}
                      placeholder="Qty"
                    />
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm">₹{item.price * item.quantity}</span>
                  </div>
                  <div className="col-span-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeItemFromNewOrder(index)}
                      disabled={newOrder.items.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="delivery-status" className="text-sm font-medium">
                  Delivery Status
                </label>
                <Select
                  value={newOrder.deliveryStatus}
                  onValueChange={(value) => setNewOrder({...newOrder, deliveryStatus: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="payment-status" className="text-sm font-medium">
                  Payment Status
                </label>
                <Select
                  value={newOrder.paymentStatus}
                  onValueChange={(value) => setNewOrder({...newOrder, paymentStatus: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                    <SelectItem value="Refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="order-date" className="text-sm font-medium">
                  Order Date
                </label>
                <Input
                  id="order-date"
                  type="date"
                  value={newOrder.orderDate}
                  onChange={(e) => setNewOrder({...newOrder, orderDate: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="delivery-date" className="text-sm font-medium">
                  Delivery Date
                </label>
                <Input
                  id="delivery-date"
                  type="date"
                  value={newOrder.deliveryDate}
                  onChange={(e) => setNewOrder({...newOrder, deliveryDate: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddOrder}>Add Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Order Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Order #{currentOrder?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="edit-delivery-status" className="text-sm font-medium">
                  Delivery Status
                </label>
                <Select
                  value={currentOrder?.deliveryStatus || ''}
                  onValueChange={(value) => setCurrentOrder({...currentOrder, deliveryStatus: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-payment-status" className="text-sm font-medium">
                  Payment Status
                </label>
                <Select
                  value={currentOrder?.paymentStatus || ''}
                  onValueChange={(value) => setCurrentOrder({...currentOrder, paymentStatus: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                    <SelectItem value="Refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-delivery-date" className="text-sm font-medium">
                  Delivery Date
                </label>
                <Input
                  id="edit-delivery-date"
                  type="date"
                  value={currentOrder?.deliveryDate ? new Date(currentOrder.deliveryDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setCurrentOrder({...currentOrder, deliveryDate: e.target.value ? new Date(e.target.value).toISOString() : null})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditOrder}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details #{currentOrder?.id}</DialogTitle>
            <DialogDescription>
              Placed on {currentOrder ? formatDate(currentOrder.orderDate) : ''}
            </DialogDescription>
          </DialogHeader>
          
          {currentOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Customer Information</h4>
                  <p>{getCustomerName(currentOrder.customerId)}</p>
                  <p className="text-sm text-gray-500">{mockCustomers.find(c => c.id === currentOrder.customerId)?.phone}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2">Order Status</h4>
                  <p>Delivery: {currentOrder.deliveryStatus}</p>
                  <p>Payment: {currentOrder.paymentStatus}</p>
                  <p>Delivery Date: {formatDate(currentOrder.deliveryDate)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Order Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentOrder.items.map((item: OrderItem, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{getProductName(item.productId)}</TableCell>
                        <TableCell className="text-right">₹{item.price}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">₹{item.price * item.quantity}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-semibold">Total:</TableCell>
                      <TableCell className="text-right font-semibold">₹{currentOrder.total}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};


export default OrdersManager;