export function addItemToProductsArray(productsJson, productId) {
    let index = productsJson.products.findIndex(product => {
        return product.productId == productId
    });
    if (index < 0) {
        productsJson.products.push({ productId: productId, quantity: 1 });
    } else {
        productsJson.products[index].quantity++;
    };
    productsJson.count++;
    return productsJson;
};

export function removeItemFromProductsArray(productsJson, productId) {
    let index = productsJson.products.findIndex(product => {
        return product.productId == productId
    });
    if (index >= 0) {
        if (productsJson.products[index].quantity == 1) {
            productsJson.products = productsJson.products.filter(product => product.productId !== productId);
        } else {
            productsJson.products[index].quantity--;
        }
        productsJson.count--;
    };
    return productsJson;
};