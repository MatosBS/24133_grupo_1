import { getAllCategories, getAppliedFilters, getProducts, load } from './functions.js';

document.getElementById("categories").innerHTML += await getAllCategories();
document.getElementById("productsList").innerHTML = await getProducts(getAppliedFilters());
document.addEventListener("DOMContentLoaded", load(), false);