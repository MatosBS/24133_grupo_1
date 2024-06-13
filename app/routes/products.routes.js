import ProductsControllers from '../controllers/products.controllers.js';
import Routes from './Routes.js';

 export default class ProductsRoutes extends Routes {
    constructor() {
      super();
      this.controller  = new ProductsControllers();
      this.getRoutes();
    };

    getRoutes() {
        this.router
            .all('/', function(req, res, next) {
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Headers", "X-Requested-With");
              next();
             })
            .get('/', this.controller.getAllProducts)
            .post('/', (req, res) => {})
            .put('/', (req, res) => {})
            .delete('/', (req, res) => {})
    };
 };