import { helpers } from '../helpers/files.helpers.js';
import { adapters } from './products.adapter.js';
import { db } from './products.dao.mysql.js';
import { messages } from './products.data.js';

const getAllProducts = async (_, res) => {
    const result = await db.getProducts();
    res.json(result);
};

const createProduct = async (req, res, next) => {
    const product = adapters.productAdapter(req.body, req.file)
    const result = await db.createProduct(product)
    result.message === '0' ? res.json(messages.cre) : next(result)
}

const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const product = adapters.productAdapter(req.body);
    const result = await db.updateProduct(id, product)
    result.message === '0' ? res.json(messages.upd) : next(result)
};

const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    const fileName = await db.getFileName(id);
    const result = await db.deleteProduct(id)
    helpers.removeFile(fileName);
    result.message === '0' ? res.json(messages.del) : next(result)
};

export const controllers = {
    getAllProducts,
    updateProduct,
    deleteProduct,
    createProduct
};