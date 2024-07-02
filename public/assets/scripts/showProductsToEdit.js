import { adminProductsTemplates } from './templates.js';
import { deleteProductOnClickEvent } from './events.js';
import { saveProductsInLocalStorage } from './functions.js';

const showProductsToEdit = (products) => {
    const productsTable = document.querySelector('#productsTable');
    for (let product of products) {
        const productRow = document.createElement('tr')
        productRow.id = product.id;
        productRow.innerHTML = adminProductsTemplates.productRow(product);
        productsTable.append(productRow)
    };

    const deleteProductRows = document.querySelectorAll('.btn-remove-product');
    deleteProductRows.forEach((card) => {
        card.addEventListener('click', deleteProductOnClickEvent);
    });

    saveProductsInLocalStorage(products);
};

fetch('https://pinkaonline.onrender.com/products')
// fetch('http://localhost:8080/products')
    .then(res => res.json())
    .then(res => showProductsToEdit(res))
    .catch(err => console.log(err));