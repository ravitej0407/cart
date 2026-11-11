/* ========================================
   QuickMart - Main JavaScript
   ======================================== */

// --- Configuration ---
const DELIVERY_FEE = 20;
const FREE_DELIVERY_THRESHOLD = 299;
const CART_STORAGE_KEY = 'quickmart_cart';
const THEME_STORAGE_KEY = 'quickmart_theme';
const USER_STORAGE_KEY = 'quickmart_user';
const LOCATIONS_STORAGE_KEY = 'quickmart_locations';
const ACTIVE_LOCATION_ID_KEY = 'quickmart_active_location_id';

// Default delivery locations
const DEFAULT_LOCATIONS = [
  {
    id: 'loc-1',
    tag: 'Home',
    house: 'Flat 402, Sunshine Heights',
    area: 'Bandra West',
    city: 'Mumbai',
    pincode: '400050'
  },
  {
    id: 'loc-2',
    tag: 'Work',
    house: 'Tech Park, Tower B',
    area: 'Andheri East',
    city: 'Mumbai',
    pincode: '400069'
  }
];

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

// --- Product Data (43 products with online image links and local SVG fallbacks) ---
const products = [
  // Fresh Fruits
  { id: 1, name: 'Apple', category: 'Fruits', section: 'Fresh Fruits', quantity: '1 kg', price: 120, originalPrice: 150, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80', fallback: 'apple.svg' },
  { id: 2, name: 'Banana', category: 'Fruits', section: 'Fresh Fruits', quantity: '1 dozen', price: 45, originalPrice: 55, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80', fallback: 'banana.svg' },
  { id: 3, name: 'Orange', category: 'Fruits', section: 'Fresh Fruits', quantity: '1 kg', price: 80, originalPrice: 100, image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80', fallback: 'orange.svg' },
  { id: 4, name: 'Mango', category: 'Fruits', section: 'Fresh Fruits', quantity: '1 kg', price: 150, originalPrice: 180, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80', fallback: 'mango.svg' },

  // Vegetables
  { id: 5, name: 'Tomato', category: 'Vegetables', section: 'Vegetables', quantity: '1 kg', price: 35, originalPrice: 45, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80', fallback: 'tomato.svg' },
  { id: 6, name: 'Potato', category: 'Vegetables', section: 'Vegetables', quantity: '1 kg', price: 30, originalPrice: 38, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80', fallback: 'potato.svg' },
  { id: 7, name: 'Onion', category: 'Vegetables', section: 'Vegetables', quantity: '1 kg', price: 28, originalPrice: 35, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80', fallback: 'onion.svg' },
  { id: 8, name: 'Carrot', category: 'Vegetables', section: 'Vegetables', quantity: '500 g', price: 40, originalPrice: 50, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80', fallback: 'carrot.svg' },

  // Dairy
  { id: 9, name: 'Amul Milk', category: 'Dairy', section: 'Dairy', quantity: '1 L', price: 56, originalPrice: 60, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80', fallback: 'amul-milk.svg' },
  { id: 10, name: 'Curd', category: 'Dairy', section: 'Dairy', quantity: '400 g', price: 35, originalPrice: 40, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80', fallback: 'curd.svg' },
  { id: 11, name: 'Paneer', category: 'Dairy', section: 'Dairy', quantity: '200 g', price: 85, originalPrice: 95, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80', fallback: 'paneer.svg' },
  { id: 12, name: 'Amul Butter', category: 'Dairy', section: 'Dairy', quantity: '100 g', price: 55, originalPrice: 60, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80', fallback: 'amul-butter.svg' },

  // Rice & Grains
  { id: 13, name: 'India Gate Basmati Rice', category: 'Atta, Rice & Dal', section: 'Rice & Grains', quantity: '1 kg', price: 180, originalPrice: 210, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80', fallback: 'india-gate-rice.svg' },
  { id: 14, name: 'Fortune Rice', category: 'Atta, Rice & Dal', section: 'Rice & Grains', quantity: '5 kg', price: 320, originalPrice: 380, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=400&q=80', fallback: 'fortune-rice.svg' },
  { id: 15, name: 'Sona Masoori Rice', category: 'Atta, Rice & Dal', section: 'Rice & Grains', quantity: '5 kg', price: 280, originalPrice: 330, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80', fallback: 'sona-masoori-rice.svg' },

  // Haircare
  { id: 16, name: "L'Oréal Shampoo", category: 'Beauty & Personal Care', section: 'Haircare', quantity: '340 ml', price: 299, originalPrice: 350, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80', fallback: 'loreal-shampoo.svg' },
  { id: 17, name: 'TRESemmé Shampoo', category: 'Beauty & Personal Care', section: 'Haircare', quantity: '580 ml', price: 399, originalPrice: 480, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80', fallback: 'tresemme-shampoo.svg' },
  { id: 18, name: 'Parachute Oil', category: 'Beauty & Personal Care', section: 'Haircare', quantity: '200 ml', price: 95, originalPrice: 110, image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Parachute_coconut_oil_25ml.jpg', fallback: 'parachute-oil-hair.jpg' },
  { id: 19, name: 'Indulekha Oil', category: 'Beauty & Personal Care', section: 'Haircare', quantity: '100 ml', price: 215, originalPrice: 250, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80', fallback: 'indulekha-oil.jpg' },

  // Dal & Pulses
  { id: 20, name: 'Chana Dal', category: 'Atta, Rice & Dal', section: 'Dal & Pulses', quantity: '1 kg', price: 110, originalPrice: 130, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400&q=80', fallback: 'chana-dal.svg' },
  { id: 21, name: 'Rajma', category: 'Atta, Rice & Dal', section: 'Dal & Pulses', quantity: '500 g', price: 95, originalPrice: 110, image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&w=400&q=80', fallback: 'rajma.svg' },
  { id: 22, name: 'Kabuli Chana', category: 'Atta, Rice & Dal', section: 'Dal & Pulses', quantity: '500 g', price: 75, originalPrice: 90, image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=400&q=80', fallback: 'kabuli-chana.svg' },
  { id: 23, name: 'Green Gram', category: 'Atta, Rice & Dal', section: 'Dal & Pulses', quantity: '500 g', price: 65, originalPrice: 78, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80', fallback: 'green-gram.svg' },

  // Oils & Ghee
  { id: 24, name: 'Gemini Oil', category: 'Oil & Ghee', section: 'Oils & Ghee', quantity: '1 L', price: 145, originalPrice: 165, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80', fallback: 'gemini-oil.svg' },
  { id: 25, name: 'Gingelly Oil', category: 'Oil & Ghee', section: 'Oils & Ghee', quantity: '500 ml', price: 180, originalPrice: 210, image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Sesame_oil.jpg', fallback: 'gingelly-oil.jpg' },
  { id: 26, name: 'Parachute Oil', category: 'Oil & Ghee', section: 'Oils & Ghee', quantity: '1 L', price: 155, originalPrice: 175, image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Parachute_coconut_oil_25ml.jpg', fallback: 'parachute-oil.jpg' },
  { id: 27, name: 'Amul Ghee', category: 'Oil & Ghee', section: 'Oils & Ghee', quantity: '500 ml', price: 295, originalPrice: 330, image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=400&q=80', fallback: 'amul-ghee.svg' },

  // Spices
  { id: 28, name: 'Aachi Garam Masala', category: 'Fresh', section: 'Spices', quantity: '100 g', price: 45, originalPrice: 55, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80', fallback: 'aachi-garam-masala.svg' },
  { id: 29, name: 'Sakthi Sambar Powder', category: 'Fresh', section: 'Spices', quantity: '200 g', price: 55, originalPrice: 65, image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=400&q=80', fallback: 'sakthi-sambar.svg' },
  { id: 30, name: 'Eastern Spices', category: 'Fresh', section: 'Spices', quantity: '100 g', price: 40, originalPrice: 50, image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=400&q=80', fallback: 'eastern-spices.svg' },
  { id: 31, name: 'MTR Rasam Powder', category: 'Fresh', section: 'Spices', quantity: '200 g', price: 60, originalPrice: 72, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80', fallback: 'mtr-rasam.svg' },

  // Chocolates
  { id: 32, name: 'Munch', category: 'Snacks & Biscuits', section: 'Chocolates', quantity: '10 pcs', price: 50, originalPrice: 60, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80', fallback: 'munch.svg' },
  { id: 33, name: 'Snickers', category: 'Snacks & Biscuits', section: 'Chocolates', quantity: '45 g', price: 35, originalPrice: 40, image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=400&q=80', fallback: 'snickers.svg' },
  { id: 34, name: 'Ferrero Rocher', category: 'Snacks & Biscuits', section: 'Chocolates', quantity: '16 pcs', price: 499, originalPrice: 550, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=400&q=80', fallback: 'ferrero-rocher.svg' },
  { id: 35, name: "Hershey's", category: 'Snacks & Biscuits', section: 'Chocolates', quantity: '100 g', price: 120, originalPrice: 140, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=400&q=80', fallback: 'hersheys.svg' },

  // Juices
  { id: 36, name: 'Minute Maid', category: 'Cold Drinks & Juices', section: 'Juices', quantity: '1 L', price: 90, originalPrice: 105, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80', fallback: 'minute-maid.svg' },
  { id: 37, name: 'Frooti', category: 'Cold Drinks & Juices', section: 'Juices', quantity: '1.2 L', price: 55, originalPrice: 65, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=400&q=80', fallback: 'frooti.svg' },
  { id: 38, name: 'Maaza', category: 'Cold Drinks & Juices', section: 'Juices', quantity: '1.2 L', price: 60, originalPrice: 70, image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Maaza_bottles.jpg', fallback: 'maaza.jpg' },
  { id: 39, name: 'Appy Fizz', category: 'Cold Drinks & Juices', section: 'Juices', quantity: '600 ml', price: 35, originalPrice: 40, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80', fallback: 'appy-fizz.svg' },

  // Salt & Sugar
  { id: 40, name: 'Madhur Sugar', category: 'Fresh', section: 'Salt & Sugar', quantity: '1 kg', price: 48, originalPrice: 55, image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=400&q=80', fallback: 'madhur-sugar.svg' },
  { id: 41, name: 'Trust Sugar', category: 'Fresh', section: 'Salt & Sugar', quantity: '1 kg', price: 46, originalPrice: 52, image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Bowl_of_white_sugar.jpg', fallback: 'trust-sugar.jpg' },
  { id: 42, name: 'Brown Sugar', category: 'Fresh', section: 'Salt & Sugar', quantity: '500 g', price: 65, originalPrice: 75, image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=400&q=80', fallback: 'brown-sugar.svg' },
  { id: 43, name: 'Organic Jaggery', category: 'Fresh', section: 'Salt & Sugar', quantity: '500 g', price: 55, originalPrice: 65, image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=400&q=80', fallback: 'organic-jaggery.svg' }
];

// --- State ---
let cart = loadCart();
let currentUser = loadUser();
let locations = loadLocations();
let activeLocationId = loadActiveLocationId();
let activeCategory = 'all';
let searchQuery = '';

// --- DOM Elements ---
const elements = {
  // Location
  locationBtn: document.getElementById('locationBtn'),
  headerLocationText: document.getElementById('headerLocationText'),
  locationModal: document.getElementById('locationModal'),
  locationOverlay: document.getElementById('locationOverlay'),
  locationClose: document.getElementById('locationClose'),
  detectLocationBtn: document.getElementById('detectLocationBtn'),
  detectTitle: document.getElementById('detectTitle'),
  detectStatus: document.getElementById('detectStatus'),
  savedLocationsList: document.getElementById('savedLocationsList'),
  toggleAddLocationBtn: document.getElementById('toggleAddLocationBtn'),
  addLocationForm: document.getElementById('addLocationForm'),
  closeAddLocationForm: document.getElementById('closeAddLocationForm'),
  cancelAddLocationBtn: document.getElementById('cancelAddLocationBtn'),
  addressHouse: document.getElementById('addressHouse'),
  addressArea: document.getElementById('addressArea'),
  addressCity: document.getElementById('addressCity'),
  addressPincode: document.getElementById('addressPincode'),
  addressError: document.getElementById('addressError'),

  // Store & Nav
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
  themeToggle: document.getElementById('themeToggle'),
  loginBtn: document.getElementById('loginBtn'),
  userProfileMenu: document.getElementById('userProfileMenu'),
  userProfileBtn: document.getElementById('userProfileBtn'),
  userAvatar: document.getElementById('userAvatar'),
  userName: document.getElementById('userName'),
  userDropdown: document.getElementById('userDropdown'),
  dropdownUserName: document.getElementById('dropdownUserName'),
  dropdownUserPhone: document.getElementById('dropdownUserPhone'),
  logoutBtn: document.getElementById('logoutBtn'),
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
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// --- Delivery Location Management ---

function loadLocations() {
  try {
    const saved = localStorage.getItem(LOCATIONS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_LOCATIONS;
  } catch {
    return DEFAULT_LOCATIONS;
  }
}

function saveLocations() {
  localStorage.setItem(LOCATIONS_STORAGE_KEY, JSON.stringify(locations));
}

function loadActiveLocationId() {
  const savedId = localStorage.getItem(ACTIVE_LOCATION_ID_KEY);
  if (savedId && locations.some(l => l.id === savedId)) {
    return savedId;
  }
  return locations[0] ? locations[0].id : 'loc-1';
}

function getActiveLocation() {
  return locations.find(l => l.id === activeLocationId) || locations[0] || DEFAULT_LOCATIONS[0];
}

function updateHeaderLocationUI() {
  const activeLoc = getActiveLocation();
  if (elements.headerLocationText && activeLoc) {
    elements.headerLocationText.textContent = `${activeLoc.tag} - ${activeLoc.area || activeLoc.city}`;
  }
}

function renderSavedLocations() {
  if (!elements.savedLocationsList) return;

  elements.savedLocationsList.innerHTML = locations.map(loc => {
    const isActive = loc.id === activeLocationId;
    const tagIcon = loc.tag === 'Home' ? '🏠' : (loc.tag === 'Work' ? '🏢' : '📍');

    return `
      <div class="location-card ${isActive ? 'active' : ''}" data-id="${loc.id}">
        <div class="location-card-left">
          <span class="loc-tag-icon">${tagIcon}</span>
          <div class="loc-details">
            <div class="loc-tag-title">
              <span>${loc.tag}</span>
              ${isActive ? '<span class="loc-active-badge">DELIVERING HERE</span>' : ''}
            </div>
            <p class="loc-address-text">${loc.house ? loc.house + ', ' : ''}${loc.area}, ${loc.city} - ${loc.pincode}</p>
          </div>
        </div>
        <div class="location-card-right">
          ${!isActive ? `<button class="btn-select-loc" type="button" data-select-id="${loc.id}">Deliver Here</button>` : ''}
          ${locations.length > 1 ? `
            <button class="btn-delete-loc" type="button" data-delete-id="${loc.id}" title="Delete address" aria-label="Delete address">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  // Attach card click handlers
  elements.savedLocationsList.querySelectorAll('.location-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-delete-loc')) return;
      selectLocation(card.dataset.id);
    });
  });

  // Attach delete buttons handlers
  elements.savedLocationsList.querySelectorAll('.btn-delete-loc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteLocation(btn.dataset.deleteId);
    });
  });
}

function selectLocation(id) {
  activeLocationId = id;
  localStorage.setItem(ACTIVE_LOCATION_ID_KEY, id);
  updateHeaderLocationUI();
  renderSavedLocations();
  const loc = getActiveLocation();
  closeLocationModal();
  showToast(`Delivering to ${loc.tag} (${loc.area || loc.city})`);
}

function addNewLocation(newLocation) {
  locations.unshift(newLocation);
  saveLocations();
  activeLocationId = newLocation.id;
  localStorage.setItem(ACTIVE_LOCATION_ID_KEY, activeLocationId);
  updateHeaderLocationUI();
  closeLocationModal();
  showToast(`Added and delivering to ${newLocation.tag} (${newLocation.area})`);
}

function deleteLocation(id) {
  if (locations.length <= 1) {
    showToast('You must keep at least one delivery address');
    return;
  }

  const deletedLoc = locations.find(l => l.id === id);
  locations = locations.filter(l => l.id !== id);
  saveLocations();

  if (activeLocationId === id) {
    activeLocationId = locations[0].id;
    localStorage.setItem(ACTIVE_LOCATION_ID_KEY, activeLocationId);
    updateHeaderLocationUI();
  }

  renderSavedLocations();
  showToast(`Removed address ${deletedLoc ? deletedLoc.tag : ''}`);
}

function detectCurrentLocation() {
  if (elements.detectStatus) elements.detectStatus.textContent = 'Detecting current GPS coordinates...';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(2);
        const lon = pos.coords.longitude.toFixed(2);
        const currentLoc = {
          id: 'loc-' + Date.now(),
          tag: 'Current Location',
          house: `GPS Location (${lat}, ${lon})`,
          area: 'Detected Landmark',
          city: 'Mumbai',
          pincode: '400001'
        };
        addNewLocation(currentLoc);
        if (elements.detectStatus) elements.detectStatus.textContent = 'Using GPS & browser location';
      },
      () => {
        const currentLoc = {
          id: 'loc-' + Date.now(),
          tag: 'Current Area',
          house: 'Nearby Residence',
          area: 'Santacruz West',
          city: 'Mumbai',
          pincode: '400054'
        };
        addNewLocation(currentLoc);
        if (elements.detectStatus) elements.detectStatus.textContent = 'Using GPS & browser location';
      },
      { timeout: 5000 }
    );
  } else {
    showToast('Geolocation is not supported by your browser');
  }
}

function openLocationModal() {
  renderSavedLocations();
  if (elements.addLocationForm) elements.addLocationForm.classList.add('hidden');
  if (elements.locationModal) elements.locationModal.classList.add('open');
  if (elements.locationOverlay) {
    elements.locationOverlay.classList.remove('hidden');
    requestAnimationFrame(() => elements.locationOverlay.classList.add('visible'));
  }
}

function closeLocationModal() {
  if (elements.locationModal) elements.locationModal.classList.remove('open');
  if (elements.locationOverlay) {
    elements.locationOverlay.classList.remove('visible');
    setTimeout(() => elements.locationOverlay.classList.add('hidden'), 300);
  }
  if (elements.addLocationForm) elements.addLocationForm.reset();
  if (elements.addressError) elements.addressError.classList.add('hidden');
}

// --- Theme Management (Dark Mode) ---

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  applyTheme(isDark ? 'dark' : 'light');

  // Listen to OS theme changes if user hasn't explicitly set a preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  updateThemeToggleUI(isDark);
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  applyTheme(newTheme);
  showToast(`Switched to ${newTheme} mode`);
}

function updateThemeToggleUI(isDark) {
  if (!elements.themeToggle) return;
  const moonIcon = elements.themeToggle.querySelector('.icon-moon');
  const sunIcon = elements.themeToggle.querySelector('.icon-sun');

  if (moonIcon && sunIcon) {
    if (isDark) {
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
      elements.themeToggle.setAttribute('aria-label', 'Switch to light mode');
      elements.themeToggle.title = 'Switch to light mode';
    } else {
      moonIcon.classList.remove('hidden');
      sunIcon.classList.add('hidden');
      elements.themeToggle.setAttribute('aria-label', 'Switch to dark mode');
      elements.themeToggle.title = 'Switch to dark mode';
    }
  }
}

// --- User Authentication State ---

function loadUser() {
  try {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveUser(user) {
  currentUser = user;
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
  updateAuthUI();
}

function logoutUser() {
  saveUser(null);
  if (elements.userDropdown) {
    elements.userDropdown.classList.add('hidden');
  }
  showToast('You have been logged out');
}

function updateAuthUI() {
  if (!elements.loginBtn || !elements.userProfileMenu) return;

  if (currentUser) {
    elements.loginBtn.classList.add('hidden');
    elements.userProfileMenu.classList.remove('hidden');

    const displayName = currentUser.name || 'User';
    const initial = displayName.charAt(0).toUpperCase();

    if (elements.userName) elements.userName.textContent = displayName.split(' ')[0];
    if (elements.userAvatar) elements.userAvatar.textContent = initial;
    if (elements.dropdownUserName) elements.dropdownUserName.textContent = displayName;
    if (elements.dropdownUserPhone) {
      elements.dropdownUserPhone.textContent = currentUser.phone || currentUser.email || 'QuickMart Member';
    }
  } else {
    elements.loginBtn.classList.remove('hidden');
    elements.userProfileMenu.classList.add('hidden');
    if (elements.userDropdown) {
      elements.userDropdown.classList.add('hidden');
    }
  }
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
  if (!elements.categoryScroll) return;

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
  const fallbackSrc = `images/products/${product.fallback || 'apple.svg'}`;

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
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          loading="lazy"
          onerror="if (!this.dataset.fallback) { this.dataset.fallback = '1'; this.src='${fallbackSrc}'; } else { this.onerror=null; this.src='${fallbackSrc.replace(/\.(jpg|jpeg|png)$/i, '.svg')}'; }"
        >
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
  if (elements.hero) elements.hero.classList.toggle('hidden', isSearching);
  if (elements.offers) elements.offers.classList.toggle('hidden', isSearching);

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
  if (!elements.cartCount) return;

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
    const fallbackSrc = `images/products/${product.fallback || 'apple.svg'}`;

    return `
      <li class="cart-item" data-id="${product.id}">
        <img 
          class="cart-item-image" 
          src="${product.image}" 
          alt="${product.name}"
          onerror="if (!this.dataset.fallback) { this.dataset.fallback = '1'; this.src='${fallbackSrc}'; } else { this.onerror=null; this.src='${fallbackSrc.replace(/\.(jpg|jpeg|png)$/i, '.svg')}'; }"
        >
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
  if (elements.searchInput) elements.searchInput.value = '';
  if (elements.searchClear) elements.searchClear.classList.add('hidden');
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
  if (elements.searchClear) {
    elements.searchClear.classList.toggle('hidden', !value.trim());
  }
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
  // Location Modal
  if (elements.locationBtn) elements.locationBtn.addEventListener('click', openLocationModal);
  if (elements.locationClose) elements.locationClose.addEventListener('click', closeLocationModal);
  if (elements.locationOverlay) elements.locationOverlay.addEventListener('click', closeLocationModal);
  if (elements.detectLocationBtn) elements.detectLocationBtn.addEventListener('click', detectCurrentLocation);

  if (elements.toggleAddLocationBtn) {
    elements.toggleAddLocationBtn.addEventListener('click', () => {
      elements.addLocationForm.classList.toggle('hidden');
      if (!elements.addLocationForm.classList.contains('hidden')) {
        elements.addressHouse.focus();
      }
    });
  }

  if (elements.closeAddLocationForm) {
    elements.closeAddLocationForm.addEventListener('click', () => {
      elements.addLocationForm.classList.add('hidden');
      elements.addLocationForm.reset();
      elements.addressError.classList.add('hidden');
    });
  }

  if (elements.cancelAddLocationBtn) {
    elements.cancelAddLocationBtn.addEventListener('click', () => {
      elements.addLocationForm.classList.add('hidden');
      elements.addLocationForm.reset();
      elements.addressError.classList.add('hidden');
    });
  }

  // Add Location Form Submission
  if (elements.addLocationForm) {
    elements.addLocationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const house = elements.addressHouse.value.trim();
      const area = elements.addressArea.value.trim();
      const city = elements.addressCity.value.trim();
      const pincode = elements.addressPincode.value.trim();
      const selectedTagEl = elements.addLocationForm.querySelector('input[name="addressTag"]:checked');
      const tag = selectedTagEl ? selectedTagEl.value : 'Home';

      if (!house || !area || !city || !/^\d{6}$/.test(pincode)) {
        elements.addressError.classList.remove('hidden');
        return;
      }

      elements.addressError.classList.add('hidden');
      const newLoc = {
        id: 'loc-' + Date.now(),
        tag: tag,
        house: house,
        area: area,
        city: city,
        pincode: pincode
      };

      addNewLocation(newLoc);
    });
  }

  // Theme Toggle
  if (elements.themeToggle) {
    elements.themeToggle.addEventListener('click', toggleTheme);
  }

  // User Profile Dropdown
  if (elements.userProfileBtn) {
    elements.userProfileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      elements.userDropdown.classList.toggle('hidden');
    });
  }

  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener('click', () => {
      logoutUser();
    });
  }

  // Close user dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (elements.userDropdown && !elements.userDropdown.classList.contains('hidden')) {
      if (!elements.userProfileMenu.contains(e.target)) {
        elements.userDropdown.classList.add('hidden');
      }
    }
  });

  // Search
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  }
  if (elements.searchClear) {
    elements.searchClear.addEventListener('click', () => {
      elements.searchInput.value = '';
      handleSearch('');
      elements.searchInput.focus();
    });
  }

  // Cart
  if (elements.cartBtn) elements.cartBtn.addEventListener('click', openCart);
  if (elements.cartClose) elements.cartClose.addEventListener('click', closeCart);
  if (elements.cartOverlay) elements.cartOverlay.addEventListener('click', closeCart);

  if (elements.checkoutBtn) {
    elements.checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      showToast('Order placed successfully! Delivery arriving in 10 minutes.');
      cart = [];
      saveCart();
      updateCartUI();
      renderProducts();
      closeCart();
    });
  }

  // Login Modal Form
  if (elements.loginForm) {
    elements.loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const mobile = elements.mobileInput.value.trim();

      if (!validateMobile(mobile)) {
        elements.loginError.classList.remove('hidden');
        return;
      }

      elements.loginError.classList.add('hidden');
      saveUser({
        name: `User ${mobile.slice(-4)}`,
        phone: `+91 ${mobile}`,
        email: `user${mobile.slice(-4)}@example.com`
      });
      closeLogin();
      showToast(`Welcome! Signed in with +91 ${mobile}`);
    });
  }

  if (elements.loginClose) elements.loginClose.addEventListener('click', closeLogin);
  if (elements.loginOverlay) elements.loginOverlay.addEventListener('click', closeLogin);

  // Shop Now — scroll to products
  if (elements.shopNowBtn) {
    elements.shopNowBtn.addEventListener('click', () => {
      const firstSection = document.querySelector('.product-section');
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      if (elements.loginModal) closeLogin();
      if (elements.locationModal) closeLocationModal();
      if (elements.userDropdown) elements.userDropdown.classList.add('hidden');
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

// --- Check for Toast from Login Page Redirect ---
function checkRedirectToast() {
  const toastMsg = sessionStorage.getItem('quickmart_login_toast');
  if (toastMsg) {
    sessionStorage.removeItem('quickmart_login_toast');
    setTimeout(() => showToast(toastMsg), 400);
  }
}

// --- Initialize App ---

function init() {
  initTheme();
  updateAuthUI();
  updateHeaderLocationUI();
  renderCategories();
  renderProducts();
  updateCartUI();
  initEventListeners();
  updateHeaderHeight();
  checkRedirectToast();
}

document.addEventListener('DOMContentLoaded', init);
