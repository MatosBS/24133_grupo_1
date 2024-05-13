var getProducts = function (appliedFilters) {
    var productsListContent = ``;
    const getHtmlTagForProducts = function (product) {
        var imgSrc = `../assets/products/${product.name.replaceAll(' ', '_')}.png`;
        return `<article class="products__items">
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
    };
    !appliedFilters ?
        products.forEach(product => {
            productsListContent += getHtmlTagForProducts(product);
        })
    : products.filter(searchedProducts => appliedFilters.includes(searchedProducts.type.toLowerCase())).forEach(product => {
            productsListContent += getHtmlTagForProducts(product);
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
            <li><input type="checkbox" id="${category.category.toLowerCase()}" class="products__category_category"> <label for="${category.category.toLowerCase()}">${category.category} (${category.count})</label></li>
        `;
    });
    return productsTypesListContent;
};
    


function updateFilters() {
    var appliedFilters = document.getElementsByClassName("products__category_category")
    let checkedFilters = Array.prototype.filter.call(
        appliedFilters,
        (testElement) => testElement.checked,
    );
    checkedFilters = checkedFilters.map((el) => el.id);
    document.getElementById("productsList").innerHTML = getProducts(checkedFilters);
};

function load() {
    var elements = document.getElementsByClassName("products__category_category")
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", updateFilters, false)
    }
};

document.addEventListener("DOMContentLoaded", load, false)
document.getElementById("categories").innerHTML += getAllCategories();
document.getElementById("productsList").innerHTML = getProducts();