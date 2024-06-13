import data from '../../assets/data/products.json' assert {type: 'json'};
import productsMock from '../db/products.mock.js'

export default class ProductsControllers {
    constructor() {
        this.products = productsMock;
    };

    getAllProducts = (req, res) => {
        res.json(this.products);
    };

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
};