const API_URL = "http://localhost:3000/api/products";

// Obtener todos los productos+
export const getProducts = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

// Obtener Producto por ID
export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

// Crear Producto
export const createProduct = async (product) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(product)
    });
    return response.json();
};

// Actualizar Producto
export const updateProduct = async (id,product) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(product)
    });
    return response.json();
};

// Eliminar Producto
export const deleteProduct = async (id) => {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    
};  
