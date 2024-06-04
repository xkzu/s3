let cart = [];

export function addToCart(productName, productPrice) {
    let product = cart.find(p => p.name === productName);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    displayCart();
}

export function displayCart() {
    let cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        cartItems.innerHTML += `<tr>
            <td>${item.name}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="decrementQuantity(${index})">-</button>
                ${item.quantity}
                <button class="btn btn-secondary btn-sm" onclick="incrementQuantity(${index})">+</button>
            </td>
            <td>${item.price}</td>
            <td>${item.price * item.quantity}</td>
            <td><button class="btn btn-danger" onclick="removeFromCart(${index})">Eliminar</button></td>
        </tr>`;
    });
}

export function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

export function incrementQuantity(index) {
    cart[index].quantity += 1;
    displayCart();
}

export function decrementQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1); // Eliminar el producto si la cantidad es 0
    }
    displayCart();
}

export function checkout() {
    let user = localStorage.getItem('user');
    if (!user) {
        alert('Por favor, inicia sesión para proceder con el pago.');
        return;
    }
    document.getElementById('paymentForm').style.display = 'block';
}

document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Pagado con Éxito!!');
    cart = [];
    displayCart();
    document.getElementById('paymentForm').style.display = 'none';
});
