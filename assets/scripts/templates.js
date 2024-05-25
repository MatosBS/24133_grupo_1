import { getQuantityFromProductInCart } from './functions.js';

export const templates = {
    categoryCheckbox: (category) => {
        return `<li><input type="checkbox" checked id="${category.category.toLowerCase()}" class="products__category_category"> <label for="${category.category.toLowerCase()}">${category.category} (${category.count})</label></li>`;
    },

    productItem: (product) => {
        var imgSrc = `./assets/products/${product.name.replaceAll(' ', '_')}.webp`;
        return `<article class="products__items" id="${product.id}">
        <figure>
        <img src="${imgSrc}">
        </figure>
        <div class="products__items_info">
        <h3 title="${product.name}">${product.name}</h3>
        <p>${product.price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</p>
        <button class="buttons add-to-cart">+</button>
        <p class="products__items_info--quantity">${getQuantityFromProductInCart(product.id)}</p>
        <button class="buttons remove-from-cart">-</button>
        </div>
        </article>`;
    },

    noProductsAvailableLabel: () => {
        return `<div class="error-message" id="error-message">
        <p>Lo sentimos, no encontramos productos.</p><p>Por favor, intenta ajustar tus filtros de búsqueda.</p>
        </div>`;
    }
};