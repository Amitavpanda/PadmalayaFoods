import { Request, Response } from 'express';
import { addProductService, deleteProductService, editProductService, getProductsByCategoryService } from '../services/product.service.js';

// Add a new category
export const addProductHandler = async (req: Request, res: Response)=> {
        // Logic to add category (e.g., save to database)
        const response = await addProductService(req);

        return res.send(response);

};

export const getProductByCategoryHandler = async (req: Request, res: Response)=> {
    const { categoryId } = req.query; // Retrieve categoryId from the query parameters

    // Validate required fields
    if (!categoryId) {
        return res.status(400).send({ error: 'Category ID is required' });
    }

    try {
        const products = await getProductsByCategoryService(categoryId as string); // Ensure categoryId is a string
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return res.status(500).send({ error: 'Error fetching products by category' });
    }

};


// Delete a category
export const deleteProductHandler = async (req: Request, res: Response) => {

    const productId = req.params.productId;
    if (!productId) {
        return res.status(400).send({ error: 'Product ID is required' });
    }
    const response = await deleteProductService({ params: { productId } });
    return res.send(response);
};

// Edit a category
export const editProductHandler = async (req: Request, res: Response) => {


    const { productId } = req.params;
    const { productName, categoryId, pricing, image, stockStatus } = req.body;

    if (!productId) {
        return res.status(400).send({ error: 'Product ID is required' });
    }

    const response = await editProductService({
        params: { productId },
        body: { productName, categoryId, pricing, image, stockStatus },
    });
    return res.send(response);
};