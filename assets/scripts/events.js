import { productsPageElements } from './dom.js';
import { addItemToProductsArray, getAllCategories, getAppliedFilters, getProducts, getTotalAmountInCart, removeItemFromProductsArray, updateAmountInHeader, updateQuantityFromProductInUI } from './functions.js';
import { templates } from './templates.js';

export async function renderProductList () {
    getProducts(getAppliedFilters(), productsPageElements.searchInput.value).then(products => {
        if (products.length > 0) {
            let productsListContent = products.map(product => templates.productItem(product)).join('');
            productsPageElements.productsListSection.innerHTML = productsListContent;
        } else {
            productsPageElements.productsListSection.innerHTML = templates.noProductsAvailableLabel();
        };

        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach((card) => {
            card.addEventListener('click', addToCart);
        });
        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach((card) => {
            card.addEventListener('click', removeFromCart);
        });
    });
    updateAmountInHeader(getTotalAmountInCart());
};

/**
 * 
 * @returns Array de Tags html con los nombres de las categorías
 */

export async function renderCategories () {
    var amountByCategory = await getAllCategories();
    var productsTypesListContent = ``;
    amountByCategory.forEach(category => {
        productsTypesListContent += templates.categoryCheckbox(category);
    });
    productsPageElements.filtersSection.innerHTML += productsTypesListContent;
};

export async function load () {
    await renderCategories()
    await renderProductList()
    var elements = document.getElementsByClassName("products__category_category");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", renderProductList, false);
    };

    var searchInput = document.getElementById('searchInput');
    searchInput.addEventListener("keyup", renderProductList, false);    
};

export function addToCart(e) {
    let productId = parseInt(e.currentTarget.closest('article').id);
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = addItemToProductsArray(cart, productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateAmountInHeader(getTotalAmountInCart());
    updateQuantityFromProductInUI(e.currentTarget, productId);
};

export function removeFromCart(e) {
    let productId = parseInt(e.currentTarget.closest('article').id);
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = removeItemFromProductsArray(cart, productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateAmountInHeader(getTotalAmountInCart());
    updateQuantityFromProductInUI(e.currentTarget, productId);
};