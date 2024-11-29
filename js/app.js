// Importamos los metodos de la api.js
import { getProducts, getProductById, updateProduct, deleteProduct } from "./api.js";

// Traemos todos los productos y los mostramos en la pagina principal
document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById("product-list");

    const products = await getProducts();
    productList.innerHTML = products.map(product =>`
        <div class="col-xs12 col-sm-6 col-md-3 card">
        <img class="img-fluid" src="${product.imgUrl}">
            <div class="card-body d-flex flex-column justify-content-end">
                <h5 class="card-title">${product.name}</h5>
                <h5 class="card-title">${product.talla}</h5>
                <p class="card-text">${product.price}</p>
                <a onclick="viewProduct(${product.id})" class="btn btn-primary">Ver más</a>
                </div>
            </div>
        `).join("");
});

// Crear la vista de detalles para cada producto al dar click en el boton ver más
window.viewProduct = async (id) => {
    const product = await getProductById(id);
    const productDetails = `
      <div class="col">
        <img class="img-fluid" src="${product.imgUrl}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <h3>${product.talla}</h3>
        <p>Precio: ${new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD' }).format(product.price)}</p>
        <button class="btn btn-warning" onclick="enableEdit(${product.id})">Editar</button>
        <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Eliminar</button>
      </div>
      `;
    document.getElementById('product-list').innerHTML = productDetails;
  };
  
  // Habilitamos el formulario para editar cada uno de los productos
  window.enableEdit = async (id) => {
    const product = await getProductById(id);
    const editForm = `
      <div class="row gap-3">
        <input type="text" id="name" value="${product.name}">
        <textarea id="description">${product.description}</textarea>
        <input type="text" id="talla" value="${product.talla}">
        <input type="number" id="price" value="${product.price}">
        <input type="text" id="imgUrl" value="${product.imgUrl}">
        <button class="btn btn-success" onclick="saveEdit(${id})">Guardar</button>
      </div>
      `;
    document.getElementById('product-list').innerHTML = editForm;
  };
  
  // Guardamos la nueva información en nuestra base de datos
  window.saveEdit = async (id) => {
    const updatedProduct = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      talla: document.getElementById('talla').value,
      price: parseFloat(document.getElementById('price').value),
      imgUrl: document.getElementById('imgUrl').value
    };
    await updateProduct(id, updatedProduct);
    location.reload(); // Recarga la página para ver los cambios
  };
  
  // Función para borrar el producto seleccionado
  window.deleteProduct = async (id) => {
    await deleteProduct(id);
    location.reload(); // Recarga la página para ver los cambios
  };
  