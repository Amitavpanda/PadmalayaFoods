import { PrismaClient } from '@prisma/client';
import { error } from "@repo/logs/logs"; // Assuming you have a logging system set up

const prisma = new PrismaClient();

export async function addOrderService(customerId: string, productId: string, deliveryStatus: string, paymentStatus: string, deliveryDate?: Date, orderDate? : Date, quantity?: number, pricing?: number, amount?: number) {
    try {
        const newOrder = await prisma.order.create({
            data: {
                customerId,
                productId,
                orderDate: new Date(), 
                quantity,
                pricing,
                amount,    // Automatically set the order creation date
                deliveryStatus,
                deliveryDate,
                paymentStatus,

            },
        });
        return { success: true, data: newOrder };
    } catch (e: any) {
        error("Error in addOrderService", e);
        throw e; // Throw the error to handle in the controller
    }
}

export async function editOrderService(orderId: string, deliveryStatus?: string, paymentStatus?: string, deliveryDate?: Date, orderDate?: Date, quantity?: number, pricing?: number, amount?: any) {
    try {
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                deliveryStatus,
                paymentStatus,
                deliveryDate,
                quantity,
                pricing,
                amount,
            },
        });
        return { success: true, data: updatedOrder };
    } catch (e: any) {
        error("Error in editOrderService", e);
        throw e;
    }
}

export async function deleteOrderService(orderId: string) {
    try {
        await prisma.order.delete({
            where: { id: orderId },
        });
    } catch (e: any) {
        error("Error in deleteOrderService", e);
        throw e;
    }
}

export async function getOrdersService() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                customer: true, // Include customer details if needed
                product: true,  // Include product details if needed
            },
        });
        return orders;
    } catch (e: any) {
        error("Error in getOrdersService", e);
        throw e;
    }
}