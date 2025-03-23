import * as z from 'zod';

// Validation schema for adding a product
const addProductPayload = {
    body: z.object({
        productName: z.string().min(1, 'Product name is required').max(255, 'Product name is too long'),
        categoryId: z.string().uuid('Category ID must be a valid UUID'),
        pricing: z.object({
            distributor: z.number().positive("Distributor price must be a positive number"),
            dealer: z.number().positive("Dealer price must be a positive number"),
            // Additional pricing logic can be added here if necessary
        }),
        image: z.string().url('Product image must be a valid URL').optional(),
        stockStatus: z.boolean().optional(),
    }),
};

// Validation schema for editing a product
const editProductPayload = {
    body: z.object({
        productName: z.string().min(1, 'Product name is required').max(255, 'Product name is too long').optional(),
        categoryId: z.string().uuid('Category ID must be a valid UUID').optional(),
        pricing: z.object({
            distributor: z.number().positive("Distributor price must be a positive number").optional(),
            dealer: z.number().positive("Dealer price must be a positive number").optional(),
        }).optional(),
        image: z.string().url('Product image must be a valid URL').optional(),
        stockStatus: z.boolean().optional(),
    }),
};

// Parameters for delete operation
const params = {
    params: z.object({
        productId: z.string().uuid('Product ID must be a valid UUID'),
    }),
};

// Exporting the schemas
export const addProductSchema = z.object({
    ...addProductPayload,
});

export const editProductSchema = z.object({
    ...params,
    ...editProductPayload,
});

export const deleteProductSchema = z.object({
    ...params,
});

// Type inference for TypeScript
export type AddProductSchema = z.infer<typeof addProductSchema>;
export type EditProductSchema = z.infer<typeof editProductSchema>;
export type DeleteProductSchema = z.infer<typeof deleteProductSchema>;