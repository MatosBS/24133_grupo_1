import { adapters } from './products.adapter.js';
import { db } from './products.dao.mysql.js';
import { messages } from './products.data.js';

const getAllProducts = async (_, res) => {
    const result = await db.getProducts();
    res.json(result);
};

const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const product = adapters.productAdapter(req.body);
    const result = await db.updateProduct(id, product)
    result.message === '0' ? res.json(messages.upd) : next(result)
};

const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    const result = await db.deleteProduct(id)
    result.message === '0' ? res.json(messages.upd) : next(result)
};

export const controllers = {
    getAllProducts,
    updateProduct,
    deleteProduct
};