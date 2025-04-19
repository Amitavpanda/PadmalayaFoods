import { PrismaClient } from "@repo/db/client";
import { AddCategorySchema, EditCategorySchema, DeleteCategorySchema } from "@repo/validations/categorySchema";
import { error, info } from "@repo/logs/logs";


const prisma = new PrismaClient();

export async function addCategoryService(input: AddCategorySchema) {
    const { categoryName, categoryImage } = input.body;
    try {
        const category = await prisma.category.create({
            data: {
                categoryName,
                categoryImage,
            },
        });
        return category;
    } catch (e : any) {
        error("Error in addCategoryService", e);
        return e;
    }
    
}

export async function editCategoryService(input: EditCategorySchema) {
    const { categoryId } = input.params;
    const { categoryName, categoryImage } = input.body;

    try {
        const category = await prisma.category.update({
            where: {
                id : categoryId,
            },
            data: {
                categoryName,
                categoryImage,
            },
        });
        return category;
    } catch (e : any) {
        error("Error in editCategoryService", e);
        return e;
    }
}

export async function deleteCategoryService(input: DeleteCategorySchema) {
    const { categoryId } = input.params;

    try {
        const category = await prisma.category.delete({
            where: {
                id : categoryId,
            },
        });
        return category;
    } catch (e : any) {
        error("Error in deleteCategoryService", e);
        return e;
    }
}




export async function getCategoriesService() {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                categoryName: true,
                categoryImage: true,
            },
        });
        return categories;
    } catch (e: any) {
        error("Error in getCategoriesService", e);
        throw e; 
    }
}