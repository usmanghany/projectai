// Product Database
const products = [
    {
        id: 1,
        title: "buy2bm 100W GaN Fast Charger Dual Port",
        category: "Chargers",
        price: 39.99,
        discount: "20% OFF",
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        title: "buy2bm Wireless Active Noise Cancelling Headphones",
        category: "Audio",
        price: 89.99,
        discount: "15% OFF",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        title: "buy2bm 20000mAh 22.5W Digital Display Power Bank",
        category: "Power Banks",
        price: 45.50,
        discount: "10% OFF",
        image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        title: "buy2bm 8-in-1 USB-C Multiport Adapter Hub",
        category: "Hubs",
        price: 29.99,
        discount: "25% OFF",
        image: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5,
        title: "buy2bm TWS Earbuds with Smart Touch Control",
        category: "Audio",
        price: 34.99,
        discount: "30% OFF",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 6,
        title: "buy2bm Magnetic Wireless Charging Pad 15W",
        category: "Chargers",
        price: 24.99,
        discount: "15% OFF",
        image: "https://images.unsplash.com/photo-1622445268465-8422768584ba?auto=format&fit=crop&w=400&q=80"
    }
];

// App State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeModal = document.getElementById('closeModal');
const checkoutForm = document.getElementById('checkoutForm');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryNavItems = document.querySelectorAll('.main-nav ul li');

// Initialize Store Catalog
function renderProducts(items) {
    productGrid.innerHTML = '';
    if (items.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No products matched your criteria.</p>';
        return;
    }
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="badge-discount">${product.discount}</div>
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <div class="price">$${product.price.toFixed(2)}</div>
            <button class="btn-add-cart" onclick="addToCart(${product.id})">ADD TO CART</button>
        `;
        productGrid.appendChild(card);
    });
}

// Shopping Cart Actions
function addToCart(productId) {
    const item = products.find(p => p.id === productId);
    const existingIndex = cart.findIndex(p => p.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    updateCartUI();
    openCartSidebar();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <span>$${item.price.toFixed(2)} x ${item.qty}</span>
            </div>
            <i class="fa fa-trash" style="color: red; cursor: pointer;" onclick="removeFromCart(${item.id})"></i>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartCount.innerText = count;
    cartTotal.innerText = `$${total.toFixed(2)}`;
}

// Drawer Controls
function openCartSidebar() {
    cartSidebar.classList.add('open');
    cartOverlay.style.display = 'block';
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    cartOverlay.style.display = 'none';
}

// Event Listeners
cartToggle.addEventListener('click', openCartSidebar);
closeCart.addEventListener('click', closeCartSidebar);
cartOverlay.addEventListener('click', closeCartSidebar);

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is currently empty!");
        return;
    }
    closeCartSidebar();
    checkoutModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
});

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your buy2bm order has been placed successfully.');
    cart = [];
    updateCartUI();
    checkoutModal.style.display = 'none';
});

// Category Filter Event Handler
categoryNavItems.forEach(item => {
    item.addEventListener('click', () => {
        categoryNavItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const selectedCat = item.getAttribute('data-category');
        
        if (selectedCat === 'all') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === selectedCat);
            renderProducts(filtered);
        }
    });
});

// Search Bar Event Handler
function executeSearch() {
    const query = searchInput.value.toLowerCase().trim();
    const results = products.filter(p => p.title.toLowerCase().includes(query));
    renderProducts(results);
}

searchBtn.addEventListener('click', executeSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') executeSearch();
});

// Initial Render
renderProducts(products);