import { productsPageElements } from './dom.js';
import { filterProductsEvent } from './events.js';
import { templates } from './templates.js';

/**
 * 
 * @returns Array de Tags html con los nombres de las categorías
 */
export default function showCategories() {
    var amountByCategory = getAllCategories();
    var productsTypesListContent = ``;
    amountByCategory.forEach(category => {
        productsTypesListContent += templates.categoryCheckbox(category);
    });
    productsPageElements.filtersSection.innerHTML += productsTypesListContent;

    var elements = document.getElementsByClassName("products__category_category");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", filterProductsEvent, false);
    };
};

function getAllCategories() {
    var amountByCategory = [];
    let products = JSON.parse(localStorage.getItem('products')).products;

    for (const product of products) {
        var index = amountByCategory.findIndex(el => el.category == product.category);
        if (index < 0) {
            amountByCategory.push({ category: product.category, count: 1 });
        } else {
            amountByCategory[index].count++;
        }
    };
    return amountByCategory;
};