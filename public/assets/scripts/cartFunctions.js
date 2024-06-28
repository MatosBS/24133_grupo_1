export function addItemToProductsArray(productsJson, productData) {
    let index = productsJson.products.findIndex(product => {
        return product.productId == productData.productId
    });
    if (index < 0) {
        productsJson.products.push({
            productId: productData.productId,
            name: productData.name,
            unitPrice: productData.unitPrice,
            quantity: 1
        });
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

export function removeEntireItemFromProductsArray(productsJson, productId) {
    let index = productsJson.products.findIndex(product => {
        return product.productId == productId
    });

    productsJson.count = productsJson.count - productsJson.products[index].quantity;
    productsJson.products = productsJson.products.filter(product => product.productId !== productId);
    return productsJson;
};