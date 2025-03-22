import { Request, Response } from 'express';
import { addProductService, deleteProductService, editProductService } from '../services/product.service.js';

// Add a new category
export const addProductHandler = async (req: Request, res: Response)=> {
        // Logic to add category (e.g., save to database)
        const response = await addProductService(req);

        return res.send(response);

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