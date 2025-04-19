import { Request, Response } from 'express';
import { addToCartService, clearCartService, deleteCartItemService, getCartItemsService } from '../services/cart.service.js';



export const addToCartHandler = async (req: Request, res: Response) => {
    const { customerId, productId, quantity, productImage } = req.body;

    // Validate required fields
    if (!customerId || !productId || !quantity) {
        return res.status(400).send({ error: 'Customer ID, Product ID, and Quantity are required' });
    }

    try {
        const response = await addToCartService(customerId, productId, quantity, productImage);
        return res.status(201).json(response); // Respond with the result
    } catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).send({ error: 'Error adding to cart' });
    }
};


export const getCartItemsHandler = async (req: Request, res: Response) => {
    const customerId = req.query.customerId as string;

    if (!customerId) {
        return res.status(400).send({ error: 'Customer ID is required' });
    }

    try {
        const cartItems = await getCartItemsService(customerId);
        return res.status(200).json(cartItems); // Return cart items
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).send({ error: 'Error fetching cart items' });
    }
};

export const clearCartHandler = async (req: Request, res: Response) => {
    const { customerId } = req.body;

    if (!customerId) {
        return res.status(400).send({ error: 'Customer ID is required' });
    }

    try {
        await clearCartService(customerId);
        return res.status(204).send(); // No content response
    } catch (error) {
        console.error('Error clearing cart:', error);
        return res.status(500).send({ error: 'Error clearing cart' });
    }
};



export const deleteCartItemHandler = async (req: Request, res: Response) => {
    const { cartItemId } = req.params;

    // Validate required fields
    if (!cartItemId) {
        return res.status(400).send({ error: 'Cart Item ID is required' });
    }

    try {
        await deleteCartItemService(cartItemId);
        return res.status(204).send(); // No content response
    } catch (error) {
        console.error('Error deleting cart item:', error);
        return res.status(500).send({ error: 'Error deleting cart item' });
    }
};