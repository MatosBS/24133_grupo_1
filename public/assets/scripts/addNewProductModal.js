const addNewProductModal = document.getElementById('addNewProductModal');
import { updateProductOnClickEvent } from './events.js';


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
if (addNewProductModal) {
  addNewProductModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget
    const productId = button.getAttribute('data-bs-productId')
    if (productId) {
      const modalTitle = addNewProductModal.querySelector('.modal-title');
      const name = addNewProductModal.querySelector('input[name="name"]');

      const producto = JSON.parse(localStorage.getItem('products')).products.filter(product => product.id == productId)[0];
      console.log(producto)
      modalTitle.textContent = `Editando producto #${productId} - ${producto.name}`;
      
      name.value = producto.name;

      const price = addNewProductModal.querySelector('input[name="price"]');
      price.value = producto.price;

      const stock = addNewProductModal.querySelector('input[name="stock"]');
      stock.value = producto.stock;

      var category;
      switch (producto.category) {
        case 'Crema':
          category = 2;
          break;
        case 'Emulsión':
          category = 3;
          break;
        case 'Pote':
          category = 4;
          break;
      };
      category = addNewProductModal.querySelector(`select[name="category"] option:nth-of-type(${category})`);
      category.setAttribute('selected', true);

      const form = addNewProductModal.querySelector('form');
      form.removeAttribute('action');
      form.removeAttribute('method');
      form.setAttribute('id', productId)

      const updateProductButtons = addNewProductModal.querySelector('button.btn-success');
      updateProductButtons.textContent = "Actualizar";
      updateProductButtons.addEventListener('click', updateProductOnClickEvent);
    }
  })
}