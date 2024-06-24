import { productsPageElements } from './dom.js';

export function saveProductsInLocalStorage(products) {
    const productJson = {
        count: products.length,
        products: products
    }
    localStorage.setItem('products', JSON.stringify(productJson));
}

export function updateAmountInHeader(amount) {
    document.getElementById("cartAmount").innerHTML = amount;
}

export function getTotalAmountInCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    return cart.products.length == 0 ?
        0 :
        cart.products.map(product => product.quantity).reduce((a, b) => a + b);
}
export function getQuantityFromProductInCart(productId) {
    let productsInCart = JSON.parse(localStorage.getItem('cart'));
    let product = productsInCart.products.find(product => product.productId == productId);

    return product ? product.quantity : 0;
};

export function updateQuantityFromProductInUI(element, productId) {
    let quantityElement = element.closest('article').querySelector('.products__items_info--quantity');
    quantityElement.innerHTML = getQuantityFromProductInCart(productId);
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

export function hideFieldError(e) {
    var errorDiv = document.getElementById(e.target.id + 'Error');
    errorDiv.innerText = '';
    e.target.classList.remove('error');
};

export function displayFieldError(e, msg) {
    var errorDiv = document.getElementById(e.target.id + 'Error');
    errorDiv.innerText = `* ${msg}`;
    e.target.classList.add('error');
};