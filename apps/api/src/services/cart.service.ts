import { PrismaClient } from '@prisma/client';
import { error } from "@repo/logs/logs"; // Assuming you have a logging system set up

const prisma = new PrismaClient();



export async function addToCartService(customerId: string, productId: string, quantity: number, productImage: string) {
    try {
        const cartItem = await prisma.cart.upsert({
            where: {
                customerId_productId: {
                    customerId,
                    productId,
                },
            },
            update: {
                quantity: { increment: quantity }, // Increment the quantity if item already exists
            },
            create: {
                customerId,
                productId,
                quantity,
                productImage
            },
        });
        return { success: true, data: cartItem };
    } catch (e: any) {
        error("Error in addToCartService", e);
        throw e; // Rethrow to handle in the controller
    }
}


export async function getCartItemsService(customerId: string) {
    try {
        const cartItems = await prisma.cart.findMany({
            where: { customerId },
            include: {
                product: true, // Include product details, if needed
            },
        });
        return cartItems;
    } catch (e: any) {
        error("Error in getCartItemsService", e);
        throw e;
    }
}


export async function clearCartService(customerId: string) {
    try {
        await prisma.cart.deleteMany({
            where: { customerId },
        });
    } catch (e: any) {
        error("Error in clearCartService", e);
        throw e;
    }
}


export async function deleteCartItemService(cartItemId: string) {
    try {
        await prisma.cart.delete({
            where: { id: cartItemId }, // Delete the cart item by its ID
        });
    } catch (e: any) {
        error("Error in deleteCartItemService", e);
        throw e; // Rethrow to handle in the controller
    }
}