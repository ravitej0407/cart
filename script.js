/* ========================================
   QuickMart - Main JavaScript
   ======================================== */

// --- Configuration ---
const DELIVERY_FEE = 20;
const FREE_DELIVERY_THRESHOLD = 299;
const CART_STORAGE_KEY = 'quickmart_cart';

// --- Category Data ---
const categories = [
  { id: 'all', name: 'All', icon: 'images/categories/all.svg' },
  { id: 'Fresh', name: 'Fresh', icon: 'images/categories/fresh.svg' },
  { id: 'Vegetables', name: 'Vegetables', icon: 'images/categories/vegetables.svg' },
  { id: 'Fruits', name: 'Fruits', icon: 'images/categories/fruits.svg' },
  { id: 'Dairy', name: 'Dairy', icon: 'images/categories/dairy.svg' },
  { id: 'Atta, Rice & Dal', name: 'Atta, Rice & Dal', icon: 'images/categories/atta-rice-dal.svg' },
  { id: 'Oil & Ghee', name: 'Oil & Ghee', icon: 'images/categories/oil-ghee.svg' },
  { id: 'Snacks & Biscuits', name: 'Snacks & Biscuits', icon: 'images/categories/snacks.svg' },
  { id: 'Cold Drinks & Juices', name: 'Cold Drinks & Juices', icon: 'images/categories/drinks.svg' },
  { id: 'Tea & Coffee', name: 'Tea & Coffee', icon: 'images/categories/tea-coffee.svg' },
  { id: 'Instant Food', name: 'Instant Food', icon: 'images/categories/instant-food.svg' },
  { id: 'Frozen Food', name: 'Frozen Food', icon: 'images/categories/frozen.svg' },
  { id: 'Beauty & Personal Care', name: 'Beauty & Personal Care', icon: 'images/categories/beauty.svg' },
  { id: 'Cleaning Essentials', name: 'Cleaning Essentials', icon: 'images/categories/cleaning.svg' },
  { id: 'Baby Care', name: 'Baby Care', icon: 'images/categories/baby.svg' },
  { id: 'Pet Care', name: 'Pet Care', icon: 'images/categories/pet.svg' }
];

// --- Product Data (43 products) ---
const products = [
  // Fresh Fruits
  { id: 1, name: 'Apple', category: 'Fruits', section: 'Fresh Fruits', quantity: '1 kg', price: 120, originalPrice: 150, image: 'images/products/apple.svg' },
  { id: 2, name: 'Banana', category: 'Fruits', section: 'Fresh Fruits', quantity: '1 dozen', price: 45, originalPrice: 55, image: 'images/products/banana.svg' },
  { id: 3, name: 'Orange', category: 'Fruits', section: 'Fresh Fruits', quantity: '1 kg', price: 80, originalPrice: 100, image: 'images/products/orange.svg' },
  { id: 4, name: 'Mango', category: 'Fruits', section: 'Fresh Fruits', quantity: '1 kg', price: 150, originalPrice: 180, image: 'images/products/mango.svg' },

  // Vegetables
  { id: 5, name: 'Tomato', category: 'Vegetables', section: 'Vegetables', quantity: '1 kg', price: 35, originalPrice: 45, image: 'images/products/tomato.svg' },
  { id: 6, name: 'Potato', category: 'Vegetables', section: 'Vegetables', quantity: '1 kg', price: 30, originalPrice: 38, image: 'images/products/potato.svg' },
  { id: 7, name: 'Onion', category: 'Vegetables', section: 'Vegetables', quantity: '1 kg', price: 28, originalPrice: 35, image: 'images/products/onion.svg' },
  { id: 8, name: 'Carrot', category: 'Vegetables', section: 'Vegetables', quantity: '500 g', price: 40, originalPrice: 50, image: 'images/products/carrot.svg' },

  // Dairy
  { id: 9, name: 'Amul Milk', category: 'Dairy', section: 'Dairy', quantity: '1 L', price: 56, originalPrice: 60, image: 'images/products/amul-milk.svg' },
  { id: 10, name: 'Curd', category: 'Dairy', section: 'Dairy', quantity: '400 g', price: 35, originalPrice: 40, image: 'images/products/curd.svg' },
  { id: 11, name: 'Paneer', category: 'Dairy', section: 'Dairy', quantity: '200 g', price: 85, originalPrice: 95, image: 'images/products/paneer.svg' },
  { id: 12, name: 'Amul Butter', category: 'Dairy', section: 'Dairy', quantity: '100 g', price: 55, originalPrice: 60, image: 'images/products/amul-butter.svg' },

  // Rice & Grains
  { id: 13, name: 'India Gate Basmati Rice', category: 'Atta, Rice & Dal', section: 'Rice & Grains', quantity: '1 kg', price: 180, originalPrice: 210, image: 'images/products/india-gate-rice.svg' },
  { id: 14, name: 'Fortune Rice', category: 'Atta, Rice & Dal', section: 'Rice & Grains', quantity: '5 kg', price: 320, originalPrice: 380, image: 'images/products/fortune-rice.svg' },
  { id: 15, name: 'Sona Masoori Rice', category: 'Atta, Rice & Dal', section: 'Rice & Grains', quantity: '5 kg', price: 280, originalPrice: 330, image: 'images/products/sona-masoori-rice.svg' },

  // Haircare
  { id: 16, name: "L'Oréal Shampoo", category: 'Beauty & Personal Care', section: 'Haircare', quantity: '340 ml', price: 299, originalPrice: 350, image: 'images/products/loreal-shampoo.svg' },
  { id: 17, name: 'TRESemmé Shampoo', category: 'Beauty & Personal Care', section: 'Haircare', quantity: '580 ml', price: 399, originalPrice: 480, image: 'images/products/tresemme-shampoo.svg' },
  { id: 18, name: 'Parachute Oil', category: 'Beauty & Personal Care', section: 'Haircare', quantity: '200 ml', price: 95, originalPrice: 110, image: 'images/products/parachute-oil-hair.svg' },
  { id: 19, name: 'Indulekha Oil', category: 'Beauty & Personal Care', section: 'Haircare', quantity: '100 ml', price: 215, originalPrice: 250, image: 'images/products/indulekha-oil.svg' },

  // Dal & Pulses
  { id: 20, name: 'Chana Dal', category: 'Atta, Rice & Dal', section: 'Dal & Pulses', quantity: '1 kg', price: 110, originalPrice: 130, image: 'images/products/chana-dal.svg' },
  { id: 21, name: 'Rajma', category: 'Atta, Rice & Dal', section: 'Dal & Pulses', quantity: '500 g', price: 95, originalPrice: 110, image: 'images/products/rajma.svg' },
  { id: 22, name: 'Kabuli Chana', category: 'Atta, Rice & Dal', section: 'Dal & Pulses', quantity: '500 g', price: 75, originalPrice: 90, image: 'images/products/kabuli-chana.svg' },
  { id: 23, name: 'Green Gram', category: 'Atta, Rice & Dal', section: 'Dal & Pulses', quantity: '500 g', price: 65, originalPrice: 78, image: 'images/products/green-gram.svg' },

  // Oils & Ghee
  { id: 24, name: 'Gemini Oil', category: 'Oil & Ghee', section: 'Oils & Ghee', quantity: '1 L', price: 145, originalPrice: 165, image: 'images/products/gemini-oil.svg' },
  { id: 25, name: 'Gingelly Oil', category: 'Oil & Ghee', section: 'Oils & Ghee', quantity: '500 ml', price: 180, originalPrice: 210, image: 'images/products/gingelly-oil.svg' },
  { id: 26, name: 'Parachute Oil', category: 'Oil & Ghee', section: 'Oils & Ghee', quantity: '1 L', price: 155, originalPrice: 175, image: 'images/products/parachute-oil.svg' },
  { id: 27, name: 'Amul Ghee', category: 'Oil & Ghee', section: 'Oils & Ghee', quantity: '500 ml', price: 295, originalPrice: 330, image: 'images/products/amul-ghee.svg' },

  // Spices
  { id: 28, name: 'Aachi Garam Masala', category: 'Fresh', section: 'Spices', quantity: '100 g', price: 45, originalPrice: 55, image: 'images/products/aachi-garam-masala.svg' },
  { id: 29, name: 'Sakthi Sambar Powder', category: 'Fresh', section: 'Spices', quantity: '200 g', price: 55, originalPrice: 65, image: 'images/products/sakthi-sambar.svg' },
  { id: 30, name: 'Eastern Spices', category: 'Fresh', section: 'Spices', quantity: '100 g', price: 40, originalPrice: 50, image: 'images/products/eastern-spices.svg' },
  { id: 31, name: 'MTR Rasam Powder', category: 'Fresh', section: 'Spices', quantity: '200 g', price: 60, originalPrice: 72, image: 'images/products/mtr-rasam.svg' },

  // Chocolates
  { id: 32, name: 'Munch', category: 'Snacks & Biscuits', section: 'Chocolates', quantity: '10 pcs', price: 50, originalPrice: 60, image: 'images/products/munch.svg' },
  { id: 33, name: 'Snickers', category: 'Snacks & Biscuits', section: 'Chocolates', quantity: '45 g', price: 35, originalPrice: 40, image: 'images/products/snickers.svg' },
  { id: 34, name: 'Ferrero Rocher', category: 'Snacks & Biscuits', section: 'Chocolates', quantity: '16 pcs', price: 499, originalPrice: 550, image: 'images/products/ferrero-rocher.svg' },
  { id: 35, name: "Hershey's", category: 'Snacks & Biscuits', section: 'Chocolates', quantity: '100 g', price: 120, originalPrice: 140, image: 'images/products/hersheys.svg' },

  // Juices
  { id: 36, name: 'Minute Maid', category: 'Cold Drinks & Juices', section: 'Juices', quantity: '1 L', price: 90, originalPrice: 105, image: 'images/products/minute-maid.svg' },
  { id: 37, name: 'Frooti', category: 'Cold Drinks & Juices', section: 'Juices', quantity: '1.2 L', price: 55, originalPrice: 65, image: 'images/products/frooti.svg' },
  { id: 38, name: 'Maaza', category: 'Cold Drinks & Juices', section: 'Juices', quantity: '1.2 L', price: 60, originalPrice: 70, image: 'images/products/maaza.svg' },
  { id: 39, name: 'Appy Fizz', category: 'Cold Drinks & Juices', section: 'Juices', quantity: '600 ml', price: 35, originalPrice: 40, image: 'images/products/appy-fizz.svg' },

  // Salt & Sugar
  { id: 40, name: 'Madhur Sugar', category: 'Fresh', section: 'Salt & Sugar', quantity: '1 kg', price: 48, originalPrice: 55, image: 'images/products/madhur-sugar.svg' },
  { id: 41, name: 'Trust Sugar', category: 'Fresh', section: 'Salt & Sugar', quantity: '1 kg', price: 46, originalPrice: 52, image: 'images/products/trust-sugar.svg' },
  { id: 42, name: 'Brown Sugar', category: 'Fresh', section: 'Salt & Sugar', quantity: '500 g', price: 65, originalPrice: 75, image: 'images/products/brown-sugar.svg' },
  { id: 43, name: 'Organic Jaggery', category: 'Fresh', section: 'Salt & Sugar', quantity: '500 g', price: 55, originalPrice: 65, image: 'images/products/organic-jaggery.svg' }
];

// --- State ---
let cart = loadCart();
let activeCategory = 'all';
let searchQuery = '';

// --- DOM Elements ---
const elements = {
  categoryScroll: document.getElementById('categoryScroll'),
  productSections: document.getElementById('productSections'),
  searchInput: document.getElementById('searchInput'),
  searchClear: document.getElementById('searchClear'),
  searchResultsSection: document.getElementById('searchResultsSection'),
  searchResultsGrid: document.getElementById('searchResultsGrid'),
  searchResultsTitle: document.getElementById('searchResultsTitle'),
  noProductsMsg: document.getElementById('noProductsMsg'),
  cartCount: document.getElementById('cartCount'),
  cartBtn: document.getElementById('cartBtn'),
  cartSidebar: document.getElementById('cartSidebar'),
  cartOverlay: document.getElementById('cartOverlay'),
  cartClose: document.getElementById('cartClose'),
  cartBody: document.getElementById('cartBody'),
  cartItems: document.getElementById('cartItems'),
  cartEmpty: document.getElementById('cartEmpty'),
  cartFooter: document.getElementById('cartFooter'),
  cartSubtotal: document.getElementById('cartSubtotal'),
  cartDelivery: document.getElementById('cartDelivery'),
  cartTotal: document.getElementById('cartTotal'),
  checkoutBtn: document.getElementById('checkoutBtn'),
  loginBtn: document.getElementById('loginBtn'),
  loginModal: document.getElementById('loginModal'),
  loginOverlay: document.getElementById('loginOverlay'),
  loginClose: document.getElementById('loginClose'),
  loginForm: document.getElementById('loginForm'),
  mobileInput: document.getElementById('mobileInput'),
  loginError: document.getElementById('loginError'),
  shopNowBtn: document.getElementById('shopNowBtn'),
  hero: document.getElementById('hero'),
  offers: document.getElementById('offers')
};

// --- Utility Functions ---

/** Calculate discount percentage */
function getDiscountPercent(price, originalPrice) {
  if (originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/** Format price in Indian Rupees */
function formatPrice(amount) {
  return `₹${amount}`;
}

/** Get product by ID */
function getProductById(id) {
  return products.find(p => p.id === id);
}

/** Get quantity of a product in cart */
function getCartQuantity(productId) {
  const item = cart.find(c => c.id === productId);
  return item ? item.quantity : 0;
}

/** Show toast notification */
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// --- Cart Functions (localStorage) ---

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  saveCart();
  updateCartUI();
  renderProducts();
  const product = getProductById(productId);
  if (product) showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  saveCart();
  updateCartUI();
  renderProducts();
}

function updateQuantity(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartUI();
    renderProducts();
  }
}

function getCartSubtotal() {
  return cart.reduce((total, item) => {
    const product = getProductById(item.id);
    return product ? total + product.price * item.quantity : total;
  }, 0);
}

function getDeliveryFee(subtotal) {
  return subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FEE;
}

function getCartTotalItems() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// --- Rendering Functions ---

/** Render category navigation */
function renderCategories() {
  elements.categoryScroll.innerHTML = categories.map(cat => `
    <button
      class="category-item ${activeCategory === cat.id ? 'active' : ''}"
      data-category="${cat.id}"
      type="button"
      aria-pressed="${activeCategory === cat.id}"
    >
      <img src="${cat.icon}" alt="${cat.name} category icon">
      <span>${cat.name}</span>
    </button>
  `).join('');

  elements.categoryScroll.querySelectorAll('.category-item').forEach(btn => {
    btn.addEventListener('click', () => selectCategory(btn.dataset.category));
  });
}

/** Create HTML for a single product card */
function createProductCard(product) {
  const qty = getCartQuantity(product.id);
  const discount = getDiscountPercent(product.price, product.originalPrice);

  const actionHtml = qty > 0
    ? `<div class="qty-controls" data-product-id="${product.id}">
        <button class="qty-btn qty-minus" type="button" aria-label="Decrease quantity">−</button>
        <span class="qty-value">${qty}</span>
        <button class="qty-btn qty-plus" type="button" aria-label="Increase quantity">+</button>
       </div>`
    : `<button class="btn-add" data-product-id="${product.id}" type="button">ADD</button>`;

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image-wrap">
        ${discount > 0 ? `<span class="discount-badge">${discount}% OFF</span>` : ''}
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-qty">${product.quantity}</p>
        <div class="product-prices">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${product.originalPrice > product.price
            ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>`
            : ''}
        </div>
        <div class="product-actions">${actionHtml}</div>
      </div>
    </article>
  `;
}

/** Attach event listeners to product action buttons */
function attachProductListeners(container) {
  container.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => addToCart(Number(btn.dataset.productId)));
  });

  container.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.closest('.qty-controls').dataset.productId);
      updateQuantity(id, -1);
    });
  });

  container.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.closest('.qty-controls').dataset.productId);
      updateQuantity(id, 1);
    });
  });
}

/** Filter products by category and search */
function getFilteredProducts() {
  let filtered = [...products];

  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  if (searchQuery.trim()) {
    const query = searchQuery.trim().toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.section.toLowerCase().includes(query)
    );
  }

  return filtered;
}

/** Group products by section */
function groupBySection(productList) {
  const groups = {};
  productList.forEach(product => {
    if (!groups[product.section]) {
      groups[product.section] = [];
    }
    groups[product.section].push(product);
  });
  return groups;
}

/** Render all product sections */
function renderProducts() {
  const filtered = getFilteredProducts();
  const isSearching = searchQuery.trim().length > 0;

  // Toggle visibility of hero/offers during search
  elements.hero.classList.toggle('hidden', isSearching);
  elements.offers.classList.toggle('hidden', isSearching);

  if (isSearching) {
    elements.searchResultsSection.classList.remove('hidden');
    elements.productSections.innerHTML = '';
    elements.searchResultsTitle.textContent = `Search Results for "${searchQuery}"`;

    if (filtered.length === 0) {
      elements.searchResultsGrid.innerHTML = '';
      elements.noProductsMsg.classList.remove('hidden');
    } else {
      elements.noProductsMsg.classList.add('hidden');
      elements.searchResultsGrid.innerHTML = filtered.map(createProductCard).join('');
      attachProductListeners(elements.searchResultsGrid);
    }
    return;
  }

  elements.searchResultsSection.classList.add('hidden');
  elements.noProductsMsg.classList.add('hidden');

  if (filtered.length === 0) {
    elements.productSections.innerHTML = `
      <section class="product-section container">
        <p class="no-products">No products found in this category.</p>
      </section>`;
    return;
  }

  const groups = groupBySection(filtered);
  elements.productSections.innerHTML = Object.entries(groups).map(([section, items]) => `
    <section class="product-section" id="section-${section.replace(/\s+/g, '-').toLowerCase()}">
      <div class="container">
        <h2 class="section-title">${section}</h2>
        <div class="products-grid">
          ${items.map(createProductCard).join('')}
        </div>
      </div>
    </section>
  `).join('');

  elements.productSections.querySelectorAll('.products-grid').forEach(grid => {
    attachProductListeners(grid);
  });
}

/** Update cart sidebar and count badge */
function updateCartUI() {
  const totalItems = getCartTotalItems();
  const subtotal = getCartSubtotal();
  const delivery = getDeliveryFee(subtotal);
  const total = subtotal + delivery;

  elements.cartCount.textContent = totalItems;
  elements.cartSubtotal.textContent = formatPrice(subtotal);
  elements.cartDelivery.textContent = delivery === 0 ? 'FREE' : formatPrice(delivery);
  elements.cartTotal.textContent = formatPrice(total);

  const isEmpty = cart.length === 0;
  elements.cartEmpty.classList.toggle('hidden', !isEmpty);
  elements.cartItems.classList.toggle('hidden', isEmpty);
  elements.checkoutBtn.disabled = isEmpty;

  if (isEmpty) {
    elements.cartItems.innerHTML = '';
    return;
  }

  elements.cartItems.innerHTML = cart.map(item => {
    const product = getProductById(item.id);
    if (!product) return '';

    return `
      <li class="cart-item" data-id="${product.id}">
        <img class="cart-item-image" src="${product.image}" alt="${product.name}">
        <div class="cart-item-details">
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-price">${formatPrice(product.price * item.quantity)}</p>
          <div class="cart-item-controls">
            <div class="qty-controls" data-cart-id="${product.id}">
              <button class="qty-btn cart-minus" type="button" aria-label="Decrease">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn cart-plus" type="button" aria-label="Increase">+</button>
            </div>
            <button class="btn-remove" data-remove-id="${product.id}" type="button">Remove</button>
          </div>
        </div>
      </li>
    `;
  }).join('');

  // Cart sidebar quantity controls
  elements.cartItems.querySelectorAll('.cart-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      updateQuantity(Number(btn.closest('.qty-controls').dataset.cartId), -1);
    });
  });

  elements.cartItems.querySelectorAll('.cart-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      updateQuantity(Number(btn.closest('.qty-controls').dataset.cartId), 1);
    });
  });

  elements.cartItems.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(Number(btn.dataset.removeId));
      showToast('Item removed from cart');
    });
  });
}

// --- Category Selection ---

function selectCategory(categoryId) {
  activeCategory = categoryId;
  searchQuery = '';
  elements.searchInput.value = '';
  elements.searchClear.classList.add('hidden');
  renderCategories();
  renderProducts();

  // Scroll to products
  const firstSection = document.querySelector('.product-section');
  if (firstSection) {
    firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// --- Search ---

function handleSearch(value) {
  searchQuery = value;
  elements.searchClear.classList.toggle('hidden', !value.trim());
  renderProducts();
}

// --- Cart Sidebar ---

function openCart() {
  elements.cartSidebar.classList.add('open');
  elements.cartOverlay.classList.remove('hidden');
  requestAnimationFrame(() => elements.cartOverlay.classList.add('visible'));
  elements.cartSidebar.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  elements.cartSidebar.classList.remove('open');
  elements.cartOverlay.classList.remove('visible');
  elements.cartSidebar.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => elements.cartOverlay.classList.add('hidden'), 300);
}

// --- Login Modal ---

function openLogin() {
  elements.loginModal.classList.add('open');
  elements.loginOverlay.classList.remove('hidden');
  requestAnimationFrame(() => elements.loginOverlay.classList.add('visible'));
  elements.mobileInput.focus();
}

function closeLogin() {
  elements.loginModal.classList.remove('open');
  elements.loginOverlay.classList.remove('visible');
  elements.loginError.classList.add('hidden');
  elements.loginForm.reset();
  setTimeout(() => elements.loginOverlay.classList.add('hidden'), 300);
}

function validateMobile(number) {
  return /^[6-9]\d{9}$/.test(number);
}

// --- Event Listeners ---

function initEventListeners() {
  // Search
  elements.searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  elements.searchClear.addEventListener('click', () => {
    elements.searchInput.value = '';
    handleSearch('');
    elements.searchInput.focus();
  });

  // Cart
  elements.cartBtn.addEventListener('click', openCart);
  elements.cartClose.addEventListener('click', closeCart);
  elements.cartOverlay.addEventListener('click', closeCart);

  elements.checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    showToast('Checkout is a demo — no payment required!');
    closeCart();
  });

  // Login
  elements.loginBtn.addEventListener('click', openLogin);
  elements.loginClose.addEventListener('click', closeLogin);
  elements.loginOverlay.addEventListener('click', closeLogin);

  elements.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mobile = elements.mobileInput.value.trim();

    if (!validateMobile(mobile)) {
      elements.loginError.classList.remove('hidden');
      return;
    }

    elements.loginError.classList.add('hidden');
    closeLogin();
    showToast(`Welcome! OTP sent to +91 ${mobile}`);
  });

  // Shop Now — scroll to products
  elements.shopNowBtn.addEventListener('click', () => {
    const firstSection = document.querySelector('.product-section');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeLogin();
    }
  });

  // Adjust sticky header height on resize
  window.addEventListener('resize', updateHeaderHeight);
}

/** Dynamically set header height CSS variable for sticky category nav */
function updateHeaderHeight() {
  const header = document.getElementById('header');
  if (header) {
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
  }
}

// --- Initialize App ---

function init() {
  renderCategories();
  renderProducts();
  updateCartUI();
  initEventListeners();
  updateHeaderHeight();
}

document.addEventListener('DOMContentLoaded', init);
