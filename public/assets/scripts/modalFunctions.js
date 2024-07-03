import { updateProductOnClickEvent } from './events.js';

const getValuesFromForm = (form) => {
  return {
    id: form.getAttribute('id'),
    name: form.querySelector('input[name="name"]').value,
    price: form.querySelector('input[name="price"]').value,
    stock: form.querySelector('input[name="stock"]').value,
    category: form.querySelector('select[name="category"] option[selected]:not([disabled])').value
  };
};

const setValuesInModalAndUpdateToEdit = (product, modal) => {
  console.log(product)
      const lblTitle = modal.querySelector('.modal-title');
      lblTitle.textContent = `Editando producto #${product.id} - ${product.name}`;
      
      const txtName = modal.querySelector('input[name="name"]');
      txtName.value = product.name;

      const txtPrice = modal.querySelector('input[name="price"]');
      txtPrice.value = product.price;

      const txtStock = modal.querySelector('input[name="stock"]');
      txtStock.value = product.stock;

      var ddlCategoryOption;
      switch (product.category) {
        case 'Crema':
          ddlCategoryOption = 2;
          break;
        case 'Emulsión':
          ddlCategoryOption = 3;
          break;
        case 'Pote':
          ddlCategoryOption = 4;
          break;
      };
      ddlCategoryOption = modal.querySelector(`select[name="category"] option:nth-of-type(${ddlCategoryOption})`);
      ddlCategoryOption.setAttribute('selected', true);

      const img = modal.querySelector('form div:has(input[type = "file"])');
      img.hidden = true;

      const form = modal.querySelector('form');
      form.removeAttribute('action');
      form.removeAttribute('method');
      form.setAttribute('id', product.id)

      const btnUpdateProduct = modal.querySelector('button.btn-success');
      btnUpdateProduct.textContent = "Actualizar";
      btnUpdateProduct.addEventListener('click', updateProductOnClickEvent);
};


export const modalFunctions = {
  getValuesFromForm,
  setValuesInModalAndUpdateToEdit
};