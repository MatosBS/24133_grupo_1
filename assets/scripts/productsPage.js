var getProducts = function (appliedFilters = [], searchedText) {
    let productsListContent = ``;
    let productsFilters = products.filter(searchedProducts => appliedFilters.includes(searchedProducts.type.toLowerCase()));
    
    if (searchedText) {
        searchedText = searchedText.trim();
        searchedText = searchedText.toLowerCase();
        productsFilters = productsFilters.filter(searchedProducts => searchedProducts.name.toLocaleLowerCase().includes(searchedText));
    };

    productsFilters.forEach(product => {
        var imgSrc = `./assets/products/${product.name.replaceAll(' ', '_')}.png`;
        productsListContent += `<article class="products__items">
            <figure>
            <img src="${imgSrc}">
            </figure>
            <div class="products__items_info">
            <h3 title="${product.name}">${product.name}</h3>
            <p>${product.price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</p>
            <button class="buttons">Añadir al carrito</button>
            </div>
            </article>
        `;
    });
    
    return productsListContent;
};

var getAllCategories = function () {
    var amountByCategory = [];
    products.forEach(product => {
        var index = amountByCategory.findIndex(el => el.category == product.type);
        if (index < 0) {
            amountByCategory.push({ category: product.type, count: 1 });
        } else {
            amountByCategory[index].count++;
        }
    });

    var productsTypesListContent = ``;
    amountByCategory.forEach(category => {
        productsTypesListContent += `
            <li><input type="checkbox" checked id="${category.category.toLowerCase()}" class="products__category_category"> <label for="${category.category.toLowerCase()}">${category.category} (${category.count})</label></li>
        `;
    });
    return productsTypesListContent;
};
    
function getAppliedFilters() {
    var appliedFilters = document.getElementsByClassName("products__category_category")
    let checkedFilters = Array.prototype.filter.call(
        appliedFilters,
        (testElement) => testElement.checked,
    );
    return checkedFilters.map((el) => el.id);
};

function updateFilters() {
    var searchInput = document.getElementById('searchInput');
    var products = getProducts(getAppliedFilters(), searchInput.value);

    if (products.length > 0) {
        document.getElementById("productsList").innerHTML = products;
    } else {
        document.getElementById("productsList").innerHTML = `<div id="error-message">
        <p>Lo sentimos, no encontramos productos.</p><p>Por favor, intenta ajustar tus filtros de búsqueda.</p>
      </div>`;
    };
};

function load() {
    var elements = document.getElementsByClassName("products__category_category");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", updateFilters, false);
    };

    var searchInput = document.getElementById('searchInput');
    searchInput.addEventListener("keyup", updateFilters, false);
};

document.addEventListener("DOMContentLoaded", load, false);
document.getElementById("categories").innerHTML += getAllCategories();
document.getElementById("productsList").innerHTML = getProducts(getAppliedFilters());