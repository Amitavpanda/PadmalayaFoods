import * as z from "zod";

// Validation schema for adding an item to the cart
const addToCartPayload = {
    body: z.object({
        customerId: z.string().uuid('Customer ID must be a valid UUID'),
        productId: z.string().uuid('Product ID must be a valid UUID'),
        quantity: z.number().int().positive('Quantity must be a positive integer'),
        productImage: z.string().url('Product image must be a valid URL'),
    }),
};

// Validation schema for fetching cart items
const getCartItemsParams = {
    query: z.object({
        customerId: z.string().uuid('Customer ID must be a valid UUID'),
    }),
};

// Validation schema for clearing the cart
const clearCartPayload = {
    body: z.object({
        customerId: z.string().uuid('Customer ID must be a valid UUID'),
    }),
};

const deleteCartItemParams = {
    params: z.object({
        cartItemId: z.string().uuid('Cart Item ID must be a valid UUID'),
    }),
};

export const deleteCartItemSchema = z.object({
    ...deleteCartItemParams,
});


// Exporting the schemas
export const addToCartSchema = z.object({
    ...addToCartPayload,
});

export const getCartItemsSchema = z.object({
    ...getCartItemsParams,
});

export const clearCartSchema = z.object({
    ...clearCartPayload,
});

// Type inference for TypeScript
export type AddToCartSchema = z.infer<typeof addToCartSchema>;
export type GetCartItemsSchema = z.infer<typeof getCartItemsSchema>;
export type ClearCartSchema = z.infer<typeof clearCartSchema>;
export type DeleteCartItemSchema = z.infer<typeof deleteCartItemSchema>;
