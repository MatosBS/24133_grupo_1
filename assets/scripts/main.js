import { getTotalAmountInCart, updateAmountInHeader } from './functions.js';

if (!localStorage.getItem('cart')) {
    let newCard = {count: 0, products: []};
    localStorage.setItem('cart', JSON.stringify(newCard));
}
updateAmountInHeader(getTotalAmountInCart());