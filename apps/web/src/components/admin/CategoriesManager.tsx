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
import {toast} from "sonner";

// Mock data for demonstration
const mockCategories = [
  { id: '1', name: 'Biryani Rice', image: 'https://placeholder.com/biryani.jpg' },
  { id: '2', name: 'Rice', image: 'https://placeholder.com/rice.jpg' }
];

export const CategoriesManager = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [newCategory, setNewCategory] = useState({ name: '', image: '' });

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
        toast.error("Category name is required");
      return;
    }

    // In a real app, you would call the API here
    const newCategoryWithId = {
      ...newCategory,
      id: Date.now().toString(),
    };

    setCategories([...categories, newCategoryWithId]);
    setNewCategory({ name: '', image: '' });
    setIsAddDialogOpen(false);
    
    toast.success("Category added successfully");
  };

  const handleEditCategory = () => {
    if (!currentCategory?.name.trim()) {
toast.error("Category name is required");
      return;
    }

    // In a real app, you would call the API here
    const updatedCategories = categories.map(category => 
      category.id === currentCategory.id ? currentCategory : category
    );
    
    setCategories(updatedCategories);
    setIsEditDialogOpen(false);
    toast.success("Category updated successfully");
  };

  const handleDeleteCategory = () => {
    if (!currentCategory) return;
    
    // In a real app, you would call the API here
    const filteredCategories = categories.filter(
      category => category.id !== currentCategory.id
    );
    
    setCategories(filteredCategories);
    setIsDeleteDialogOpen(false);
    
    toast.success("Category deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Manage Categories</h3>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Image URL</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className="max-w-xs truncate">{category.image}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    setCurrentCategory(category);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    setCurrentCategory(category);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {categories.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No categories found. Add a category to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Category Name *
              </label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                placeholder="Enter category name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="image"
                value={newCategory.image}
                onChange={(e) => setNewCategory({...newCategory, image: e.target.value})}
                placeholder="Enter image URL"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-name" className="text-sm font-medium">
                Category Name *
              </label>
              <Input
                id="edit-name"
                value={currentCategory?.name || ''}
                onChange={(e) => setCurrentCategory({...currentCategory, name: e.target.value})}
                placeholder="Enter category name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-image" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="edit-image"
                value={currentCategory?.image || ''}
                onChange={(e) => setCurrentCategory({...currentCategory, image: e.target.value})}
                placeholder="Enter image URL"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Category Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the category "{currentCategory?.name}"?</p>
            <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteCategory}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};