import express from 'express';
import productsRoutes from '../products/products.routes.js';
// import { middlewares } from './middlewares/index.js';
// import ProductsByCategoryRoutes from '../routes/productsByCategory.routes.js';

export default class Server {

    static app = express();

    static middlewares() {
        Server.app.use(express.json());
        Server.app.use(express.urlencoded({ extended: true }));
    }

    static routes() {
        Server.app.use('/products', productsRoutes);
        // const productsByCategory = new ProductsByCategoryRoutes();
        // Server.app.use('/productsByCategory', productsByCategory.router);
    }

    static runServer(port) {
        Server.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    };

    static run(port) {
        console.clear();
        Server.app.use(express.static('public'))
        Server.middlewares();
        // Server.app.use(middlewares.errors.errorController)
        Server.routes();
        Server.runServer(port);
    };
};