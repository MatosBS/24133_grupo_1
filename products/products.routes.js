import { Router } from 'express'
import { middlewares } from '../middlewares/index.js'
import { controllers } from './products.controllers.js'

const router = Router()

router
  .all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  })
  .use(middlewares.routes.checkRoute)
  .get('/',
    controllers.getAllProducts)

export default router;