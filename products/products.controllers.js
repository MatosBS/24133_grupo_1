import { db } from './products.dao.mysql.js';

const getAllProducts = async (_, res) => {
    const result = await db.getProducts();
    res.json(result);
};


// const getProductsProducts = async (req, res) => {
//     let appliedFilters = req.query.filters.split(',');
//     appliedFilters = appliedFilters.map(filter => filter.toLowerCase());

//     let productsFiltered = this.products.filter(product => appliedFilters.includes(product.type.toLowerCase()));
//     res.json(productsFiltered);
// };


// getProductsByCategory(req, res) {
//     res.json(data);
// };

// export async function getProducts(appliedFilters = [], searchedText) {
//     let productsListContent = [];
//     let allProducts = await getAllProductsJson();
//     let productsFilters = allProducts.filter(searchedProducts => appliedFilters.includes(searchedProducts.type.toLowerCase()));

//     if (searchedText) {
//         searchedText = searchedText.trim();
//         searchedText = searchedText.toLowerCase();
//         productsFilters = productsFilters.filter(searchedProducts => searchedProducts.name.toLocaleLowerCase().includes(searchedText));
//     };

//     for (const product of productsFilters) {
//         productsListContent.push(product);
//     };
//     return productsListContent;
// };
export const controllers = {
    getAllProducts,
    // getProductsProducts
};