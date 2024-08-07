import Product from '../models/Product.js';

const productAdapter = (data, file = '') => {
    if (file !== '')
        file = file.filename

    let { name, price, category, stock } = data;

    switch (category) {
        case 'Crema':
          category = 1;
          break;
        case 'Emulsión':
          category = 2;
          break;
        case 'Pote':
          category = 3;
          break;
      };
    stock = parseInt(stock);
    price = parseFloat(price);
    const product = new Product(name, price, category, stock, file);
    return product;
};


export const adapters = {
    productAdapter
};