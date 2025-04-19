import { PrismaClient } from "@repo/db/client";
import { error, info } from "@repo/logs/logs";
import { AddProductSchema, EditProductSchema, DeleteProductSchema } from "@repo/validations/productSchema";


const prisma = new PrismaClient();

export async function addProductService(input: AddProductSchema) {
    const { productName, categoryId, pricing, image, stockStatus } = input.body;
    try {
        const newProduct = await prisma.product.create({
            data: {
                productName,
                categoryId,
                pricing,
                image,
                stockStatus,
            },
        });
        return {success : true, data : newProduct};
    } catch (e : any) {
        error("Error in addProductService", e);
        return e;
    }
    
}

export async function getProductsByCategoryService(categoryId: string) {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: categoryId, 
            },
            select: {
                id: true,
                productName: true,
                image: true,
                pricing: true, 
            },
        });
        return products;
    } catch (e: any) {
        error("Error in getProductsByCategoryService", e);
        throw e; 
    }
}

export async function editProductService(input: EditProductSchema) {
    const { productId } = input.params;
    const { productName, categoryId, pricing, image, stockStatus } = input.body;

    try {
        const product = await prisma.product.update({
            where: {
                id : productId,
            },
            data: {
                productName,
                categoryId,
                pricing,
                image,
                stockStatus,
            },
        });
        return {success : true, data : product};
    } catch (e : any) {
        error("Error in editProductService", e);
        return e;
    }
}

export async function deleteProductService(input: DeleteProductSchema) {
    const { productId } = input.params;

    try {
        const product = await prisma.product.delete({
            where: {
                id : productId,
            },
        });
        return product;
    } catch (e : any) {
        error("Error in deleteProductService", e);
        return e;
    }
}