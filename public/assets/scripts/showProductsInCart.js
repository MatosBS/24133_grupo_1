import { cartElements } from './dom.js';
import { removeEntireProductFromCartEvent } from './events.js';
import { cartTemplates } from './templates.js';

const showProductsToEdit = () => {
    const products = JSON.parse(localStorage.getItem('cart')).products;
    let suma = 0;

    for (let product of products) {
        const productContainer = document.createElement('div')
        productContainer.className = 'cart-products-item';
        productContainer.id = product.productId;
        productContainer.innerHTML = cartTemplates.productItem(product);
        cartElements.productsListSection.append(productContainer)

        var removeItemButtons = document.querySelectorAll('.remove-from-cart');
        for (let i = 0; i < removeItemButtons.length; i++) {
            removeItemButtons[i].addEventListener("click", removeEntireProductFromCartEvent, false);
        };

        suma += product.unitPrice * product.quantity;
    };
    document.getElementById("cartAmount").outerText = "";
    document.getElementById("cartAmount").innerHTML = suma.toLocaleString('us-US', { style: 'currency', currency: 'USD' });
};

showProductsToEdit();