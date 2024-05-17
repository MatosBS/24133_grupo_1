export const templates = {
    categoryCheckbox: (category) => {
        return `<li><input type="checkbox" checked id="${category.category.toLowerCase()}" class="products__category_category"> <label for="${category.category.toLowerCase()}">${category.category} (${category.count})</label></li>`;
    },

    productItem: (product) => {
        var imgSrc = `./assets/products/${product.name.replaceAll(' ', '_')}.png`;
        return `<article class="products__items">
        <figure>
        <img src="${imgSrc}">
        </figure>
        <div class="products__items_info">
        <h3 title="${product.name}">${product.name}</h3>
        <p>${product.price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</p>
        <button class="buttons">Añadir al carrito</button>
        </div>
        </article>`;
    },

    noProductsAvailableLabel: () => {
        return `<div id="error-message">
        <p>Lo sentimos, no encontramos productos.</p><p>Por favor, intenta ajustar tus filtros de búsqueda.</p>
        </div>`;
    }
};