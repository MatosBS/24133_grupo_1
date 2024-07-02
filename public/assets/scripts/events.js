import { addItemToProductsArray, removeEntireItemFromProductsArray, removeItemFromProductsArray } from './cartFunctions.js';
import { contactoPageElements, productsPageElements } from './dom.js';
import { getAppliedFilters, getTotalAmountInCart, updateAmountInHeader, updateQuantityFromProductInUI, displayFieldError, hideFieldError } from './functions.js';
import { templates } from './templates.js';

export function filterProductsEvent() {
    const activeCategoriesCheckboxes = getAppliedFilters();
    const products = JSON.parse(localStorage.getItem('products')).products;

    let productsFiltered = products.filter(product => {
        return activeCategoriesCheckboxes.includes(product.category.toLowerCase());
    });

    if (productsPageElements.searchInput.value.length > 0) {
        productsFiltered = productsFiltered.filter(product => product.name.toLowerCase().includes(productsPageElements.searchInput.value.toLowerCase()));
    };

    if (productsFiltered.length > 0) {
        productsPageElements.productsListSection.innerHTML = '';
        productsFiltered.forEach(product => {
            const productContainer = document.createElement('article')
            productContainer.className = 'products__items';
            productContainer.id = product.id
            productContainer.innerHTML = templates.productItem(product);
            productsPageElements.productsListSection.append(productContainer)
        });
    } else {
        productsPageElements.productsListSection.innerHTML = templates.noProductsAvailableLabel();
    };

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach((card) => {
        card.addEventListener('click', addToCartEvent);
    });
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach((card) => {
        card.addEventListener('click', removeFromCartEvent);
    });
    updateAmountInHeader(getTotalAmountInCart());
};

export function addToCartEvent(e) {
    const productId = parseInt(e.currentTarget.closest('article').id);
    let product = {
        productId: productId,
        name: document.querySelector(`article[id = "${productId}"] *[name="name"]`).textContent,
        unitPrice: document.querySelector(`article[id = "${productId}"] *[name="price"]`).textContent.replace('$', '')
    };

    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = addItemToProductsArray(cart, product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateAmountInHeader(getTotalAmountInCart());
    updateQuantityFromProductInUI(e.currentTarget, productId);
};


export function updateProductOnClickEvent(e) {
    e.preventDefault();

    const form = e.currentTarget.closest('form');
    const productId = form.getAttribute('id');
      
    const body = {
        name: form.querySelector('input[name="name"]').value,
        price: form.querySelector('input[name="price"]').value,
        stock: form.querySelector('input[name="stock"]').value,
        category: form.querySelector('select[name="category"] option[selected]:not([disabled])').value
    };

    const url = 'https://pinkaonline.onrender.com/products/' + producto.id;
    // const url = 'http://localhost:8080/products/' + productId;
    fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => errorCheck(res))
        .catch(err => alert(err));
};

export function deleteProductOnClickEvent(e) {
    e.preventDefault();
    let productId = e.currentTarget.closest('tr').id;
    let name = document.querySelector(`tr[id = "${productId}"] td[name="name"]`).textContent;
    if (confirm(`¿Está seguro que desea eliminar el producto ${name}?`) == true) {
        const url = 'https://pinkaonline.onrender.com/products/' + productId;
        // const url = 'http://localhost:8080/products/' + productId;
        fetch(url, { method: "DELETE" })
            .then(res => res.json())
            .then(res => errorCheck(res))
            .catch(err => alert(err));
    };
};

const errorCheck = (error) => {
    if (error.error_code === 1 ||
        error.error_code === 3 ||
        error.error_code === 10)
        alert(error.error_desc)

    if (error.error_code === 0) {
        alert(error.desc)
        window.location.reload();
    }
}

export function removeEntireProductFromCartEvent(e) {
    let productId = parseInt(e.currentTarget.closest('div.cart-products-item').id);
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = removeEntireItemFromProductsArray(cart, productId);
    localStorage.setItem('cart', JSON.stringify(cart));

    updateAmountInHeader(getTotalAmountInCart());
    window.location.reload();
};

export function removeFromCartEvent(e) {
    let productId = parseInt(e.currentTarget.closest('article').id);
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = removeItemFromProductsArray(cart, productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateAmountInHeader(getTotalAmountInCart());
    updateQuantityFromProductInUI(e.currentTarget, productId);
};

export function dropdownHandleKeyUpEvent(e) {
    if (e.target.value == 'reaccion') {
        contactoPageElements.imagen.style.display = 'block';
    } else {
        contactoPageElements.imagen.style.display = 'none';
    };
};

export function inputFieldsHandleKeyUpEvent(e) {
    e.target.value.length == 0 ?
        displayFieldError(e, 'Este campo es obligatorio') :
        hideFieldError(e);
};

export function emailHandleKeyUpEvent(e) {
    if (e.target.value.length > 0) {
        const email = e.target.value

        const haveDotCom = email.includes('.com')
        const haveDotNet = email.includes('.net')
        const haveDotOrg = email.includes('.org')
        const haveAt = email.indexOf('@') >= 0

        email.length > 4 && haveAt && (haveDotCom || haveDotNet || haveDotOrg)
            ? hideFieldError(e)
            : displayFieldError(e, 'Email invalido')
    };
};

export function validateFormEvent(e) {
    e.preventDefault();
    const hasNombreYApellido = contactoPageElements.nombreYApellido.value.length > 0;
    const hasMail = contactoPageElements.mail.value.length > 0;
    const hasTelefono = contactoPageElements.telefono.value.length > 0;
    const hasMotivo = contactoPageElements.motivo.value !== 'select';
    const hasComentarios = contactoPageElements.comentarios.value.length > 0;


    if (document.querySelectorAll('input.error').length == 0 && hasNombreYApellido && hasMail && hasTelefono && hasMotivo && hasComentarios) {
        alert('Gracias por contactarnos!');
    } else {
        alert('Por favor, complete todos los campos');
    };
}
