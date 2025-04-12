document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const cartContentElement = document.getElementById('cart-content');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Initialize cart from localStorage
    let cart = [];
    const savedCart = localStorage.getItem('computerPartsCart');
    
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    // Display cart items
    function displayCart() {
        if (cart.length === 0) {
            // If cart is empty
            cartContentElement.innerHTML = `
                <div class="empty-cart">
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added any items to your cart yet.</p>
                </div>
            `;
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = 0.5;
            return;
        }
        
        // Create table for cart items
        let cartHTML = `
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th class="quantity-column">Quantity</th>
                        <th class="price-column">Price</th>
                        <th class="subtotal-column">Subtotal</th>
                        <th class="actions-column">Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        // Calculate total
        let totalAmount = 0;
        
        // Add each item to the table
        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            totalAmount += subtotal;
            
            cartHTML += `
                <tr data-id="${item.id}">
                    <td>${item.name}</td>
                    <td>
                        <div class="quantity-control">
                            <button class="cart-update" data-action="decrease" data-index="${index}">-</button>
                            <input type="number" min="1" value="${item.quantity}" class="cart-quantity" data-index="${index}">
                            <button class="cart-update" data-action="increase" data-index="${index}">+</button>
                        </div>
                    </td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>$${subtotal.toFixed(2)}</td>
                    <td>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </td>
                </tr>
            `;
        });
        
        // Close table and add summary
        cartHTML += `
                </tbody>
            </table>
            
            <div class="cart-summary">
                <div class="cart-total">
                    Total: $${totalAmount.toFixed(2)}
                </div>
            </div>
        `;
        
        // Update cart content
        cartContentElement.innerHTML = cartHTML;
        
        // Add event listeners to the newly created buttons
        addCartEventListeners();
    }
    
    // Add event listeners for cart interactions
    function addCartEventListeners() {
        // Get all remove buttons
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                removeItem(index);
            });
        });
        
        // Get all update buttons
        const updateButtons = document.querySelectorAll('.cart-update');
        updateButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const action = this.dataset.action;
                updateQuantity(index, action);
            });
        });
        
        // Get all quantity inputs
        const quantityInputs = document.querySelectorAll('.cart-quantity');
        quantityInputs.forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.dataset.index);
                updateQuantityManually(index, this.value);
            });
        });
    }
    
    // Function to remove item from cart
    function removeItem(index) {
        // Remove item from cart array
        cart.splice(index, 1);
        
        // Save updated cart to localStorage
        localStorage.setItem('computerPartsCart', JSON.stringify(cart));
        
        // Update display
        displayCart();
    }
    
    // Function to update quantity using buttons
    function updateQuantity(index, action) {
        if (action === 'increase') {
            cart[index].quantity++;
        } else if (action === 'decrease' && cart[index].quantity > 1) {
            cart[index].quantity--;
        }
        
        // Save updated cart to localStorage
        localStorage.setItem('computerPartsCart', JSON.stringify(cart));
        
        // Update display
        displayCart();
    }
    
    // Function to update quantity manually through input
    function updateQuantityManually(index, value) {
        // Parse value as integer
        let quantity = parseInt(value);
        
        // Make sure quantity is at least 1
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }
        
        // Update cart item
        cart[index].quantity = quantity;
        
        // Save updated cart to localStorage
        localStorage.setItem('computerPartsCart', JSON.stringify(cart));
        
        // Update display
        displayCart();
    }
    
    // Continue shopping button event listener
    continueShoppingBtn.addEventListener('click', function() {
        window.location.href = 'javascript.html';
    });
    
    // Checkout button event listener
    checkoutBtn.addEventListener('click', function() {
        alert('Thank you for your purchase! This is where the checkout process would begin.');
        window.location.href = 'payment info.html';
        // Clear cart after purchase
        cart = [];
        localStorage.setItem('computerPartsCart', JSON.stringify(cart));
        displayCart();

    });
    
    // Initial display of cart
    displayCart();
});