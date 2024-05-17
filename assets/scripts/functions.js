import { productsPageElements } from './dom.js';
import { templates } from './templates.js';

async function getAllProductsJson () {
    let allProducts = await fetch('./assets/data/products.json').then(res => res.json());
    return allProducts;
};

/**
 * 
 * @param {*} appliedFilters Array de strings con los filtros aplicados
 * @param {*} searchedText String con el texto ingresado por el usuario
 */
export async function getProducts (appliedFilters = [], searchedText)  {
        let productsListContent = ``;
        let allProducts = await getAllProductsJson();
        let productsFilters = allProducts.filter(searchedProducts => appliedFilters.includes(searchedProducts.type.toLowerCase()));
        
        if (searchedText) {
            searchedText = searchedText.trim();
            searchedText = searchedText.toLowerCase();
            productsFilters = productsFilters.filter(searchedProducts => searchedProducts.name.toLocaleLowerCase().includes(searchedText));
        };

        for (const product of productsFilters) {
            productsListContent += templates.productItem(product);
        };
        return productsListContent;
};

/**
 * @returns Un array de strings con los filtros aplicados
 */
export function getAppliedFilters () {
    let checkedFilters = Array.prototype.filter.call(
        productsPageElements.checkboxFilters,
        (testElement) => testElement.checked,
    );
    return checkedFilters.map((el) => el.id);
};

export async function updateFilters () {
    var searchInput = document.getElementById('searchInput');
    getProducts(getAppliedFilters(), searchInput.value).then(products => {
        if (products.length > 0) {
            productsPageElements.productsList.innerHTML = products;
        } else {
            productsPageElements.productsList.innerHTML = templates.noProductsAvailableLabel();
        };    
    })
};

export function load () {
    var elements = document.getElementsByClassName("products__category_category");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", updateFilters, false);
    };

    var searchInput = document.getElementById('searchInput');
    searchInput.addEventListener("keyup", updateFilters, false);
};

/**
 * 
 * @returns Array de Tags html con los nombres de las categorías
 */

export async function getAllCategories () {
    var amountByCategory = [];
    let allProducts = await getAllProductsJson();
    for (const product of allProducts) {
        var index = amountByCategory.findIndex(el => el.category == product.type);
        if (index < 0) {
            amountByCategory.push({ category: product.type, count: 1 });
        } else {
            amountByCategory[index].count++;
        }
    };

    var productsTypesListContent = ``;
    amountByCategory.forEach(category => {
        productsTypesListContent += templates.categoryCheckbox(category);
    });
    return productsTypesListContent;
};