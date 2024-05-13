var getProducts = function (appliedFilters = []) {
    var productsListContent = ``;

    products.filter(searchedProducts => appliedFilters.includes(searchedProducts.type.toLowerCase())).forEach(product => {
        var imgSrc = `../assets/products/${product.name.replaceAll(' ', '_')}.png`;
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
    document.getElementById("productsList").innerHTML = getProducts(getAppliedFilters);
};

function load() {
    var elements = document.getElementsByClassName("products__category_category")
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", updateFilters, false)
    }
};

document.addEventListener("DOMContentLoaded", load, false)
document.getElementById("categories").innerHTML += getAllCategories();
document.getElementById("productsList").innerHTML = getProducts(getAppliedFilters());