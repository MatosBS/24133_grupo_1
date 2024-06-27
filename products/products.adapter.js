import Product from '../models/Product.js';

const productAdapter = (data, file = '') => {
    // if (file !== '')
    //     file = './public/products/' + file.filename

    let { name, price, category, stock } = data;

    category = parseInt(category);
    stock = parseInt(stock);
    price = parseFloat(price);
    const product = new Product(name, price, category, stock);
    return product;
};


export const adapters = {
    productAdapter
};