import { getQuantityFromProductInCart } from './functions.js';

export const templates = {
    categoryCheckbox: (category) => {
        return `<li><input type="checkbox" checked id="${category.category.toLowerCase()}" class="products__category_category"> <label for="${category.category.toLowerCase()}">${category.category} (${category.count})</label></li>`;
    },

    productItem: (product) => {
        var imgSrc = `./assets/products/${product.imageFileName}`;
        return `<figure>
        <img src="${imgSrc}">
        </figure>
        <div class="products__items_info">
        <h3 name="name" title="${product.name}">${product.name}</h3>
        <p name="price">$${product.price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</p>
        <button class="buttons remove-from-cart">-</button>
        <p class="products__items_info--quantity">${getQuantityFromProductInCart(product.id)}</p>
        <button class="buttons add-to-cart">+</button>
        </div>`;
    },

    noProductsAvailableLabel: () => {
        return `<div class="error-message" id="error-message">
        <p>Lo sentimos, no encontramos productos.</p><p>Por favor, intenta ajustar tus filtros de búsqueda.</p>
        </div>`;
    }
};

export const adminProductsTemplates = {
    productItem: (product) => {
        var imgSrc = `./assets/products/${product.imageFileName}`;
        return `<figure>
            <img src="${imgSrc}" alt="${product.name}">
        </figure>
        <div class="products__items_info products__items_plusminus">
            <input type="text" name="name" value="${product.name}">
            <input type="text" name="price" value="$${product.price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}">
            <select name="category">
              <option value="1" ${product.category == 'Crema' ? 'selected' : ''}}>Crema</option>
              <option value="2" ${product.category == 'Emulsión' ? 'selected' : ''}>Emulsión</option>
              <option value="3" ${product.category == 'Pote' ? 'selected' : ''}>Pote</option>
            </select>
            <input type="number" name="stock" value=${product.stock}>
            <button type="submit" class="buttons button_plus_minus updateProductButton">Actualizar producto</button>
            <button type="submit" class="buttons button_plus_minus deleteProductButton">Eliminar producto</button>
        </div>`;
    },

    productRow: (product) => {
        var imgSrc = `./assets/products/${product.imageFileName}`;

        return `
            <th>${product.id}</th>
            <td><img style="max-height: 50px; max-width: 50px;" src="${imgSrc}" alt="${product.name}"></td>
            <td name="name">${product.name}</td>
            <td>${product.price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</td>
            <td>${product.category}</td>
            <td>${product.stock}</td>
            <td><button type="button" class="btn btn-primary btn-update-product" data-bs-toggle="modal" data-bs-target="#addNewProductModal" data-bs-productId="${product.id}">Editar</button><button type="button" class="btn btn-danger btn-remove-product">Eliminar</button></td>
        `;
    }
};

export const cartTemplates = {
    productItem: (product) => {
        var subtotal = Number(product.unitPrice).toFixed(2) * product.quantity;
        return `<div style="width: 70%;">
            <h4>${product.name}</h4>
            <div>
              <p><span>Unidades: ${product.quantity}</span> | <span>Precio Unitario: $${product.unitPrice.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span> | <span>Total: ${subtotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span></p>
            </div>
          </div>
          <div class="cart-item-quit">
            <button class="buttons remove-from-cart">
              <img src="./assets/icons/quit.svg" alt="eliminar">
            </button>
          </div>`;
    }
};