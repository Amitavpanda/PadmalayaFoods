import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
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
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {toast} from "sonner";
// Mock data for demonstration
const mockCategories = [
  { id: '1', name: 'Biryani Rice' },
  { id: '2', name: 'Rice' }
];

const mockProducts = [
  { 
    id: '1', 
    name: 'Premium Basmati Rice', 
    categoryId: '1', 
    pricing: { 
      distributor: 800, 
      dealer: 850, 
      hotel: 900 
    }, 
    image: 'https://placeholder.com/basmati.jpg',
    stockStatus: true
  },
  { 
    id: '2', 
    name: 'Classic Rice', 
    categoryId: '2', 
    pricing: { 
      distributor: 600, 
      dealer: 650, 
      hotel: 700 
    }, 
    image: 'https://placeholder.com/classic.jpg',
    stockStatus: true
  }
];

export const ProductsManager = () => {
  const [products, setProducts] = useState(mockProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    categoryId: '', 
    pricing: { distributor: '', dealer: '', hotel: '' }, 
    image: '', 
    stockStatus: true 
  });

  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.categoryId) {
        toast.error("Product name and category are required");
      return;
    }

    if (!newProduct.pricing.distributor || !newProduct.pricing.dealer || !newProduct.pricing.hotel) {
toast.error("All pricing information is required");
      return;
    }

    // In a real app, you would call the API here
    const newProductWithId = {
      ...newProduct,
      id: Date.now().toString(),
      pricing: {
        distributor: Number(newProduct.pricing.distributor),
        dealer: Number(newProduct.pricing.dealer),
        hotel: Number(newProduct.pricing.hotel)
      }
    };

    setProducts([...products, newProductWithId]);
    setNewProduct({ 
      name: '', 
      categoryId: '', 
      pricing: { distributor: '', dealer: '', hotel: '' }, 
      image: '', 
      stockStatus: true 
    });
    setIsAddDialogOpen(false);
    
    toast.success("Product added successfully");
  };

  const handleEditProduct = () => {
    if (!currentProduct?.name.trim() || !currentProduct?.categoryId) {
        toast.error("Product name and category are required");
      return;
    }

    if (!currentProduct.pricing.distributor || !currentProduct.pricing.dealer || !currentProduct.pricing.hotel) {
toast.error("All pricing information is required");
      return;
    }

    // In a real app, you would call the API here
    const updatedProducts = products.map(product => 
      product.id === currentProduct.id ? {
        ...currentProduct,
        pricing: {
          distributor: Number(currentProduct.pricing.distributor),
          dealer: Number(currentProduct.pricing.dealer),
          hotel: Number(currentProduct.pricing.hotel)
        }
      } : product
    );
    
    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    
    toast.success("Product updated successfully");
  };

  const handleDeleteProduct = () => {
    if (!currentProduct) return;
    
    // In a real app, you would call the API here
    const filteredProducts = products.filter(
      product => product.id !== currentProduct.id
    );
    
    setProducts(filteredProducts);
    setIsDeleteDialogOpen(false);
    
    toast.success("Product deleted successfully");
  };

  const getCategoryName = (categoryId: string) => {
    const category = mockCategories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Manage Products</h3>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Distributor Price</TableHead>
            <TableHead>Dealer Price</TableHead>
            <TableHead>Hotel Price</TableHead>
            <TableHead>In Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{getCategoryName(product.categoryId)}</TableCell>
              <TableCell>₹{product.pricing.distributor}</TableCell>
              <TableCell>₹{product.pricing.dealer}</TableCell>
              <TableCell>₹{product.pricing.hotel}</TableCell>
              <TableCell>{product.stockStatus ? 'Yes' : 'No'}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    setCurrentProduct(product);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    setCurrentProduct(product);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                No products found. Add a product to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Product Name *
              </label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                placeholder="Enter product name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category *
              </label>
              <Select
                value={newProduct.categoryId}
                onValueChange={(value) => setNewProduct({...newProduct, categoryId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="distributor-price" className="text-sm font-medium">
                Distributor Price (₹) *
              </label>
              <Input
                id="distributor-price"
                type="number"
                value={newProduct.pricing.distributor}
                onChange={(e) => setNewProduct({
                  ...newProduct, 
                  pricing: {...newProduct.pricing, distributor: e.target.value}
                })}
                placeholder="Enter distributor price"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="dealer-price" className="text-sm font-medium">
                Dealer Price (₹) *
              </label>
              <Input
                id="dealer-price"
                type="number"
                value={newProduct.pricing.dealer}
                onChange={(e) => setNewProduct({
                  ...newProduct, 
                  pricing: {...newProduct.pricing, dealer: e.target.value}
                })}
                placeholder="Enter dealer price"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="hotel-price" className="text-sm font-medium">
                Hotel Price (₹) *
              </label>
              <Input
                id="hotel-price"
                type="number"
                value={newProduct.pricing.hotel}
                onChange={(e) => setNewProduct({
                  ...newProduct, 
                  pricing: {...newProduct.pricing, hotel: e.target.value}
                })}
                placeholder="Enter hotel price"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="image"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                placeholder="Enter image URL"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="stock-status"
                checked={newProduct.stockStatus}
                onCheckedChange={(checked: boolean) => setNewProduct({...newProduct, stockStatus: checked})}
              />
              <label htmlFor="stock-status" className="text-sm font-medium">
                In Stock
              </label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="edit-name" className="text-sm font-medium">
                Product Name *
              </label>
              <Input
                id="edit-name"
                value={currentProduct?.name || ''}
                onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                placeholder="Enter product name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="edit-category" className="text-sm font-medium">
                Category *
              </label>
              <Select
                value={currentProduct?.categoryId || ''}
                onValueChange={(value) => setCurrentProduct({...currentProduct, categoryId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="edit-distributor-price" className="text-sm font-medium">
                Distributor Price (₹) *
              </label>
              <Input
                id="edit-distributor-price"
                type="number"
                value={currentProduct?.pricing?.distributor || ''}
                onChange={(e) => setCurrentProduct({
                  ...currentProduct, 
                  pricing: {...currentProduct.pricing, distributor: e.target.value}
                })}
                placeholder="Enter distributor price"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="edit-dealer-price" className="text-sm font-medium">
                Dealer Price (₹) *
              </label>
              <Input
                id="edit-dealer-price"
                type="number"
                value={currentProduct?.pricing?.dealer || ''}
                onChange={(e) => setCurrentProduct({
                  ...currentProduct, 
                  pricing: {...currentProduct.pricing, dealer: e.target.value}
                })}
                placeholder="Enter dealer price"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="edit-hotel-price" className="text-sm font-medium">
                Hotel Price (₹) *
              </label>
              <Input
                id="edit-hotel-price"
                type="number"
                value={currentProduct?.pricing?.hotel || ''}
                onChange={(e) => setCurrentProduct({
                  ...currentProduct, 
                  pricing: {...currentProduct.pricing, hotel: e.target.value}
                })}
                placeholder="Enter hotel price"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="edit-image" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="edit-image"
                value={currentProduct?.image || ''}
                onChange={(e) => setCurrentProduct({...currentProduct, image: e.target.value})}
                placeholder="Enter image URL"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-stock-status"
                checked={currentProduct?.stockStatus || false}
                onCheckedChange={(checked: boolean) => setCurrentProduct({...currentProduct, stockStatus: checked})}
              />
              <label htmlFor="edit-stock-status" className="text-sm font-medium">
                In Stock
              </label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Product Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the product "{currentProduct?.name}"?</p>
            <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteProduct}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};