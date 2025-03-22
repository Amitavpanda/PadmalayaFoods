import { Request, Response } from 'express';
import {addOrderService, editOrderService, deleteOrderService, getOrdersService} from "../services/orders.service.js";
export const addOrderHandler = async (req: Request, res: Response) => {
    const { customerId, productId, deliveryStatus, deliveryDate, paymentStatus, orderDate, quantity, pricing, amount } = req.body;

    // Validate required fields
    if (!customerId || !productId) {
        return res.status(400).send({ error: 'Customer ID and Product ID are required' });
    }

    try {
        const newOrder = await addOrderService(customerId, productId, deliveryStatus, paymentStatus, deliveryDate, orderDate, quantity, pricing, amount);
        return res.status(201).json(newOrder); // Respond with the newly created order
    } catch (error) {
        console.error('Error adding order:', error);
        return res.status(500).send({ error: 'Error adding order' });
    }
};

export const editOrderHandler = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { deliveryStatus, paymentStatus, deliveryDate, orderDate, quantity, pricing, amount} = req.body;

    if (!orderId) {
        return res.status(400).send({ error: 'Order ID is required' });
    }

    try {
        const updatedOrder = await editOrderService(orderId, deliveryStatus, paymentStatus, deliveryDate, orderDate, quantity, pricing, amount);
        return res.status(200).json(updatedOrder); // Respond with the updated order details
    } catch (error) {
        console.error('Error editing order:', error);
        return res.status(500).send({ error: 'Error editing order' });
    }
};

export const deleteOrderHandler = async (req: Request, res: Response) => {
    const { orderId } = req.params;

    if (!orderId) {
        return res.status(400).send({ error: 'Order ID is required' });
    }

    try {
        await deleteOrderService(orderId);
        return res.status(204).send(); // No content response on successful deletion
    } catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).send({ error: 'Error deleting order' });
    }
};

export const getOrdersHandler = async (req: Request, res: Response) => {
    try {
        const orders = await getOrdersService();
        return res.status(200).json(orders); // Return the list of orders
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).send({ error: 'Error fetching orders' });
    }
};