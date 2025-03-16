import { Express, Request, Response } from "express";

function routes(app : Express){
    app.get('/healthcheck', (req : Request, res : Response)  => res.sendStatus(200));
    
    app.use((req: Request, res: Response, next) => {
        console.log("CORS Headers:", res.getHeaders()); // Log headers for each route
        next();
    });

    
    




}

export default routes;