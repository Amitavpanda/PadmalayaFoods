import { Express, Request, Response } from "express";
import validate from "./middleware/validateResource.js";
import { registerUserSchema, loginUserSchema, otpVerificationSchema, resendOtpSchema } from "@repo/validations/userSchema";
import { loginHandler, logOutHandler, otpVerificationHandler, registerHandler, resendOtpHandler } from "./controllers/users.controller.js";
import { authenticateAccessToken } from "./middleware/authMiddleware.js";
import { addCategorySchema, editCategorySchema, deleteCategorySchema } from "@repo/validations/categorySchema";
import { addProductSchema, editProductSchema, deleteProductSchema } from "@repo/validations/productSchema";
import { addCategoryHandler, deleteCategoryHandler, editCategoryHandler } from "./controllers/category.controller.js";
import { addProductHandler, deleteProductHandler, editProductHandler } from "./controllers/product.controller.js";
import { addOrderSchema, editOrderSchema, deleteOrderSchema } from "@repo/validations/orderSchema";
import {addOrderHandler, editOrderHandler, getOrdersHandler, deleteOrderHandler} from "./controllers/order.controller.js";

function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    app.use((req: Request, res: Response, next) => {
        console.log("CORS Headers:", res.getHeaders()); // Log headers for each route
        next();
    });

    app.post('/register', validate(registerUserSchema), registerHandler);
    app.post('/otpVerification', validate(otpVerificationSchema), otpVerificationHandler)
    app.post('/login', validate(loginUserSchema), loginHandler);
    app.post('/logout', logOutHandler);
    app.post('/resendOtp', validate(resendOtpSchema), resendOtpHandler);
    app.get('/profile', authenticateAccessToken, (req, res) => {
        res.json({ message: 'User profile' });
    });
    app.post('/addCategory', authenticateAccessToken, validate(addCategorySchema), addCategoryHandler);

    app.put('/editCategory/:categoryId', authenticateAccessToken, validate(editCategorySchema), editCategoryHandler);

    app.delete('/deleteCategory/:categoryId', authenticateAccessToken, validate(deleteCategorySchema), deleteCategoryHandler);

    app.post('/addProduct', authenticateAccessToken, validate(addProductSchema), addProductHandler);

    app.put('/editProduct/:productId', authenticateAccessToken, validate(editProductSchema), editProductHandler);

    app.delete('/deleteProduct/:productId', authenticateAccessToken, validate(deleteProductSchema), deleteProductHandler);

    // app.get('/paymentAPI', authenticateAccessToken, (req, res) => {
    app.post('/addOrder', authenticateAccessToken, validate(addOrderSchema), addOrderHandler);

    app.put('/editOrder/:orderId', authenticateAccessToken, validate(editOrderSchema), editOrderHandler);

    app.delete('/deleteOrder/:orderId', authenticateAccessToken, validate(deleteOrderSchema), deleteOrderHandler);

    app.get('/getOrders', authenticateAccessToken, getOrdersHandler);
    //     res.json({ message: 'User profile'});

    //     // 
    // });


    // app.get('/addTOCart', (req, res) => {
    //     res.json({ message: 'User profile'});

    // 
    // });





}

export default routes;