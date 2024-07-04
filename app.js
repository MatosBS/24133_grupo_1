import express from 'express';
import cors from 'cors';
import productsRoutes from './products/products.routes.js';
// import { middlewares } from './middlewares/index.js';


const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors({
  origin: 'https://pinkaonline.onrender.com',
}));

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productsRoutes);

// app.use(middlewares.errors.errorController)

app.listen(PORT, () => {
  console.clear();
  console.log(`Listening en http://localhost:${PORT}`);
});