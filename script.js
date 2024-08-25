// Mock Data: Products
const products = [
    { id: 1, name: "Product 1", price: 10.00, description: "Description for Product 1" },
    { id: 2, name: "Product 2", price: 20.00, description: "Description for Product 2" }
];

// Add to Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart`);
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = parseInt(button.closest('.product').dataset.id);
        addToCart(productId);
    });
});

// Display Product Details on Product Page
const productId = new URLSearchParams(window.location.search).get('id');
if (productId) {
    const product = products.find(p => p.id === parseInt(productId));
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-description').textContent = product.description;
    
    document.getElementById('add-to-cart').addEventListener('click', () => {
        addToCart(product.id);
    });
}

// Display Cart Items
const cartItemsContainer = document.getElementById('cart-items');
if (cartItemsContainer) {
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Price: $${item.price.toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(cartItem);
