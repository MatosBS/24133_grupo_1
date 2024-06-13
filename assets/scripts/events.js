import { contactoPageElements, productsPageElements } from './dom.js';
import { addItemToProductsArray, getAllCategories, getAppliedFilters, getProducts, getTotalAmountInCart, removeItemFromProductsArray, updateAmountInHeader, updateQuantityFromProductInUI, displayFieldError, hideFieldError } from './functions.js';
import { templates } from './templates.js';

export async function renderProductList() {
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
export async function renderCategories() {
    var amountByCategory = await getAllCategories();
    var productsTypesListContent = ``;
    amountByCategory.forEach(category => {
        productsTypesListContent += templates.categoryCheckbox(category);
    });
    productsPageElements.filtersSection.innerHTML += productsTypesListContent;
};

export async function load() {
    await renderCategories()
    await renderProductList()
    var elements = document.getElementsByClassName("products__category_category");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", renderProductList, false);
    };

    await console.log('ESTOY PROBANDOOOO')
    const response = await fetch('http://localhost:8080/products', { method: 'GET'});
    const body = await response.json();
    await console.log(body)

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

export function dropdownHandleKeyUp (e) {
    if (e.target.value == 'reaccion') {
        contactoPageElements.imagen.style.display = 'block';
    } else {
        contactoPageElements.imagen.style.display = 'none';
    };
};

export function inputFieldsHandleKeyUp (e) {
    e.target.value.length == 0 ?
        displayFieldError(e, 'Este campo es obligatorio') :
        hideFieldError(e);
};

export function emailHandleKeyUp (e) {
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

export function validateForm (e) {
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