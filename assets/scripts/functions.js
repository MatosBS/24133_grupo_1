import { productsPageElements } from './dom.js';

async function getAllProductsJson() {
    let allProducts = await fetch('./assets/data/products.json').then(res => res.json());
    return allProducts;
};

export function updateAmountInHeader(amount) {
    document.getElementById("cartAmount").innerHTML = amount;
}

export function getTotalAmountInCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    return cart.products.length == 0 ?
        0 :
        cart.products.map(product => product.quantity).reduce((a, b) => a + b);
}
export function
    getQuantityFromProductInCart(productId) {
    let productsInCart = JSON.parse(localStorage.getItem('cart'));
    let product = productsInCart.products.find(product => product.productId == productId);

    return product ? product.quantity : 0;
};

export function updateQuantityFromProductInUI(element, productId) {
    let quantityElement = element.closest('article').querySelector('.products__items_info--quantity');
    quantityElement.innerHTML = getQuantityFromProductInCart(productId);
};

/**
 * 
 * @param {*} appliedFilters Array de strings con los filtros aplicados
 * @param {*} searchedText String con el texto ingresado por el usuario
 */
export async function getProducts(appliedFilters = [], searchedText) {
    let productsListContent = [];
    let allProducts = await getAllProductsJson();
    let productsFilters = allProducts.filter(searchedProducts => appliedFilters.includes(searchedProducts.type.toLowerCase()));

    if (searchedText) {
        searchedText = searchedText.trim();
        searchedText = searchedText.toLowerCase();
        productsFilters = productsFilters.filter(searchedProducts => searchedProducts.name.toLocaleLowerCase().includes(searchedText));
    };

    for (const product of productsFilters) {
        productsListContent.push(product);
    };
    return productsListContent;
};

/**
 * @returns Un array de strings con los filtros aplicados
 */
export function getAppliedFilters() {
    let checkedFilters = Array.prototype.filter.call(
        productsPageElements.checkboxFilters,
        (testElement) => testElement.checked,
    );
    return checkedFilters.map((el) => el.id);
};

export async function getAllCategories() {
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
    return amountByCategory;
};

export function addItemToProductsArray(productsJson, productId) {
    let index = productsJson.products.findIndex(product => {
        return product.productId == productId
    });
    if (index < 0) {
        productsJson.products.push({ productId: productId, quantity: 1 });
    } else {
        productsJson.products[index].quantity++;
    };
    productsJson.count++;
    return productsJson;
};

export function removeItemFromProductsArray(productsJson, productId) {
    let index = productsJson.products.findIndex(product => {
        return product.productId == productId
    });
    if (index => 0) {
        if (productsJson.products[index].quantity == 1) {
            productsJson.products = productsJson.products.filter(product => product.productId !== productId);
        } else {
            productsJson.products[index].quantity--;
        }
        productsJson.count--;
    };
    return productsJson;
};

export function hideFieldError (e) {
    var errorDiv = document.getElementById(e.target.id + 'Error');
    errorDiv.innerText = '';
    e.target.classList.remove('error');
};

export function displayFieldError (e, msg) {
    var errorDiv = document.getElementById(e.target.id + 'Error');
    errorDiv.innerText = `* ${msg}`;
    e.target.classList.add('error');
};