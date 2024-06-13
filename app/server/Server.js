import express from 'express';
import ProductsRoutes from '../routes/products.routes.js';

export default class Server {

    static app = express();

    static middlewares() {
        Server.app.use(express.json());
        Server.app.use(express.urlencoded({ extended: true }));
    }
    
    static routes() {
        const usersRoutes = new ProductsRoutes();
        Server.app.use('/products', usersRoutes.router);
    }
    
    static runServer(port) {
        Server.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    };

    static run(port) {
        console.clear();
        Server.middlewares();
        Server.routes();
        Server.runServer(port);
    };
};