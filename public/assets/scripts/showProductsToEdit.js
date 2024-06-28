import { adminProductsElements } from './dom.js';
import { adminProductsTemplates } from './templates.js';
import { updateProductOnClickEvent, deleteProductOnClickEvent } from './events.js';

const showProductsToEdit = (products) => {
    for (let product of products) {
        const productContainer = document.createElement('article')
        productContainer.className = 'products__items';
        productContainer.id = product.id;
        productContainer.innerHTML = adminProductsTemplates.productItem(product);
        adminProductsElements.productsListSection.append(productContainer)
    };

    const updateProductButtons = document.querySelectorAll('.updateProductButton');
    updateProductButtons.forEach((card) => {
        card.addEventListener('click', updateProductOnClickEvent);
    });

    const deleteProductButtons = document.querySelectorAll('.deleteProductButton');
    deleteProductButtons.forEach((card) => {
        card.addEventListener('click', deleteProductOnClickEvent);
    });
};

fetch('https://pinkaonline.onrender.com/products')
    // fetch('http://localhost:8080/products')
    .then(res => res.json())
    .then(res => showProductsToEdit(res))
    .catch(err => console.log(err));