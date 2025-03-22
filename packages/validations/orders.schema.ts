import * as z from "zod";

// Validation schema for adding an order
const addOrderPayload = {
    body: z.object({
        customerId: z.string().uuid('Customer ID must be a valid UUID'),
        productId: z.string().uuid('Product ID must be a valid UUID'),
        deliveryStatus: z.string().min(1, 'Delivery status is required').max(50, 'Delivery status is too long'),
        deliveryDate: z.string().optional(), // Optional field for delivery date
        orderDate : z.string().optional(), // Optional field for order date
        paymentStatus: z.string().min(1, 'Payment status is required').max(50, 'Payment status is too long'),
        quantity: z.number().int().positive('Quantity must be a positive integer').optional(), // Optional field for quantity
        pricing : z.number().positive('Pricing must be a positive integer').optional(), // Optional field for pricing
        amount : z.number().positive('Amount must be a positive integer').optional(), // Optional field for amount
    }),
};

// Validation schema for editing an order
const editOrderPayload = {
    body: z.object({
        deliveryStatus: z.string().min(1, 'Delivery status is required').max(50, 'Delivery status is too long'),
        deliveryDate: z.string().optional(), // Optional field for delivery date
        orderDate : z.string().optional(), // Optional field for order date
        paymentStatus: z.string().min(1, 'Payment status is required').max(50, 'Payment status is too long'),
        quantity: z.number().int().positive('Quantity must be a positive integer').optional(), // Optional field for quantity
        pricing : z.number().positive('Pricing must be a positive integer').optional(), // Optional field for pricing
        amount : z.number().positive('Amount must be a positive integer').optional(), // Optional field for amount
    }),
};

// Parameters for delete operation
const params = {
    params: z.object({
        orderId: z.string().uuid('Order ID must be a valid UUID'),
    }),
};

// Exporting the schemas
export const addOrderSchema = z.object({
    ...addOrderPayload,
});

export const editOrderSchema = z.object({
    ...params,
    ...editOrderPayload,
});

export const deleteOrderSchema = z.object({
    ...params,
});

// Type inference for TypeScript
export type AddOrderSchema = z.infer<typeof addOrderSchema>;
export type EditOrderSchema = z.infer<typeof editOrderSchema>;
export type DeleteOrderSchema = z.infer<typeof deleteOrderSchema>;
