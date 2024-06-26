import { productsPageElements } from './dom.js';
import { addToCartEvent, filterProductsEvent, removeFromCartEvent } from './events.js';
import { getTotalAmountInCart, saveProductsInLocalStorage, updateAmountInHeader } from './functions.js';
import showCategories from './showCategories.js';
import { templates } from './templates.js';

const showAllProducts = (products) => {
    for (let product of products) {
        const productContainer = document.createElement('article')
        productContainer.className = 'products__items';
        productContainer.id = product.id
        productContainer.innerHTML = templates.productItem(product);
        productsPageElements.productsListSection.append(productContainer)

    };

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach((card) => {
        card.addEventListener('click', addToCartEvent);
    });

    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach((card) => {
        card.addEventListener('click', removeFromCartEvent);
    });

    saveProductsInLocalStorage(products);
    updateAmountInHeader(getTotalAmountInCart());

    var searchInput = document.getElementById('searchInput');
    searchInput.addEventListener("keyup", filterProductsEvent, false);

    showCategories();
};

fetch('https://pinkaonline.onrender.com/products')
    // fetch('http://localhost:8080/products')
    .then(res => res.json())
    .then(res => showAllProducts(res))
    .catch(err => console.log(err))