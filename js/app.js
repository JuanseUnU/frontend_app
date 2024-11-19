// Importamos los metodos de la api.js
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./api.js";

// Traemos todos los productos y los mostramos en la pagina principal
document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById("product-list");

    const products = await getProducts();
    productsList.innerHTML = products.map(product =>`
        <div class="col-xs12 col-sm-6 col-md-3 card">
            <div class="card-body d-flex flex-column justify-content-end">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.price}</p>
                <a onclick="viewProduct(${product.id})" class="btn btn-primary">Ver más</a>
                </div>
            </div>
        `).join("");
});

