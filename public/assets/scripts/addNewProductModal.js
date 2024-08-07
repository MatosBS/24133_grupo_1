const addNewProductModal = document.getElementById('addNewProductModal');
import { updateProductOnClickEvent } from './events.js';
import { modalFunctions } from './modalFunctions.js';

const resetModal = () => {
  addNewProductModal.innerHTML = `
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar nuevo producto</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <!-- <form enctype="multipart/form-data" action="http://localhost:8080/products" method="POST"> -->
        <form enctype="multipart/form-data" action="https://pinkaonline.onrender.com/products" method="POST">
          <div class="form-floating mb-3">
            <input name="name" type="text" class="form-control" id="name" placeholder="Nombre" />
            <label for="name">Nombre</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" min="0" placeholder="Precio" name="price" id="price" class="form-control">
            <label for="price">Precio</label>
          </div>
          <div class="form-floating mb-3">
            <input type="number" min="0" placeholder="Stock" name="stock" id="stock" class="form-control">
            <label for="stock">Stock</label>
          </div>
          <div>
            <select name="category" id="category" class="form-control">
              <option value="0" disabled selected>Seleccionar una categoría</option>
              <option name="crema" value="1" >Crema</option>
              <option name="emulsion" value="2">Emulsión</option>
              <option name="pote" value="3">Pote</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="image" class="form-label">Seleccionar imagen</label>
            <input name="image" class="form-control" type="file" id="image" />
          </div>
          <button class="btn btn-success">Agregar</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cancelar</button>
        </form>
      </div>
    </div>
  </div>
`;
};

resetModal();

if (addNewProductModal) {
  addNewProductModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget
    const productId = button.getAttribute('data-bs-productId')
    if (productId) {
      const producto = JSON.parse(localStorage.getItem('products')).products.filter(product => product.id == productId)[0];

      modalFunctions.setValuesInModalAndUpdateToEdit(producto, addNewProductModal);
    } else {
      resetModal();
    }
  });
};