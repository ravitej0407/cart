/* ========================================
   QuickMart - Main JavaScript (Enhanced)
   ======================================== */

// --- Configuration ---
const DELIVERY_FEE = 20;
const FREE_DELIVERY_THRESHOLD = 299;
const PLATFORM_FEE = 2;

const CART_STORAGE_KEY = 'quickmart_cart';
const THEME_STORAGE_KEY = 'quickmart_theme';
const USER_STORAGE_KEY = 'quickmart_user';
const LOCATIONS_STORAGE_KEY = 'quickmart_locations';
const ACTIVE_LOCATION_ID_KEY = 'quickmart_active_location_id';
const WISHLIST_STORAGE_KEY = 'quickmart_favorites';
const ORDERS_STORAGE_KEY = 'quickmart_orders';
const ACTIVE_ORDER_STORAGE_KEY = 'quickmart_active_order';
const COUPON_STORAGE_KEY = 'quickmart_applied_coupon';
const WALLET_STORAGE_KEY = 'quickmart_wallet_data';
const SOUND_STORAGE_KEY = 'quickmart_sound_enabled';
const REVIEWS_STORAGE_KEY = 'quickmart_product_reviews';
const ORDER_RATINGS_STORAGE_KEY = 'quickmart_order_ratings';

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

// Coupon catalog
const COUPON_CATALOG = {
  FIRST20: {
    code: 'FIRST20',
    type: 'percent',
    value: 20,
    maxDiscount: 100,
    minOrder: 0,
    desc: '20% OFF up to ₹100'
  },
  QUICK50: {
    code: 'QUICK50',
    type: 'flat',
    value: 50,
    maxDiscount: 50,
    minOrder: 399,
    desc: 'Flat ₹50 OFF on orders ₹399+'
  },
  FREEDEL: {
    code: 'FREEDEL',
    type: 'freedel',
    value: 20,
    maxDiscount: 20,
    minOrder: 0,
    desc: 'FREE Delivery on your order'
  }
};

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

// Product details & description generator
function getProductDetails(product) {
  const descriptions = {
    Fruits: 'Farm-fresh, naturally ripened and sweet fruit harvested daily directly from certified organic orchards. Rich in essential dietary vitamins, fiber, and wholesome antioxidants.',
    Vegetables: 'Crisp, nutrient-dense garden vegetables carefully sorted, sanitized, and cold-packed to retain optimum freshness and moisture.',
    Dairy: 'Freshly sourced dairy stored under strict 4°C cold-chain logistics to safeguard pure nutrition, texture, and creaminess.',
    'Atta, Rice & Dal': 'Sourced from India\'s top harvest regions. Unpolished, carefully de-stoned, and packed to preserve authentic aroma and rich nutritive grains.',
    'Oil & Ghee': 'Cold-filtered, pure cooking oil and traditional aromatic ghee with a high smoke point for delicious everyday wholesome cooking.',
    'Snacks & Biscuits': 'Irresistible, crispy treats crafted for spontaneous cravings, celebrations, or an evening tea-time snack.',
    'Cold Drinks & Juices': 'Refreshing and energizing fruit beverages bursting with vibrant flavors, best enjoyed chilled on the go.',
    Fresh: 'Selected culinary spices and pure pantry essentials to elevate traditional recipes with authentic flavors.',
    'Beauty & Personal Care': 'Trusted personal hygiene and haircare formulation ensuring deep nourishment, hydration, and long-lasting shine.'
  };

  const highlights = {
    Fruits: ['🌱 Naturally Ripened', '⚡ 10-Min Delivery', '🍃 100% Farm Fresh'],
    Vegetables: ['🧼 Hand-Sorted & Clean', '⚡ 10-Min Delivery', '🥗 Nutritious & Crisp'],
    Dairy: ['❄️ Kept at 4°C Chilled', '⚡ 10-Min Delivery', '🥛 Pure & Wholesome'],
    'Atta, Rice & Dal': ['🌾 Zero Impurities', '⚡ 10-Min Delivery', '✨ Unpolished & Pure'],
    'Oil & Ghee': ['🌿 Cold / Filtered Pure', '⚡ 10-Min Delivery', '🔥 High Smoke Point'],
    'Snacks & Biscuits': ['🍫 Crispy & Delicious', '⚡ 10-Min Delivery', '🎉 100% Genuine Pack'],
    'Cold Drinks & Juices': ['🧊 Serve Chilled', '⚡ 10-Min Delivery', '🍹 Rich Fruit Taste'],
    'Beauty & Personal Care': ['✨ 100% Authentic Brand', '⚡ 10-Min Delivery', '💆 Daily Hair & Skin Care']
  };

  return {
    description: descriptions[product.category] || descriptions.Fresh || 'High-quality grocery staple delivered to your doorstep in 10 minutes with QuickMart freshness guarantee.',
    highlights: highlights[product.category] || ['⚡ 10-Min Delivery', '🛡️ 100% Genuine', '🔄 24h Replacement']
  };
}

// --- State ---
let cart = loadCart();
let currentUser = loadUser();
let locations = loadLocations();
let activeLocationId = loadActiveLocationId();
let wishlist = loadWishlist();
let appliedCoupon = loadAppliedCoupon();
let selectedTip = 0;
let selectedInstructions = new Set();
let selectedPaymentMethod = 'UPI';
let activeOrder = loadActiveOrder();
let trackingTimerInterval = null;
let isSoundEnabled = localStorage.getItem(SOUND_STORAGE_KEY) !== 'false';
let selectedDeliveryMode = 'instant';
let selectedDeliverySlot = 'Tomorrow, 7:00 AM - 8:00 AM';
let selectedOrderRating = 5;

let activeCategory = 'all';
let searchQuery = '';
let activeFilter = 'all'; // 'all', 'under-100', 'deals', 'wishlist'
let activeSort = 'featured'; // 'featured', 'price-low', 'price-high', 'discount', 'name'

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
  quickSearchTags: document.getElementById('quickSearchTags'),
  searchResultsSection: document.getElementById('searchResultsSection'),
  searchResultsGrid: document.getElementById('searchResultsGrid'),
  searchResultsTitle: document.getElementById('searchResultsTitle'),
  noProductsMsg: document.getElementById('noProductsMsg'),

  // Filter Toolbar
  filterToolbarSection: document.getElementById('filterToolbarSection'),
  filterToolbar: document.getElementById('filterToolbar'),
  filterChips: document.getElementById('filterChips'),
  filterWishlistCount: document.getElementById('filterWishlistCount'),
  productCountBadge: document.getElementById('productCountBadge'),
  sortSelect: document.getElementById('sortSelect'),

  // Cart
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
  cartDiscountRow: document.getElementById('cartDiscountRow'),
  cartDiscount: document.getElementById('cartDiscount'),
  cartSavingsBanner: document.getElementById('cartSavingsBanner'),
  cartSavingsAmount: document.getElementById('cartSavingsAmount'),
  cartHeaderItemsCount: document.getElementById('cartHeaderItemsCount'),
  freeDeliveryTracker: document.getElementById('freeDeliveryTracker'),
  freeDeliveryMsg: document.getElementById('freeDeliveryMsg'),
  deliveryProgressFill: document.getElementById('deliveryProgressFill'),
  couponInput: document.getElementById('couponInput'),
  applyCouponBtn: document.getElementById('applyCouponBtn'),
  appliedCouponBadge: document.getElementById('appliedCouponBadge'),
  appliedCouponCode: document.getElementById('appliedCouponCode'),
  appliedCouponDiscountText: document.getElementById('appliedCouponDiscountText'),
  removeCouponBtn: document.getElementById('removeCouponBtn'),
  checkoutBtn: document.getElementById('checkoutBtn'),

  // Header Actions
  themeToggle: document.getElementById('themeToggle'),
  ordersBtn: document.getElementById('ordersBtn'),
  wishlistBtn: document.getElementById('wishlistBtn'),
  wishlistCount: document.getElementById('wishlistCount'),
  activeOrderBtn: document.getElementById('activeOrderBtn'),
  headerOrderTimer: document.getElementById('headerOrderTimer'),
  loginBtn: document.getElementById('loginBtn'),
  userProfileMenu: document.getElementById('userProfileMenu'),
  userProfileBtn: document.getElementById('userProfileBtn'),
  userAvatar: document.getElementById('userAvatar'),
  userName: document.getElementById('userName'),
  userDropdown: document.getElementById('userDropdown'),
  dropdownUserName: document.getElementById('dropdownUserName'),
  dropdownUserPhone: document.getElementById('dropdownUserPhone'),
  dropdownOrdersBtn: document.getElementById('dropdownOrdersBtn'),
  dropdownWishlistBtn: document.getElementById('dropdownWishlistBtn'),
  logoutBtn: document.getElementById('logoutBtn'),

  // Hero & Offers
  shopNowBtn: document.getElementById('shopNowBtn'),
  heroOffersBtn: document.getElementById('heroOffersBtn'),
  hero: document.getElementById('hero'),
  offers: document.getElementById('offers'),

  // Checkout Modal
  checkoutModal: document.getElementById('checkoutModal'),
  checkoutOverlay: document.getElementById('checkoutOverlay'),
  checkoutClose: document.getElementById('checkoutClose'),
  checkoutAddressText: document.getElementById('checkoutAddressText'),
  checkoutChangeAddressBtn: document.getElementById('checkoutChangeAddressBtn'),
  instructionPills: document.getElementById('instructionPills'),
  tipOptions: document.getElementById('tipOptions'),
  checkoutItemsCount: document.getElementById('checkoutItemsCount'),
  checkoutSubtotal: document.getElementById('checkoutSubtotal'),
  checkoutDiscountRow: document.getElementById('checkoutDiscountRow'),
  checkoutDiscount: document.getElementById('checkoutDiscount'),
  checkoutDelivery: document.getElementById('checkoutDelivery'),
  checkoutTipRow: document.getElementById('checkoutTipRow'),
  checkoutTip: document.getElementById('checkoutTip'),
  checkoutTotal: document.getElementById('checkoutTotal'),
  placeOrderBtn: document.getElementById('placeOrderBtn'),

  // Tracking Modal
  trackingModal: document.getElementById('trackingModal'),
  trackingOverlay: document.getElementById('trackingOverlay'),
  trackingClose: document.getElementById('trackingClose'),
  trackingCountdown: document.getElementById('trackingCountdown'),
  trackingOrderId: document.getElementById('trackingOrderId'),
  routeLineFill: document.getElementById('routeLineFill'),
  routeScooter: document.getElementById('routeScooter'),
  step1: document.getElementById('step1'),
  step2: document.getElementById('step2'),
  step3: document.getElementById('step3'),
  step4: document.getElementById('step4'),
  riderCard: document.getElementById('riderCard'),
  riderName: document.getElementById('riderName'),
  riderVehicle: document.getElementById('riderVehicle'),
  callRiderBtn: document.getElementById('callRiderBtn'),
  msgRiderBtn: document.getElementById('msgRiderBtn'),
  trackingItemsCount: document.getElementById('trackingItemsCount'),
  trackingTotalAmount: document.getElementById('trackingTotalAmount'),
  trackingItemsList: document.getElementById('trackingItemsList'),
  cancelOrderBtn: document.getElementById('cancelOrderBtn'),

  // Orders Modal
  ordersModal: document.getElementById('ordersModal'),
  ordersOverlay: document.getElementById('ordersOverlay'),
  ordersClose: document.getElementById('ordersClose'),
  ordersList: document.getElementById('ordersList'),

  // Wishlist Modal
  wishlistModal: document.getElementById('wishlistModal'),
  wishlistOverlay: document.getElementById('wishlistOverlay'),
  wishlistClose: document.getElementById('wishlistClose'),
  wishlistGrid: document.getElementById('wishlistGrid'),
  wishlistTotalCount: document.getElementById('wishlistTotalCount'),
  wishlistActionsBar: document.getElementById('wishlistActionsBar'),
  addAllWishlistToCartBtn: document.getElementById('addAllWishlistToCartBtn'),

  // Product Modal
  productModal: document.getElementById('productModal'),
  productModalOverlay: document.getElementById('productModalOverlay'),
  productModalClose: document.getElementById('productModalClose'),
  productModalBody: document.getElementById('productModalBody'),

  // Login Modal
  loginModal: document.getElementById('loginModal'),
  loginOverlay: document.getElementById('loginOverlay'),
  loginClose: document.getElementById('loginClose'),
  loginForm: document.getElementById('loginForm'),
  mobileInput: document.getElementById('mobileInput'),
  loginError: document.getElementById('loginError'),

  // Sound
  soundToggleBtn: document.getElementById('soundToggleBtn'),

  // QuickCash Wallet
  walletBtn: document.getElementById('walletBtn'),
  headerWalletBalance: document.getElementById('headerWalletBalance'),
  dropdownWalletBtn: document.getElementById('dropdownWalletBtn'),
  walletModal: document.getElementById('walletModal'),
  walletOverlay: document.getElementById('walletOverlay'),
  walletClose: document.getElementById('walletClose'),
  modalWalletBalance: document.getElementById('modalWalletBalance'),
  topupAmountInput: document.getElementById('topupAmountInput'),
  addMoneyBtn: document.getElementById('addMoneyBtn'),
  walletTxList: document.getElementById('walletTxList'),
  paymentWalletCard: document.getElementById('paymentWalletCard'),
  checkoutWalletBalanceLabel: document.getElementById('checkoutWalletBalanceLabel'),
  checkoutCashbackRow: document.getElementById('checkoutCashbackRow'),
  checkoutCashbackAmount: document.getElementById('checkoutCashbackAmount'),

  // Voice Search
  voiceSearchBtn: document.getElementById('voiceSearchBtn'),

  // Cart Upsell & Share
  shareCartBtn: document.getElementById('shareCartBtn'),
  cartUpsellSection: document.getElementById('cartUpsellSection'),
  cartUpsellItems: document.getElementById('cartUpsellItems'),

  // Delivery Mode in Checkout
  modeInstantLabel: document.getElementById('modeInstantLabel'),
  modeScheduledLabel: document.getElementById('modeScheduledLabel'),
  deliverySlotsContainer: document.getElementById('deliverySlotsContainer'),
  slotPillsGrid: document.getElementById('slotPillsGrid'),

  // Tax Invoice Modal
  invoiceModal: document.getElementById('invoiceModal'),
  invoiceOverlay: document.getElementById('invoiceOverlay'),
  invoiceClose: document.getElementById('invoiceClose'),
  invoiceModalBody: document.getElementById('invoiceModalBody'),
  printInvoiceBtn: document.getElementById('printInvoiceBtn'),
  trackingInvoiceBtn: document.getElementById('trackingInvoiceBtn'),

  // Order Rating Modal
  orderRatingModal: document.getElementById('orderRatingModal'),
  orderRatingOverlay: document.getElementById('orderRatingOverlay'),
  orderRatingClose: document.getElementById('orderRatingClose'),
  ratingModalOrderId: document.getElementById('ratingModalOrderId'),
  orderInteractiveStars: document.getElementById('orderInteractiveStars'),
  orderRatingFeedback: document.getElementById('orderRatingFeedback'),
  orderReviewComment: document.getElementById('orderReviewComment'),
  submitOrderRatingBtn: document.getElementById('submitOrderRatingBtn')
};

// --- Audio & Haptic Feedback System (Web Audio API) ---

let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'remove') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.09);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'wishlist') {
      [659, 880, 1046].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.12, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.05 + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.13);
      });
    } else if (type === 'coin') {
      [987, 1318].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.2, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.06 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.19);
      });
    } else if (type === 'coupon') {
      [523.25, 659.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.16, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.06 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.19);
      });
    } else if (type === 'success') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.16, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.26);
      });
    }
  } catch {
    // Audio restrictions / unsupported
  }
}

function initSoundUI() {
  updateSoundUI();
  if (elements.soundToggleBtn) {
    elements.soundToggleBtn.addEventListener('click', toggleSound);
  }
}

function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  localStorage.setItem(SOUND_STORAGE_KEY, String(isSoundEnabled));
  updateSoundUI();
  if (isSoundEnabled) {
    playSound('pop');
    showToast('Sound effects enabled 🔊');
  } else {
    showToast('Sound effects muted 🔇');
  }
}

function updateSoundUI() {
  if (!elements.soundToggleBtn) return;
  const onIcon = elements.soundToggleBtn.querySelector('.sound-icon-on');
  const offIcon = elements.soundToggleBtn.querySelector('.sound-icon-off');
  if (onIcon && offIcon) {
    onIcon.classList.toggle('hidden', !isSoundEnabled);
    offIcon.classList.toggle('hidden', isSoundEnabled);
  }
  elements.soundToggleBtn.title = isSoundEnabled ? 'Sound Effects: ON' : 'Sound Effects: MUTED';
  elements.soundToggleBtn.setAttribute('aria-label', isSoundEnabled ? 'Mute sound effects' : 'Enable sound effects');
}

// --- QuickCash Wallet System ---

function loadWallet() {
  try {
    const saved = localStorage.getItem(WALLET_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    balance: 150,
    transactions: [
      {
        id: 'TX-1001',
        title: 'Welcome Starter Bonus',
        type: 'credit',
        amount: 150,
        date: Date.now() - 3600000 * 24
      }
    ]
  };
}

function saveWallet(data) {
  try {
    localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(data));
  } catch {}
  updateWalletUI();
}

function updateWalletUI() {
  const wallet = loadWallet();
  if (elements.headerWalletBalance) {
    elements.headerWalletBalance.textContent = `₹${wallet.balance}`;
  }
  if (elements.modalWalletBalance) {
    elements.modalWalletBalance.textContent = `₹${wallet.balance.toFixed(2)}`;
  }
  if (elements.checkoutWalletBalanceLabel) {
    elements.checkoutWalletBalanceLabel.textContent = `Available: ₹${wallet.balance} (Earn 5% Cashback on this order!)`;
  }
  renderWalletTransactions(wallet.transactions);
}

function renderWalletTransactions(transactions) {
  if (!elements.walletTxList) return;
  if (!transactions || transactions.length === 0) {
    elements.walletTxList.innerHTML = '<p class="section-subtext" style="text-align: center; padding: 12px 0;">No transactions yet</p>';
    return;
  }

  elements.walletTxList.innerHTML = transactions.slice(0, 10).map(tx => {
    const isCredit = tx.type === 'credit';
    const dateFormatted = new Date(tx.date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
    const icon = isCredit ? (tx.title.includes('Cashback') ? '🎉' : '🪙') : '🛍️';

    return `
      <div class="tx-item">
        <div class="tx-left">
          <div class="tx-icon-wrap">${icon}</div>
          <div class="tx-info">
            <strong>${tx.title}</strong>
            <small>${dateFormatted} &bull; ${tx.id}</small>
          </div>
        </div>
        <span class="tx-amount ${isCredit ? 'credit' : 'debit'}">
          ${isCredit ? '+' : '-'}₹${tx.amount}
        </span>
      </div>
    `;
  }).join('');
}

function openWalletModal() {
  updateWalletUI();
  if (elements.walletModal) elements.walletModal.classList.add('open');
  if (elements.walletOverlay) {
    elements.walletOverlay.classList.remove('hidden');
    requestAnimationFrame(() => elements.walletOverlay.classList.add('visible'));
  }
}

function closeWalletModal() {
  if (elements.walletModal) elements.walletModal.classList.remove('open');
  if (elements.walletOverlay) {
    elements.walletOverlay.classList.remove('visible');
    setTimeout(() => elements.walletOverlay.classList.add('hidden'), 300);
  }
}

function topUpWallet(amount) {
  const amt = parseInt(amount, 10);
  if (isNaN(amt) || amt <= 0) {
    showToast('Please enter a valid top-up amount');
    return;
  }
  const wallet = loadWallet();
  wallet.balance += amt;
  wallet.transactions.unshift({
    id: 'TX-' + Math.floor(10000 + Math.random() * 90000),
    title: 'Wallet Top-Up',
    type: 'credit',
    amount: amt,
    date: Date.now()
  });
  saveWallet(wallet);
  playSound('coin');
  showToast(`🎉 ₹${amt} added to your QuickCash Wallet!`);
  if (elements.topupAmountInput) elements.topupAmountInput.value = '';
}

// --- Utility Functions ---

function getDiscountPercent(price, originalPrice) {
  if (originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

function formatPrice(amount) {
  return `₹${amount}`;
}

function getProductById(id) {
  return products.find(p => p.id === id);
}

function getCartQuantity(productId) {
  const item = cart.find(c => c.id === productId);
  return item ? item.quantity : 0;
}

function isInWishlist(productId) {
  return wishlist.includes(productId);
}

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
  if (elements.checkoutAddressText && activeLoc) {
    elements.checkoutAddressText.textContent = `${activeLoc.tag} - ${activeLoc.house ? activeLoc.house + ', ' : ''}${activeLoc.area}, ${activeLoc.city} (${activeLoc.pincode})`;
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

  elements.savedLocationsList.querySelectorAll('.location-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-delete-loc')) return;
      selectLocation(card.dataset.id);
    });
  });

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
          area: 'Detected Area',
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

// --- Theme Management ---

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  applyTheme(isDark ? 'dark' : 'light');

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

// --- Wishlist Management ---

function loadWishlist() {
  try {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveWishlist() {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  updateWishlistUI();
}

function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  const product = getProductById(productId);

  if (index > -1) {
    wishlist.splice(index, 1);
    playSound('remove');
    showToast(`Removed ${product ? product.name : 'item'} from wishlist`);
  } else {
    wishlist.push(productId);
    playSound('wishlist');
    showToast(`Added ${product ? product.name : 'item'} to wishlist ❤️`);
  }

  saveWishlist();
  renderProducts();

  // If wishlist modal open, re-render
  if (elements.wishlistModal && elements.wishlistModal.classList.contains('open')) {
    renderWishlistModal();
  }
}

function updateWishlistUI() {
  const count = wishlist.length;
  if (elements.wishlistCount) elements.wishlistCount.textContent = count;
  if (elements.filterWishlistCount) elements.filterWishlistCount.textContent = count;
  if (elements.wishlistTotalCount) elements.wishlistTotalCount.textContent = count;
  if (elements.wishlistBtn) {
    elements.wishlistBtn.classList.toggle('has-items', count > 0);
  }
}

function openWishlistModal() {
  renderWishlistModal();
  if (elements.wishlistModal) elements.wishlistModal.classList.add('open');
  if (elements.wishlistOverlay) {
    elements.wishlistOverlay.classList.remove('hidden');
    requestAnimationFrame(() => elements.wishlistOverlay.classList.add('visible'));
  }
}

function closeWishlistModal() {
  if (elements.wishlistModal) elements.wishlistModal.classList.remove('open');
  if (elements.wishlistOverlay) {
    elements.wishlistOverlay.classList.remove('visible');
    setTimeout(() => elements.wishlistOverlay.classList.add('hidden'), 300);
  }
}

function renderWishlistModal() {
  if (!elements.wishlistGrid) return;

  if (wishlist.length === 0) {
    elements.wishlistGrid.innerHTML = `
      <div class="wishlist-empty-state">
        <div class="empty-icon">❤️</div>
        <h3>Your wishlist is empty</h3>
        <p>Explore our grocery catalog and tap the heart icon on any item to save it for later.</p>
        <button class="btn-primary" type="button" onclick="closeWishlistModal()">Start Exploring</button>
      </div>
    `;
    if (elements.wishlistActionsBar) elements.wishlistActionsBar.classList.add('hidden');
    return;
  }

  if (elements.wishlistActionsBar) elements.wishlistActionsBar.classList.remove('hidden');

  elements.wishlistGrid.innerHTML = wishlist.map(id => {
    const p = getProductById(id);
    if (!p) return '';
    const fallbackSrc = `images/products/${p.fallback || 'apple.svg'}`;

    return `
      <div class="wishlist-card" data-id="${p.id}">
        <img 
          src="${p.image}" 
          alt="${p.name}" 
          class="wishlist-card-img"
          onerror="if (!this.dataset.fallback) { this.dataset.fallback = '1'; this.src='${fallbackSrc}'; } else { this.onerror=null; this.src='${fallbackSrc.replace(/\.(jpg|jpeg|png)$/i, '.svg')}'; }"
        >
        <div class="wishlist-card-info">
          <h4>${p.name}</h4>
          <p>${p.quantity}</p>
          <strong>${formatPrice(p.price)}</strong>
        </div>
        <div class="wishlist-card-actions">
          <button class="btn-primary btn-sm" type="button" onclick="addToCart(${p.id})">Add</button>
          <button class="btn-wishlist-remove" type="button" onclick="toggleWishlist(${p.id})" title="Remove">&times;</button>
        </div>
      </div>
    `;
  }).join('');
}

function addAllWishlistToCart() {
  if (wishlist.length === 0) return;
  wishlist.forEach(id => {
    const existing = cart.find(c => c.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, quantity: 1 });
    }
  });
  saveCart();
  updateCartUI();
  renderProducts();
  closeWishlistModal();
  openCart();
  showToast(`Added ${wishlist.length} saved items to your cart! 🛒`);
}

// --- Coupons System ---

function loadAppliedCoupon() {
  return localStorage.getItem(COUPON_STORAGE_KEY) || null;
}

function saveAppliedCoupon(code) {
  appliedCoupon = code;
  if (code) {
    localStorage.setItem(COUPON_STORAGE_KEY, code);
  } else {
    localStorage.removeItem(COUPON_STORAGE_KEY);
  }
}

function applyCoupon(code) {
  if (!code) return;
  const cleanCode = code.trim().toUpperCase();
  const coupon = COUPON_CATALOG[cleanCode];

  if (!coupon) {
    showToast('Invalid coupon code. Try FIRST20, QUICK50 or FREEDEL');
    return;
  }

  const subtotal = getCartSubtotal();
  if (coupon.minOrder > 0 && subtotal < coupon.minOrder) {
    showToast(`Add ₹${coupon.minOrder - subtotal} more to apply ${coupon.code}`);
    return;
  }

  saveAppliedCoupon(cleanCode);
  playSound('coupon');
  updateCartUI();
  updateCheckoutUI();
  showToast(`Coupon ${cleanCode} applied! 🎉`);
}

function removeCoupon() {
  saveAppliedCoupon(null);
  updateCartUI();
  updateCheckoutUI();
  showToast('Coupon removed');
}

function calculateCouponDiscount(subtotal, deliveryFee) {
  if (!appliedCoupon) return 0;
  const coupon = COUPON_CATALOG[appliedCoupon];
  if (!coupon) return 0;

  if (coupon.type === 'percent') {
    return Math.min(coupon.maxDiscount, Math.round((subtotal * coupon.value) / 100));
  } else if (coupon.type === 'flat') {
    return subtotal >= coupon.minOrder ? coupon.value : 0;
  } else if (coupon.type === 'freedel') {
    return deliveryFee;
  }
  return 0;
}

// --- Cart Functions ---

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

  playSound('pop');
  const product = getProductById(productId);
  if (product) showToast(`${product.name} added to cart`);

  // If product modal is open, refresh its action buttons
  if (elements.productModal && elements.productModal.classList.contains('open')) {
    updateProductModalActions(productId);
  }
}

function removeFromCart(productId) {
  playSound('remove');
  cart = cart.filter(c => c.id !== productId);
  saveCart();
  updateCartUI();
  renderProducts();

  if (elements.productModal && elements.productModal.classList.contains('open')) {
    updateProductModalActions(productId);
  }
}

function updateQuantity(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;

  if (delta > 0) playSound('pop');
  else playSound('remove');

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartUI();
    renderProducts();
  }

  if (elements.productModal && elements.productModal.classList.contains('open')) {
    updateProductModalActions(productId);
  }
}

function getCartSubtotal() {
  return cart.reduce((total, item) => {
    const product = getProductById(item.id);
    return product ? total + product.price * item.quantity : total;
  }, 0);
}

function getDeliveryFee(subtotal) {
  if (appliedCoupon === 'FREEDEL') return 0;
  return subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FEE;
}

function getCartTotalItems() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartUI() {
  if (!elements.cartCount) return;

  const totalItems = getCartTotalItems();
  const subtotal = getCartSubtotal();
  const delivery = getDeliveryFee(subtotal);
  const couponDiscount = calculateCouponDiscount(subtotal, delivery);
  const total = Math.max(0, subtotal - couponDiscount + delivery);

  elements.cartCount.textContent = totalItems;
  if (elements.cartHeaderItemsCount) {
    elements.cartHeaderItemsCount.textContent = `${totalItems} item${totalItems === 1 ? '' : 's'}`;
  }
  elements.cartSubtotal.textContent = formatPrice(subtotal);
  elements.cartDelivery.textContent = delivery === 0 ? 'FREE' : formatPrice(delivery);
  elements.cartTotal.textContent = formatPrice(total);

  // Free delivery progress bar
  if (elements.freeDeliveryTracker && elements.deliveryProgressFill && elements.freeDeliveryMsg) {
    const progressPct = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
    elements.deliveryProgressFill.style.width = `${progressPct}%`;

    if (subtotal >= FREE_DELIVERY_THRESHOLD || appliedCoupon === 'FREEDEL') {
      elements.freeDeliveryMsg.textContent = '🎉 You unlocked FREE Delivery!';
      elements.freeDeliveryTracker.querySelector('.free-delivery-info')?.classList.add('unlocked');
      elements.deliveryProgressFill.classList.add('full');
    } else {
      const remaining = FREE_DELIVERY_THRESHOLD - subtotal;
      elements.freeDeliveryMsg.textContent = `Add ${formatPrice(remaining)} more for FREE delivery`;
      elements.freeDeliveryTracker.querySelector('.free-delivery-info')?.classList.remove('unlocked');
      elements.deliveryProgressFill.classList.remove('full');
    }
  }

  // Coupon UI in cart
  if (elements.appliedCouponBadge && elements.cartDiscountRow && elements.cartDiscount) {
    if (appliedCoupon && couponDiscount > 0) {
      elements.appliedCouponBadge.classList.remove('hidden');
      if (elements.appliedCouponCode) elements.appliedCouponCode.textContent = appliedCoupon;
      if (elements.appliedCouponDiscountText) {
        elements.appliedCouponDiscountText.textContent = `-₹${couponDiscount}`;
      }
      elements.cartDiscountRow.classList.remove('hidden');
      elements.cartDiscount.textContent = `-₹${couponDiscount}`;
    } else {
      elements.appliedCouponBadge.classList.add('hidden');
      elements.cartDiscountRow.classList.add('hidden');
    }
  }

  // Savings calculation banner
  const originalTotal = cart.reduce((tot, item) => {
    const p = getProductById(item.id);
    return p ? tot + (p.originalPrice || p.price) * item.quantity : tot;
  }, 0);
  const productSavings = Math.max(0, originalTotal - subtotal);
  const totalSavings = productSavings + couponDiscount + (subtotal >= FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0);

  if (elements.cartSavingsBanner && elements.cartSavingsAmount) {
    if (totalSavings > 0 && cart.length > 0) {
      elements.cartSavingsBanner.classList.remove('hidden');
      elements.cartSavingsAmount.textContent = formatPrice(totalSavings);
    } else {
      elements.cartSavingsBanner.classList.add('hidden');
    }
  }

  const isEmpty = cart.length === 0;
  elements.cartEmpty.classList.toggle('hidden', !isEmpty);
  elements.cartItems.classList.toggle('hidden', isEmpty);
  elements.checkoutBtn.disabled = isEmpty;

  renderCartUpsells();

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

function renderCartUpsells() {
  if (!elements.cartUpsellSection || !elements.cartUpsellItems) return;
  if (cart.length === 0) {
    elements.cartUpsellSection.classList.add('hidden');
    return;
  }

  const stapleIds = [5, 6, 7, 8, 9, 10, 11, 12, 2];
  const upsells = stapleIds
    .filter(id => !cart.some(c => c.id === id))
    .map(id => getProductById(id))
    .filter(Boolean)
    .slice(0, 5);

  if (upsells.length === 0) {
    elements.cartUpsellSection.classList.add('hidden');
    return;
  }

  elements.cartUpsellSection.classList.remove('hidden');
  elements.cartUpsellItems.innerHTML = upsells.map(product => {
    const fallbackSrc = `images/products/${product.fallback || 'apple.svg'}`;
    return `
      <div class="upsell-item-card" data-id="${product.id}">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="upsell-item-img"
          loading="lazy"
          onerror="this.onerror=null; this.src='${fallbackSrc}';"
        >
        <span class="upsell-item-name" title="${product.name}">${product.name}</span>
        <span class="upsell-item-qty">${product.quantity}</span>
        <span class="upsell-item-price">${formatPrice(product.price)}</span>
        <button class="btn-upsell-add" type="button" data-upsell-id="${product.id}">+ ADD</button>
      </div>
    `;
  }).join('');

  elements.cartUpsellItems.querySelectorAll('.btn-upsell-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = parseInt(btn.dataset.upsellId, 10);
      addToCart(pId);
    });
  });
}

function shareCart() {
  if (cart.length === 0) {
    showToast('Your cart is empty! Add items first.');
    return;
  }

  const itemsList = cart.map(item => {
    const p = getProductById(item.id);
    return `• ${p ? p.name : 'Item'} (${p ? p.quantity : '1'}) × ${item.quantity} = ${formatPrice((p ? p.price : 0) * item.quantity)}`;
  }).join('\n');

  const subtotal = getCartSubtotal();
  const delivery = getDeliveryFee(subtotal);
  const total = subtotal + delivery;

  const shareText = `🛒 *My QuickMart Grocery List*\n\n${itemsList}\n\n*Total:* ${formatPrice(total)}\n⚡ Guaranteed 10-Minute Lightning Delivery with QuickMart!`;

  if (navigator.share) {
    navigator.share({
      title: 'QuickMart Grocery List',
      text: shareText
    }).catch(() => {
      copyShareTextToClipboard(shareText);
    });
  } else {
    copyShareTextToClipboard(shareText);
  }
}

function copyShareTextToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      playSound('pop');
      showToast('🛒 Grocery list copied to clipboard! Share on WhatsApp.');
    }).catch(() => {
      showToast('Could not copy list to clipboard.');
    });
  } else {
    showToast('Sharing is not supported in this browser.');
  }
}

// --- Product Rendering & Cards ---

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

function createProductCard(product) {
  const qty = getCartQuantity(product.id);
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const isWish = isInWishlist(product.id);
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
      <div class="product-image-wrap" data-quickview-id="${product.id}">
        ${discount > 0 ? `<span class="discount-badge">${discount}% OFF</span>` : ''}
        <button 
          class="btn-card-wishlist ${isWish ? 'active' : ''}" 
          type="button" 
          data-wishlist-id="${product.id}" 
          title="${isWish ? 'Remove from wishlist' : 'Add to wishlist'}"
          aria-label="${isWish ? 'Remove from wishlist' : 'Add to wishlist'}"
        >
          <svg class="icon" viewBox="0 0 24 24" fill="${isWish ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          loading="lazy"
          onerror="if (!this.dataset.fallback) { this.dataset.fallback = '1'; this.src='${fallbackSrc}'; } else { this.onerror=null; this.src='${fallbackSrc.replace(/\.(jpg|jpeg|png)$/i, '.svg')}'; }"
        >
      </div>
      <div class="product-info">
        <div class="product-rating-row">
          <span class="star-icon">★</span>
          <strong>${(4.5 + ((product.id * 7) % 5) / 10).toFixed(1)}</strong>
          <span class="rating-count">(${(250 + ((product.id * 143) % 1800) > 999) ? ((250 + ((product.id * 143) % 1800)) / 1000).toFixed(1) + 'k' : (250 + ((product.id * 143) % 1800))})</span>
        </div>
        <h3 class="product-name" data-quickview-id="${product.id}">${product.name}</h3>
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

function attachProductListeners(container) {
  // Add to cart buttons
  container.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(Number(btn.dataset.productId));
    });
  });

  // Quantity Minus
  container.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.closest('.qty-controls').dataset.productId);
      updateQuantity(id, -1);
    });
  });

  // Quantity Plus
  container.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.closest('.qty-controls').dataset.productId);
      updateQuantity(id, 1);
    });
  });

  // Wishlist Heart Button
  container.querySelectorAll('.btn-card-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(Number(btn.dataset.wishlistId));
    });
  });

  // Quick View click on image or title
  container.querySelectorAll('[data-quickview-id]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('.btn-card-wishlist')) return;
      openProductModal(Number(el.dataset.quickviewId));
    });
  });
}

function getFilteredProducts() {
  let filtered = [...products];

  // 1. Category Filter
  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  // 2. Search Query Filter
  if (searchQuery.trim()) {
    const query = searchQuery.trim().toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.section.toLowerCase().includes(query)
    );
  }

  // 3. Filter Chips
  if (activeFilter === 'under-100') {
    filtered = filtered.filter(p => p.price <= 100);
  } else if (activeFilter === 'deals') {
    filtered = filtered.filter(p => getDiscountPercent(p.price, p.originalPrice) >= 20);
  } else if (activeFilter === 'wishlist') {
    filtered = filtered.filter(p => wishlist.includes(p.id));
  }

  // 4. Sorting Options
  if (activeSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeSort === 'discount') {
    filtered.sort((a, b) => {
      const discA = getDiscountPercent(a.price, a.originalPrice);
      const discB = getDiscountPercent(b.price, b.originalPrice);
      return discB - discA;
    });
  } else if (activeSort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return filtered;
}

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

function renderProducts() {
  const filtered = getFilteredProducts();
  const isSearching = searchQuery.trim().length > 0;

  if (elements.productCountBadge) {
    elements.productCountBadge.textContent = `${filtered.length} item${filtered.length === 1 ? '' : 's'}`;
  }

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
        <p class="no-products">No products found matching your current filter. Try selecting "All Items" or clearing filters.</p>
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

// --- Product Quick-View Modal ---

function openProductModal(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const details = getProductDetails(product);
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const qty = getCartQuantity(product.id);
  const isWish = isInWishlist(product.id);
  const fallbackSrc = `images/products/${product.fallback || 'apple.svg'}`;

  // Find 3 related items from same category
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const actionHtml = qty > 0
    ? `<div class="qty-controls" data-modal-id="${product.id}">
        <button class="qty-btn modal-minus" type="button" aria-label="Decrease quantity">−</button>
        <span class="qty-value">${qty}</span>
        <button class="qty-btn modal-plus" type="button" aria-label="Increase quantity">+</button>
       </div>`
    : `<button class="btn-primary" id="modalAddBtn" type="button" data-modal-id="${product.id}">Add to Cart</button>`;

  elements.productModalBody.innerHTML = `
    <div class="product-modal-layout">
      <div class="product-modal-left">
        <button 
          class="btn-card-wishlist ${isWish ? 'active' : ''}" 
          type="button" 
          id="modalWishlistBtn" 
          title="${isWish ? 'Remove from wishlist' : 'Add to wishlist'}"
        >
          <svg class="icon" viewBox="0 0 24 24" fill="${isWish ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          class="product-modal-img"
          onerror="if (!this.dataset.fallback) { this.dataset.fallback = '1'; this.src='${fallbackSrc}'; } else { this.onerror=null; this.src='${fallbackSrc.replace(/\.(jpg|jpeg|png)$/i, '.svg')}'; }"
        >
      </div>

      <div class="product-modal-right">
        <div class="modal-badge-row">
          <span class="modal-category-tag">${product.category}</span>
          ${discount > 0 ? `<span class="modal-discount-tag">${discount}% OFF</span>` : ''}
        </div>

        <h2 class="product-modal-title" id="modalProductName">${product.name}</h2>
        <p class="product-modal-qty">Net Quantity: ${product.quantity}</p>

        <div class="product-modal-price-row">
          <span class="modal-price-current">${formatPrice(product.price)}</span>
          ${product.originalPrice > product.price ? `<span class="modal-price-original">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>

        <div class="modal-delivery-promise">
          <span>⚡</span>
          <span>In Stock — Guaranteed 10-Minute Delivery to your location</span>
        </div>

        <div class="modal-features-grid">
          ${details.highlights.map(h => `<div class="feature-box">${h}</div>`).join('')}
        </div>

        <p class="modal-description">${details.description}</p>

        <div class="product-modal-actions" id="modalActionsWrap">
          ${actionHtml}
          <button class="btn-secondary-link" type="button" onclick="openCart(); closeProductModal();">View Cart</button>
        </div>
      </div>
    </div>

    <!-- Customer Ratings & Reviews Section -->
    <div class="product-reviews-section">
      <div class="reviews-section-header">
        <h3>Customer Ratings & Reviews</h3>
        <span class="product-rating-row">
          <span class="star-icon">★</span>
          <strong>${(4.5 + ((product.id * 7) % 5) / 10).toFixed(1)} / 5</strong>
          <span class="rating-count">(${loadProductReviews(product.id).length} reviews)</span>
        </span>
      </div>

      <div class="reviews-summary-card">
        <div class="rating-big-score">
          <span class="big-rating-number">${(4.5 + ((product.id * 7) % 5) / 10).toFixed(1)}</span>
          <div class="big-rating-stars">★★★★★</div>
          <small style="color: var(--text-muted);">Verified Quality</small>
        </div>
        <div class="rating-bars-wrap">
          <div class="rating-bar-row">
            <span>5★</span>
            <div class="bar-bg"><div class="bar-fill" style="width: 78%;"></div></div>
            <span>78%</span>
          </div>
          <div class="rating-bar-row">
            <span>4★</span>
            <div class="bar-bg"><div class="bar-fill" style="width: 16%;"></div></div>
            <span>16%</span>
          </div>
          <div class="rating-bar-row">
            <span>3★</span>
            <div class="bar-bg"><div class="bar-fill" style="width: 4%;"></div></div>
            <span>4%</span>
          </div>
          <div class="rating-bar-row">
            <span>2★</span>
            <div class="bar-bg"><div class="bar-fill" style="width: 1%;"></div></div>
            <span>1%</span>
          </div>
          <div class="rating-bar-row">
            <span>1★</span>
            <div class="bar-bg"><div class="bar-fill" style="width: 1%;"></div></div>
            <span>1%</span>
          </div>
        </div>
      </div>

      <!-- Add Review Form -->
      <div class="add-review-card">
        <h4>Write a Customer Review</h4>
        <div class="star-picker" id="modalStarPicker">
          <button type="button" class="star-pick-btn active" data-val="1">★</button>
          <button type="button" class="star-pick-btn active" data-val="2">★</button>
          <button type="button" class="star-pick-btn active" data-val="3">★</button>
          <button type="button" class="star-pick-btn active" data-val="4">★</button>
          <button type="button" class="star-pick-btn active" data-val="5">★</button>
        </div>
        <div class="review-inputs-grid">
          <input type="text" id="reviewAuthorName" class="form-input" placeholder="Your Name (e.g. Ramesh S.)">
          <button class="btn-primary" type="button" id="submitProductReviewBtn" data-review-product-id="${product.id}">Post Review</button>
        </div>
        <textarea id="reviewCommentText" rows="2" placeholder="Tell us about the quality, taste, freshness or delivery speed..."></textarea>
      </div>

      <!-- Reviews List -->
      <div class="reviews-list-container">
        ${loadProductReviews(product.id).map(rev => `
          <div class="customer-review-card">
            <div class="review-author-row">
              <div class="author-meta">
                <span class="author-avatar">${rev.name.charAt(0).toUpperCase()}</span>
                <strong>${rev.name}</strong>
                ${rev.verified ? '<span class="verified-buyer-badge">✓ Verified Buyer</span>' : ''}
              </div>
              <div class="review-stars-date">
                <span class="review-stars">${'★'.repeat(rev.rating)}</span>
                <span class="review-date">${rev.date}</span>
              </div>
            </div>
            <p class="review-text-content">${rev.text}</p>
          </div>
        `).join('')}
      </div>
    </div>

    ${related.length > 0 ? `
      <div class="related-products-section">
        <h3>You Might Also Like in ${product.category}</h3>
        <div class="related-products-grid">
          ${related.map(r => `
            <div class="wishlist-card">
              <img src="${r.image}" alt="${r.name}" class="wishlist-card-img">
              <div class="wishlist-card-info">
                <h4>${r.name}</h4>
                <p>${r.quantity}</p>
                <strong>${formatPrice(r.price)}</strong>
              </div>
              <button class="btn-primary btn-sm" type="button" onclick="addToCart(${r.id}); openProductModal(${product.id});">Add</button>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;

  // Attach modal handlers
  const modalWishlistBtn = elements.productModalBody.querySelector('#modalWishlistBtn');
  if (modalWishlistBtn) {
    modalWishlistBtn.addEventListener('click', () => {
      toggleWishlist(product.id);
      const isNowWish = isInWishlist(product.id);
      modalWishlistBtn.classList.toggle('active', isNowWish);
      const svg = modalWishlistBtn.querySelector('svg');
      if (svg) svg.setAttribute('fill', isNowWish ? '#ef4444' : 'none');
    });
  }

  // Star picker clicks in product modal
  const starPicker = elements.productModalBody.querySelector('#modalStarPicker');
  if (starPicker) {
    const starBtns = starPicker.querySelectorAll('.star-pick-btn');
    starBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.dataset.val, 10);
        starBtns.forEach(b => {
          b.classList.toggle('active', parseInt(b.dataset.val, 10) <= val);
        });
      });
    });
  }

  const submitReviewBtn = elements.productModalBody.querySelector('#submitProductReviewBtn');
  if (submitReviewBtn) {
    submitReviewBtn.addEventListener('click', () => {
      submitProductReview(product.id);
    });
  }

  attachModalActionListeners(product.id);

  elements.productModal.classList.add('open');
  elements.productModalOverlay.classList.remove('hidden');
  requestAnimationFrame(() => elements.productModalOverlay.classList.add('visible'));
}

function updateProductModalActions(productId) {
  const wrap = document.getElementById('modalActionsWrap');
  if (!wrap) return;

  const qty = getCartQuantity(productId);
  wrap.innerHTML = qty > 0
    ? `<div class="qty-controls" data-modal-id="${productId}">
        <button class="qty-btn modal-minus" type="button" aria-label="Decrease quantity">−</button>
        <span class="qty-value">${qty}</span>
        <button class="qty-btn modal-plus" type="button" aria-label="Increase quantity">+</button>
       </div>
       <button class="btn-secondary-link" type="button" onclick="openCart(); closeProductModal();">View Cart</button>`
    : `<button class="btn-primary" id="modalAddBtn" type="button" data-modal-id="${productId}">Add to Cart</button>
       <button class="btn-secondary-link" type="button" onclick="openCart(); closeProductModal();">View Cart</button>`;

  attachModalActionListeners(productId);
}

function attachModalActionListeners(productId) {
  const addBtn = elements.productModalBody.querySelector('#modalAddBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => addToCart(productId));
  }

  const minusBtn = elements.productModalBody.querySelector('.modal-minus');
  if (minusBtn) {
    minusBtn.addEventListener('click', () => updateQuantity(productId, -1));
  }

  const plusBtn = elements.productModalBody.querySelector('.modal-plus');
  if (plusBtn) {
    plusBtn.addEventListener('click', () => updateQuantity(productId, 1));
  }
}

function closeProductModal() {
  if (elements.productModal) elements.productModal.classList.remove('open');
  if (elements.productModalOverlay) {
    elements.productModalOverlay.classList.remove('visible');
    setTimeout(() => elements.productModalOverlay.classList.add('hidden'), 300);
  }
}

// --- Product Ratings & Customer Reviews System ---

const defaultReviews = {
  1: [
    { name: 'Pooja Sharma', rating: 5, date: '2 days ago', verified: true, text: 'Super crisp and sweet Shimla apples! Delivered in just 7 minutes.' },
    { name: 'Vikram Joshi', rating: 5, date: '1 week ago', verified: true, text: 'Great packaging, individually wrapped and fresh.' }
  ],
  9: [
    { name: 'Amit Desai', rating: 5, date: 'Yesterday', verified: true, text: 'Ice cold and perfectly chilled packet. Everyday morning essential!' }
  ],
  4: [
    { name: 'Sneha Patel', rating: 5, date: '3 days ago', verified: true, text: 'Extremely sweet and aromatic Alphonso mangoes. Best of the season!' }
  ],
  5: [
    { name: 'Rajesh K.', rating: 5, date: 'Yesterday', verified: true, text: 'Firm and ripe tomatoes with great shelf life. No bruised pieces.' }
  ]
};

function loadProductReviews(productId) {
  try {
    const all = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || '{}');
    const custom = all[productId] || [];
    const defaults = defaultReviews[productId] || [
      { name: 'Verified Customer', rating: 5, date: '3 days ago', verified: true, text: 'Top quality product, exactly as described. Lightning-fast 10-min delivery!' }
    ];
    return [...custom, ...defaults];
  } catch {
    return defaultReviews[productId] || [];
  }
}

function saveProductReview(productId, review) {
  try {
    const all = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || '{}');
    if (!all[productId]) all[productId] = [];
    all[productId].unshift(review);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error(err);
  }
}

function submitProductReview(productId) {
  const nameInput = document.getElementById('reviewAuthorName');
  const textInput = document.getElementById('reviewCommentText');
  const name = nameInput ? nameInput.value.trim() : '';
  const text = textInput ? textInput.value.trim() : '';
  const starsActive = document.querySelectorAll('.star-picker .star-pick-btn.active');
  const rating = starsActive.length || 5;

  if (!text) {
    showToast('Please enter your review comments');
    return;
  }

  const newReview = {
    name: name || (currentUser ? currentUser.name : 'QuickMart Shopper'),
    rating,
    date: 'Just now',
    verified: true,
    text
  };

  saveProductReview(productId, newReview);
  playSound('coupon');
  showToast('Thank you! Your review has been published. ⭐');
  openProductModal(productId);
}

// --- Checkout Modal Flow ---

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }
  closeCart();
  updateCheckoutUI();

  if (elements.checkoutModal) elements.checkoutModal.classList.add('open');
  if (elements.checkoutOverlay) {
    elements.checkoutOverlay.classList.remove('hidden');
    requestAnimationFrame(() => elements.checkoutOverlay.classList.add('visible'));
  }
}

function closeCheckoutModal() {
  if (elements.checkoutModal) elements.checkoutModal.classList.remove('open');
  if (elements.checkoutOverlay) {
    elements.checkoutOverlay.classList.remove('visible');
    setTimeout(() => elements.checkoutOverlay.classList.add('hidden'), 300);
  }
}

function updateCheckoutUI() {
  const subtotal = getCartSubtotal();
  const delivery = getDeliveryFee(subtotal);
  const discount = calculateCouponDiscount(subtotal, delivery);
  const total = Math.max(0, subtotal - discount + delivery + selectedTip + PLATFORM_FEE);
  const totalItems = getCartTotalItems();

  updateHeaderLocationUI();

  if (elements.checkoutItemsCount) elements.checkoutItemsCount.textContent = totalItems;
  if (elements.checkoutSubtotal) elements.checkoutSubtotal.textContent = formatPrice(subtotal);
  if (elements.checkoutDelivery) elements.checkoutDelivery.textContent = delivery === 0 ? 'FREE' : formatPrice(delivery);

  if (elements.checkoutDiscountRow && elements.checkoutDiscount) {
    if (discount > 0) {
      elements.checkoutDiscountRow.classList.remove('hidden');
      elements.checkoutDiscount.textContent = `-₹${discount}`;
    } else {
      elements.checkoutDiscountRow.classList.add('hidden');
    }
  }

  if (elements.checkoutTipRow && elements.checkoutTip) {
    if (selectedTip > 0) {
      elements.checkoutTipRow.classList.remove('hidden');
      elements.checkoutTip.textContent = formatPrice(selectedTip);
    } else {
      elements.checkoutTipRow.classList.add('hidden');
    }
  }

  if (elements.checkoutTotal) elements.checkoutTotal.textContent = formatPrice(total);

  // Update wallet & cashback in checkout
  const wallet = loadWallet();
  if (elements.checkoutWalletBalanceLabel) {
    if (wallet.balance >= total) {
      elements.checkoutWalletBalanceLabel.textContent = `Balance: ₹${wallet.balance} (Covers full order! +5% Cashback)`;
    } else {
      elements.checkoutWalletBalanceLabel.textContent = `Balance: ₹${wallet.balance} (₹${wallet.balance} from wallet + ₹${total - wallet.balance} via UPI)`;
    }
  }

  const cashback = Math.max(1, Math.round(total * 0.05));
  if (elements.checkoutCashbackAmount) {
    elements.checkoutCashbackAmount.textContent = `+₹${cashback} into Wallet`;
  }
}

function handlePlaceOrder() {
  if (cart.length === 0) return;

  const btn = elements.placeOrderBtn;
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-text">Processing Order... ⚡</span>';
  }

  setTimeout(() => {
    const subtotal = getCartSubtotal();
    const delivery = getDeliveryFee(subtotal);
    const discount = calculateCouponDiscount(subtotal, delivery);
    const total = Math.max(0, subtotal - discount + delivery + selectedTip + PLATFORM_FEE);

    const orderId = 'QM-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      items: cart.map(item => {
        const p = getProductById(item.id);
        return {
          id: item.id,
          name: p ? p.name : 'Grocery Item',
          price: p ? p.price : 0,
          quantity: item.quantity,
          image: p ? p.image : '',
          fallback: p ? p.fallback : 'apple.svg'
        };
      }),
      subtotal,
      discount,
      coupon: appliedCoupon,
      deliveryFee: delivery,
      tip: selectedTip,
      platformFee: PLATFORM_FEE,
      total,
      address: getActiveLocation(),
      paymentMethod: selectedPaymentMethod,
      instructions: Array.from(selectedInstructions),
      status: 'in_transit',
      startTime: Date.now(),
      duration: 600, // 10 minutes (600 seconds)
      rider: {
        name: 'Ramesh Kumar',
        rating: '4.9',
        trips: '1,420 trips',
        vehicle: 'Ather 450X (MH 02 AB 4591)',
        phone: '+91 98765 43210'
      }
    };

    newOrder.deliveryMode = selectedDeliveryMode;
    newOrder.deliverySlot = selectedDeliveryMode === 'scheduled' ? selectedDeliverySlot : '10-Minute Express';

    // Handle QuickCash Wallet payment if chosen
    if (selectedPaymentMethod === 'Wallet') {
      const wallet = loadWallet();
      const deductAmt = Math.min(wallet.balance, total);
      wallet.balance = Math.max(0, wallet.balance - deductAmt);
      wallet.transactions.unshift({
        id: 'TX-' + Math.floor(10000 + Math.random() * 90000),
        title: `Order #${orderId} Payment`,
        type: 'debit',
        amount: deductAmt,
        date: Date.now()
      });
      saveWallet(wallet);
      newOrder.paidViaWallet = deductAmt;
    }

    // Award 5% Instant Cashback on every order
    const cashback = Math.max(1, Math.round(total * 0.05));
    const walletAfter = loadWallet();
    walletAfter.balance += cashback;
    walletAfter.transactions.unshift({
      id: 'TX-CB-' + Math.floor(10000 + Math.random() * 90000),
      title: `🎉 5% Order Cashback (#${orderId})`,
      type: 'credit',
      amount: cashback,
      date: Date.now()
    });
    saveWallet(walletAfter);

    saveOrder(newOrder);
    setActiveOrder(newOrder);
    playSound('success');

    // Clear cart and state
    cart = [];
    saveCart();
    saveAppliedCoupon(null);
    updateCartUI();
    renderProducts();

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<span class="btn-text">Pay & Place Order &rarr;</span>';
    }

    closeCheckoutModal();
    openTrackingModal(newOrder);
    const cbEarned = Math.max(1, Math.round(total * 0.05));
    showToast(`🎉 Order #${orderId} placed! ₹${cbEarned} cashback credited to your QuickCash Wallet! 🪙`);
  }, 700);
}

// --- Live Order Tracking Modal ---

function loadActiveOrder() {
  try {
    const saved = localStorage.getItem(ACTIVE_ORDER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function setActiveOrder(order) {
  activeOrder = order;
  if (order) {
    localStorage.setItem(ACTIVE_ORDER_STORAGE_KEY, JSON.stringify(order));
    startTrackingTimer();
  } else {
    localStorage.removeItem(ACTIVE_ORDER_STORAGE_KEY);
    if (elements.activeOrderBtn) elements.activeOrderBtn.classList.add('hidden');
    if (trackingTimerInterval) clearInterval(trackingTimerInterval);
  }
}

function openTrackingModal(order) {
  const ord = order || activeOrder;
  if (!ord) return;

  if (elements.trackingOrderId) elements.trackingOrderId.textContent = ord.id;
  if (elements.trackingTotalAmount) elements.trackingTotalAmount.textContent = formatPrice(ord.total);
  if (elements.trackingItemsCount) elements.trackingItemsCount.textContent = ord.items.reduce((acc, i) => acc + i.quantity, 0);

  if (elements.trackingItemsList) {
    elements.trackingItemsList.innerHTML = ord.items.map(item => `
      <li class="tracking-item-row">
        <span>${item.name} &times; ${item.quantity}</span>
        <strong>${formatPrice(item.price * item.quantity)}</strong>
      </li>
    `).join('');
  }

  if (elements.riderName && ord.rider) elements.riderName.textContent = ord.rider.name;
  if (elements.riderVehicle && ord.rider) elements.riderVehicle.textContent = ord.rider.vehicle;

  if (elements.trackingModal) elements.trackingModal.classList.add('open');
  if (elements.trackingOverlay) {
    elements.trackingOverlay.classList.remove('hidden');
    requestAnimationFrame(() => elements.trackingOverlay.classList.add('visible'));
  }

  startTrackingTimer();
}

function closeTrackingModal() {
  if (elements.trackingModal) elements.trackingModal.classList.remove('open');
  if (elements.trackingOverlay) {
    elements.trackingOverlay.classList.remove('visible');
    setTimeout(() => elements.trackingOverlay.classList.add('hidden'), 300);
  }
}

function startTrackingTimer() {
  if (!activeOrder) return;
  if (trackingTimerInterval) clearInterval(trackingTimerInterval);

  updateTrackingTick();
  trackingTimerInterval = setInterval(updateTrackingTick, 1000);
}

function updateTrackingTick() {
  if (!activeOrder) {
    if (trackingTimerInterval) clearInterval(trackingTimerInterval);
    return;
  }

  const elapsed = Math.floor((Date.now() - activeOrder.startTime) / 1000);
  const remaining = Math.max(0, activeOrder.duration - elapsed);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  if (elements.trackingCountdown) elements.trackingCountdown.textContent = timeStr;
  if (elements.headerOrderTimer) elements.headerOrderTimer.textContent = timeStr;
  if (elements.activeOrderBtn) elements.activeOrderBtn.classList.remove('hidden');

  // Update Route line and scooter
  const progressPct = Math.min(100, Math.max(10, Math.round((elapsed / activeOrder.duration) * 100)));
  if (elements.routeLineFill) elements.routeLineFill.style.width = `${progressPct}%`;
  if (elements.routeScooter) elements.routeScooter.style.left = `${progressPct}%`;

  // Stepper updates
  if (elements.step1 && elements.step2 && elements.step3 && elements.step4) {
    if (elapsed < 120) {
      // 0 - 2 mins: Packing at dark store
      elements.step1.className = 'step-item step-completed';
      elements.step2.className = 'step-item step-active';
      elements.step3.className = 'step-item';
      elements.step4.className = 'step-item';
    } else if (elapsed < 540) {
      // 2 - 9 mins: Rider out for delivery
      elements.step1.className = 'step-item step-completed';
      elements.step2.className = 'step-item step-completed';
      elements.step3.className = 'step-item step-active';
      elements.step4.className = 'step-item';
    } else if (remaining > 0) {
      // Arriving very soon
      elements.step1.className = 'step-item step-completed';
      elements.step2.className = 'step-item step-completed';
      elements.step3.className = 'step-item step-active';
      elements.step4.className = 'step-item';
    } else {
      // Delivered!
      elements.step1.className = 'step-item step-completed';
      elements.step2.className = 'step-item step-completed';
      elements.step3.className = 'step-item step-completed';
      elements.step4.className = 'step-item step-completed';

      clearInterval(trackingTimerInterval);
      activeOrder.status = 'delivered';
      updateOrderStatus(activeOrder.id, 'delivered');
      setActiveOrder(null);

      if (elements.activeOrderBtn) elements.activeOrderBtn.classList.add('hidden');
      showToast('🎉 Your QuickMart grocery order has been delivered! Enjoy!');
    }
  }
}

function cancelActiveOrder() {
  if (!activeOrder) return;
  if (confirm(`Are you sure you want to cancel order #${activeOrder.id}?`)) {
    updateOrderStatus(activeOrder.id, 'cancelled');
    setActiveOrder(null);
    closeTrackingModal();
    showToast('Order cancelled. Refund initiated to your original payment method.');
  }
}

// --- Order History ("My Orders") ---

function loadOrders() {
  try {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveOrder(order) {
  const orders = loadOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

function updateOrderStatus(orderId, status) {
  const orders = loadOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }
}

function openOrdersModal() {
  renderOrdersList();
  if (elements.ordersModal) elements.ordersModal.classList.add('open');
  if (elements.ordersOverlay) {
    elements.ordersOverlay.classList.remove('hidden');
    requestAnimationFrame(() => elements.ordersOverlay.classList.add('visible'));
  }
}

function closeOrdersModal() {
  if (elements.ordersModal) elements.ordersModal.classList.remove('open');
  if (elements.ordersOverlay) {
    elements.ordersOverlay.classList.remove('visible');
    setTimeout(() => elements.ordersOverlay.classList.add('hidden'), 300);
  }
}

function renderOrdersList() {
  if (!elements.ordersList) return;
  const orders = loadOrders();

  if (orders.length === 0) {
    elements.ordersList.innerHTML = `
      <div class="orders-empty-state">
        <div class="empty-icon">🛍️</div>
        <h3>No orders placed yet</h3>
        <p>Order fresh fruits, vegetables, dairy & snacks now and get delivery in 10 minutes!</p>
        <button class="btn-primary" type="button" onclick="closeOrdersModal()">Start Shopping</button>
      </div>
    `;
    return;
  }

  elements.ordersList.innerHTML = orders.map(ord => {
    const dateFormatted = new Date(ord.date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const statusClass = ord.status || 'delivered';
    const statusLabel = statusClass === 'in_transit' ? '🟢 In Transit (10-Min)' : (statusClass === 'delivered' ? '🟣 Delivered' : '🔴 Cancelled');
    const itemsPreview = ord.items.map(i => `${i.name} &times; ${i.quantity}`).join(', ');

    return `
      <div class="order-card-item">
        <div class="order-card-header">
          <div class="order-id-date">
            <strong>Order #${ord.id}</strong>
            <small>${dateFormatted} &bull; ${ord.address ? ord.address.tag : 'Home'} &bull; ${ord.deliveryMode === 'scheduled' ? '📅 ' + (ord.deliverySlot || 'Scheduled') : '⚡ 10-Min'}</small>
          </div>
          <span class="order-status-pill ${statusClass}">${statusLabel}</span>
        </div>
        <p class="order-items-snippet">${itemsPreview}</p>
        <div class="order-card-footer">
          <span class="order-total-price">${formatPrice(ord.total)} (${ord.paymentMethod || 'UPI'})</span>
          <div class="order-actions-wrap">
            <button class="btn-invoice" type="button" onclick="openInvoiceModal('${ord.id}')">📄 Invoice</button>
            <button class="btn-rate-order" type="button" onclick="openOrderRatingModal('${ord.id}')">${isOrderRated(ord.id) ? 'Rated ⭐' : '⭐ Rate'}</button>
            ${statusClass === 'in_transit' ? `
              <button class="btn-primary btn-sm" type="button" onclick="closeOrdersModal(); openTrackingModal();">Track</button>
            ` : ''}
            <button class="btn-reorder" type="button" onclick="reorderOrder('${ord.id}')">Reorder All 🛒</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function reorderOrder(orderId) {
  const orders = loadOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  order.items.forEach(item => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push({ id: item.id, quantity: item.quantity });
    }
  });

  saveCart();
  updateCartUI();
  renderProducts();
  closeOrdersModal();
  openCart();
  showToast(`Reordered ${order.items.length} items to your cart! 🛒`);
}

// --- Tax Invoice Generator Modal ---

function openInvoiceModal(orderId) {
  let order = null;
  if (orderId) {
    const orders = loadOrders();
    order = orders.find(o => o.id === orderId);
  }
  if (!order && activeOrder) {
    order = activeOrder;
  }
  if (!order) {
    showToast('Order not found');
    return;
  }

  const dateFormatted = new Date(order.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const address = order.address || { tag: 'Home', house: 'Flat 402, Sunshine Heights', area: 'Bandra West', city: 'Mumbai', pincode: '400050' };
  const user = currentUser || { name: 'QuickMart Customer', mobile: '+91 98765 43210' };

  let totalTax = 0;
  const itemsRows = order.items.map((item, idx) => {
    const p = getProductById(item.id) || item;
    const isExempt = p.category === 'Fruits' || p.category === 'Vegetables' || p.category === 'Fresh';
    const gstRate = isExempt ? 0 : 5;
    const itemTotal = item.price * item.quantity;
    const taxAmt = isExempt ? 0 : Math.round((itemTotal * (gstRate / (100 + gstRate))));
    totalTax += taxAmt;

    return `
      <tr>
        <td>${idx + 1}</td>
        <td>
          <strong>${item.name}</strong><br>
          <small style="color: #64748b;">HSN: ${isExempt ? '0709' : '2106'} &bull; Net: ${p.quantity || '1 unit'}</small>
        </td>
        <td class="col-right">${formatPrice(item.price)}</td>
        <td class="col-right">${item.quantity}</td>
        <td class="col-right">${gstRate}%</td>
        <td class="col-right"><strong>${formatPrice(itemTotal)}</strong></td>
      </tr>
    `;
  }).join('');

  elements.invoiceModalBody.innerHTML = `
    <div class="invoice-sheet">
      <div class="invoice-sheet-top">
        <div class="invoice-brand">
          <h2>QuickMart Groceries</h2>
          <p>
            QuickMart Dark Store #042 &bull; Bandra West, Mumbai 400050<br>
            <strong>GSTIN:</strong> 27AABCQ1234M1Z5 &bull; <strong>FSSAI Lic:</strong> 11521018000452
          </p>
        </div>
        <div class="invoice-meta-block">
          <span class="inv-num">INVOICE #${order.id}</span>
          <p style="margin-top: 4px; color: #475569;">
            Date: <strong>${dateFormatted}</strong><br>
            Delivery: <strong>${order.deliveryMode === 'scheduled' ? (order.deliverySlot || 'Scheduled') : '⚡ 10-Min Lightning Delivery'}</strong>
          </p>
        </div>
      </div>

      <div class="invoice-parties-grid">
        <div class="invoice-party-col">
          <h4>Billed To / Delivered To:</h4>
          <strong>${user.name}</strong>
          <p>
            ${address.house ? address.house + ', ' : ''}${address.area || 'Bandra West'}<br>
            ${address.city || 'Mumbai'} - ${address.pincode || '400050'}<br>
            Phone: ${user.mobile}
          </p>
        </div>
        <div class="invoice-party-col">
          <h4>Delivery & Payment Info:</h4>
          <p>
            Payment Mode: <strong>${order.paymentMethod || 'UPI'}</strong><br>
            Payment Status: <strong style="color: #059669;">PAID (Verified)</strong><br>
            Delivery Partner: <strong>Ramesh Kumar (Ather 450X)</strong><br>
            Instructions: ${order.instructions && order.instructions.length ? order.instructions.join(', ') : 'Standard Drop-off'}
          </p>
        </div>
      </div>

      <div class="invoice-table-wrap">
        <table class="invoice-table">
          <thead>
            <tr>
              <th style="width: 30px;">#</th>
              <th>Description & HSN</th>
              <th class="col-right">Rate</th>
              <th class="col-right">Qty</th>
              <th class="col-right">GST</th>
              <th class="col-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>
      </div>

      <div class="invoice-calc-grid">
        <div class="invoice-calc-box">
          <div class="inv-calc-row">
            <span>Items Subtotal:</span>
            <span>${formatPrice(order.subtotal)}</span>
          </div>
          ${order.discount > 0 ? `
            <div class="inv-calc-row" style="color: #059669;">
              <span>Promo Discount (${order.coupon || 'Coupon'}):</span>
              <span>-${formatPrice(order.discount)}</span>
            </div>
          ` : ''}
          <div class="inv-calc-row">
            <span>Delivery Partner Fee:</span>
            <span>${order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee)}</span>
          </div>
          ${order.tip > 0 ? `
            <div class="inv-calc-row">
              <span>Delivery Partner Tip (100% to rider):</span>
              <span>${formatPrice(order.tip)}</span>
            </div>
          ` : ''}
          <div class="inv-calc-row">
            <span>Platform Handling & GST:</span>
            <span>₹2 (incl. ₹${totalTax} total tax)</span>
          </div>
          <div class="inv-calc-row inv-grand-total">
            <span>Total Amount Paid:</span>
            <span>${formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div class="invoice-sheet-bottom">
        <div>
          <span class="inv-stamp">✓ QUICKMART VERIFIED INVOICE</span>
          <p style="margin-top: 4px;">Computer-generated tax invoice. No signature required.</p>
        </div>
        <div style="text-align: right;">
          <p>Questions? Contact support@quickmart.in &bull; 1800-QUICK-MART</p>
        </div>
      </div>
    </div>
  `;

  if (elements.invoiceModal) elements.invoiceModal.classList.add('open');
  if (elements.invoiceOverlay) {
    elements.invoiceOverlay.classList.remove('hidden');
    requestAnimationFrame(() => elements.invoiceOverlay.classList.add('visible'));
  }
}

function closeInvoiceModal() {
  if (elements.invoiceModal) elements.invoiceModal.classList.remove('open');
  if (elements.invoiceOverlay) {
    elements.invoiceOverlay.classList.remove('visible');
    setTimeout(() => elements.invoiceOverlay.classList.add('hidden'), 300);
  }
}

// --- Order Rating & Experience Modal ---

let currentRatingOrderId = null;

function isOrderRated(orderId) {
  try {
    const ratings = JSON.parse(localStorage.getItem(ORDER_RATINGS_STORAGE_KEY) || '{}');
    return !!ratings[orderId];
  } catch {
    return false;
  }
}

function openOrderRatingModal(orderId) {
  currentRatingOrderId = orderId;
  selectedOrderRating = 5;

  if (elements.ratingModalOrderId) elements.ratingModalOrderId.textContent = orderId;
  updateInteractiveRatingStars(5);

  if (elements.orderReviewComment) elements.orderReviewComment.value = '';

  if (elements.orderRatingModal) elements.orderRatingModal.classList.add('open');
  if (elements.orderRatingOverlay) {
    elements.orderRatingOverlay.classList.remove('hidden');
    requestAnimationFrame(() => elements.orderRatingOverlay.classList.add('visible'));
  }
}

function closeOrderRatingModal() {
  if (elements.orderRatingModal) elements.orderRatingModal.classList.remove('open');
  if (elements.orderRatingOverlay) {
    elements.orderRatingOverlay.classList.remove('visible');
    setTimeout(() => elements.orderRatingOverlay.classList.add('hidden'), 300);
  }
}

function updateInteractiveRatingStars(rating) {
  selectedOrderRating = rating;
  if (!elements.orderInteractiveStars) return;
  const stars = elements.orderInteractiveStars.querySelectorAll('.star-btn');
  stars.forEach((star, index) => {
    star.classList.toggle('active', index < rating);
  });

  const feedbackMessages = {
    1: '⭐ Poor — Needs Improvement',
    2: '⭐⭐ Fair — Could be Better',
    3: '⭐⭐⭐ Good — Satisfactory',
    4: '⭐⭐⭐⭐ Very Good — Fast & Fresh!',
    5: '⭐⭐⭐⭐⭐ Excellent Delivery & Service!'
  };
  if (elements.orderRatingFeedback) {
    elements.orderRatingFeedback.textContent = feedbackMessages[rating] || 'Thank you!';
  }
}

function submitOrderRating() {
  if (!currentRatingOrderId) return;
  const comment = elements.orderReviewComment ? elements.orderReviewComment.value.trim() : '';

  try {
    const ratings = JSON.parse(localStorage.getItem(ORDER_RATINGS_STORAGE_KEY) || '{}');
    ratings[currentRatingOrderId] = {
      stars: selectedOrderRating,
      comment,
      date: Date.now()
    };
    localStorage.setItem(ORDER_RATINGS_STORAGE_KEY, JSON.stringify(ratings));
  } catch (err) {
    console.error(err);
  }

  playSound('coin');
  showToast('Thank you! Your rating for Ramesh Kumar & QuickMart was submitted. ⭐');
  closeOrderRatingModal();
  renderOrdersList();
}

// --- Search & Filters ---

function handleSearch(value) {
  searchQuery = value;
  if (elements.searchClear) {
    elements.searchClear.classList.toggle('hidden', !value.trim());
  }
  renderProducts();
}

function selectCategory(categoryId) {
  activeCategory = categoryId;
  searchQuery = '';
  activeFilter = 'all';
  updateFilterChipsUI();

  if (elements.searchInput) elements.searchInput.value = '';
  if (elements.searchClear) elements.searchClear.classList.add('hidden');

  renderCategories();
  renderProducts();

  const firstSection = document.querySelector('.product-section');
  if (firstSection) {
    firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function updateFilterChipsUI() {
  if (!elements.filterChips) return;
  elements.filterChips.querySelectorAll('.filter-chip').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === activeFilter);
  });
}

// --- Voice Search (Web Speech API) ---

let speechRecognition = null;
let isVoiceListening = false;

function initVoiceSearch() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    if (elements.voiceSearchBtn) {
      elements.voiceSearchBtn.addEventListener('click', () => {
        showToast('Voice search is not supported in this browser. Please type to search. 🎙️');
      });
    }
    return;
  }

  try {
    speechRecognition = new SpeechRecognition();
    speechRecognition.continuous = false;
    speechRecognition.interimResults = false;
    speechRecognition.lang = 'en-IN';

    speechRecognition.onstart = () => {
      isVoiceListening = true;
      if (elements.voiceSearchBtn) elements.voiceSearchBtn.classList.add('listening');
      if (elements.searchInput) {
        elements.searchInput.placeholder = 'Listening... Speak grocery item (e.g. "Milk", "Mango")';
        elements.searchInput.focus();
      }
      playSound('coin');
      showToast('🎙️ Listening... speak now');
    };

    speechRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (elements.searchInput) {
        elements.searchInput.value = transcript;
        handleSearch(transcript);
        const results = document.querySelector('.search-results');
        if (results) results.scrollIntoView({ behavior: 'smooth' });
      }
      playSound('pop');
      showToast(`🎙️ Heard: "${transcript}"`);
    };

    speechRecognition.onerror = (event) => {
      isVoiceListening = false;
      if (elements.voiceSearchBtn) elements.voiceSearchBtn.classList.remove('listening');
      if (elements.searchInput) {
        elements.searchInput.placeholder = 'Search for "milk", "fruits", "rice", "shampoo"...';
      }
      if (event.error !== 'no-speech') {
        showToast('Could not recognize voice. Please try again or type.');
      }
    };

    speechRecognition.onend = () => {
      isVoiceListening = false;
      if (elements.voiceSearchBtn) elements.voiceSearchBtn.classList.remove('listening');
      if (elements.searchInput) {
        elements.searchInput.placeholder = 'Search for "milk", "fruits", "rice", "shampoo"...';
      }
    };

    if (elements.voiceSearchBtn) {
      elements.voiceSearchBtn.addEventListener('click', () => {
        if (isVoiceListening) {
          speechRecognition.stop();
        } else {
          speechRecognition.start();
        }
      });
    }
  } catch (err) {
    console.error('Speech recognition setup failed:', err);
  }
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

// --- Event Listeners Initialization ---

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
      addNewLocation({
        id: 'loc-' + Date.now(),
        tag,
        house,
        area,
        city,
        pincode
      });
    });
  }

  // Header Buttons
  if (elements.themeToggle) elements.themeToggle.addEventListener('click', toggleTheme);
  if (elements.ordersBtn) elements.ordersBtn.addEventListener('click', openOrdersModal);
  if (elements.wishlistBtn) elements.wishlistBtn.addEventListener('click', openWishlistModal);
  if (elements.activeOrderBtn) elements.activeOrderBtn.addEventListener('click', () => openTrackingModal());

  // User Profile
  if (elements.userProfileBtn) {
    elements.userProfileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      elements.userDropdown.classList.toggle('hidden');
    });
  }
  if (elements.dropdownOrdersBtn) {
    elements.dropdownOrdersBtn.addEventListener('click', () => {
      elements.userDropdown.classList.add('hidden');
      openOrdersModal();
    });
  }
  if (elements.dropdownWishlistBtn) {
    elements.dropdownWishlistBtn.addEventListener('click', () => {
      elements.userDropdown.classList.add('hidden');
      openWishlistModal();
    });
  }
  if (elements.logoutBtn) elements.logoutBtn.addEventListener('click', logoutUser);

  document.addEventListener('click', (e) => {
    if (elements.userDropdown && !elements.userDropdown.classList.contains('hidden')) {
      if (!elements.userProfileMenu.contains(e.target)) {
        elements.userDropdown.classList.add('hidden');
      }
    }
  });

  // Search & Popular Tags
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
  if (elements.quickSearchTags) {
    elements.quickSearchTags.querySelectorAll('.tag-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.dataset.query;
        elements.searchInput.value = query;
        handleSearch(query);
        const results = document.querySelector('.search-results');
        if (results) results.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // Filter Toolbar
  if (elements.filterChips) {
    elements.filterChips.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        updateFilterChipsUI();
        renderProducts();
      });
    });
  }

  if (elements.sortSelect) {
    elements.sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      renderProducts();
    });
  }

  // Cart
  if (elements.cartBtn) elements.cartBtn.addEventListener('click', openCart);
  if (elements.cartClose) elements.cartClose.addEventListener('click', closeCart);
  if (elements.cartOverlay) elements.cartOverlay.addEventListener('click', closeCart);
  if (elements.checkoutBtn) elements.checkoutBtn.addEventListener('click', openCheckoutModal);

  // Cart Coupons
  if (elements.applyCouponBtn && elements.couponInput) {
    elements.applyCouponBtn.addEventListener('click', () => {
      applyCoupon(elements.couponInput.value);
      elements.couponInput.value = '';
    });
  }
  if (elements.removeCouponBtn) {
    elements.removeCouponBtn.addEventListener('click', removeCoupon);
  }
  document.querySelectorAll('.coupon-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      applyCoupon(pill.dataset.code);
    });
  });

  // Offers Section Copy & Apply
  document.querySelectorAll('[data-copy-coupon]').forEach(card => {
    card.addEventListener('click', () => {
      const code = card.dataset.copyCoupon;
      applyCoupon(code);
      openCart();
    });
  });

  // Checkout Modal
  if (elements.checkoutClose) elements.checkoutClose.addEventListener('click', closeCheckoutModal);
  if (elements.checkoutOverlay) elements.checkoutOverlay.addEventListener('click', closeCheckoutModal);
  if (elements.checkoutChangeAddressBtn) {
    elements.checkoutChangeAddressBtn.addEventListener('click', () => {
      closeCheckoutModal();
      openLocationModal();
    });
  }

  // Instructions pills
  if (elements.instructionPills) {
    elements.instructionPills.querySelectorAll('.instruction-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const text = pill.dataset.instruction;
        if (selectedInstructions.has(text)) {
          selectedInstructions.delete(text);
          pill.classList.remove('active');
        } else {
          selectedInstructions.add(text);
          pill.classList.add('active');
        }
      });
    });
  }

  // Tip Options
  if (elements.tipOptions) {
    elements.tipOptions.querySelectorAll('.tip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        elements.tipOptions.querySelectorAll('.tip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedTip = Number(btn.dataset.tip);
        updateCheckoutUI();
      });
    });
  }

  // Payment Methods
  document.querySelectorAll('input[name="paymentMethod"]').forEach(input => {
    input.addEventListener('change', () => {
      selectedPaymentMethod = input.value;
      document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
      input.closest('.payment-method-card')?.classList.add('active');
    });
  });

  if (elements.placeOrderBtn) {
    elements.placeOrderBtn.addEventListener('click', handlePlaceOrder);
  }

  // Tracking Modal
  if (elements.trackingClose) elements.trackingClose.addEventListener('click', closeTrackingModal);
  if (elements.trackingOverlay) elements.trackingOverlay.addEventListener('click', closeTrackingModal);
  if (elements.cancelOrderBtn) elements.cancelOrderBtn.addEventListener('click', cancelActiveOrder);
  if (elements.callRiderBtn) {
    elements.callRiderBtn.addEventListener('click', () => {
      showToast('Calling delivery partner Ramesh Kumar (+91 98765 43210)...');
    });
  }
  if (elements.msgRiderBtn) {
    elements.msgRiderBtn.addEventListener('click', () => {
      showToast('Ramesh Kumar: "I have your groceries and I am 6 minutes away!"');
    });
  }

  // Orders Modal
  if (elements.ordersClose) elements.ordersClose.addEventListener('click', closeOrdersModal);
  if (elements.ordersOverlay) elements.ordersOverlay.addEventListener('click', closeOrdersModal);

  // Wishlist Modal
  if (elements.wishlistClose) elements.wishlistClose.addEventListener('click', closeWishlistModal);
  if (elements.wishlistOverlay) elements.wishlistOverlay.addEventListener('click', closeWishlistModal);
  if (elements.addAllWishlistToCartBtn) elements.addAllWishlistToCartBtn.addEventListener('click', addAllWishlistToCart);

  // Product Quick-View Modal
  if (elements.productModalClose) elements.productModalClose.addEventListener('click', closeProductModal);
  if (elements.productModalOverlay) elements.productModalOverlay.addEventListener('click', closeProductModal);

  // Quick Login Modal
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

  // Hero Actions
  if (elements.shopNowBtn) {
    elements.shopNowBtn.addEventListener('click', () => {
      const firstSection = document.querySelector('.product-section');
      if (firstSection) firstSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (elements.heroOffersBtn) {
    elements.heroOffersBtn.addEventListener('click', () => {
      if (elements.offers) elements.offers.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Footer Links
  const footerOrders = document.getElementById('footerOrdersLink');
  if (footerOrders) footerOrders.addEventListener('click', (e) => { e.preventDefault(); openOrdersModal(); });
  const footerWishlist = document.getElementById('footerWishlistLink');
  if (footerWishlist) footerWishlist.addEventListener('click', (e) => { e.preventDefault(); openWishlistModal(); });
  const footerLoc = document.getElementById('footerLocationLink');
  if (footerLoc) footerLoc.addEventListener('click', (e) => { e.preventDefault(); openLocationModal(); });

  // Share Cart
  if (elements.shareCartBtn) elements.shareCartBtn.addEventListener('click', shareCart);

  // Delivery Mode in Checkout
  if (elements.modeInstantLabel && elements.modeScheduledLabel) {
    elements.modeInstantLabel.addEventListener('click', () => {
      selectedDeliveryMode = 'instant';
      elements.modeInstantLabel.classList.add('active');
      elements.modeScheduledLabel.classList.remove('active');
      if (elements.deliverySlotsContainer) elements.deliverySlotsContainer.classList.add('hidden');
    });
    elements.modeScheduledLabel.addEventListener('click', () => {
      selectedDeliveryMode = 'scheduled';
      elements.modeScheduledLabel.classList.add('active');
      elements.modeInstantLabel.classList.remove('active');
      if (elements.deliverySlotsContainer) elements.deliverySlotsContainer.classList.remove('hidden');
    });
  }

  if (elements.slotPillsGrid) {
    elements.slotPillsGrid.querySelectorAll('.slot-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        elements.slotPillsGrid.querySelectorAll('.slot-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const radio = pill.querySelector('input[name="deliverySlot"]');
        if (radio) {
          radio.checked = true;
          selectedDeliverySlot = radio.value;
        }
      });
    });
  }

  // QuickCash Wallet Modal
  if (elements.walletBtn) elements.walletBtn.addEventListener('click', openWalletModal);
  if (elements.dropdownWalletBtn) {
    elements.dropdownWalletBtn.addEventListener('click', () => {
      if (elements.userDropdown) elements.userDropdown.classList.add('hidden');
      openWalletModal();
    });
  }
  if (elements.walletClose) elements.walletClose.addEventListener('click', closeWalletModal);
  if (elements.walletOverlay) elements.walletOverlay.addEventListener('click', closeWalletModal);

  document.querySelectorAll('.topup-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      topUpWallet(chip.dataset.amount);
    });
  });

  if (elements.addMoneyBtn && elements.topupAmountInput) {
    elements.addMoneyBtn.addEventListener('click', () => {
      topUpWallet(elements.topupAmountInput.value);
    });
  }

  // Invoice Modal
  if (elements.invoiceClose) elements.invoiceClose.addEventListener('click', closeInvoiceModal);
  if (elements.invoiceOverlay) elements.invoiceOverlay.addEventListener('click', closeInvoiceModal);
  if (elements.printInvoiceBtn) elements.printInvoiceBtn.addEventListener('click', () => window.print());
  if (elements.trackingInvoiceBtn) {
    elements.trackingInvoiceBtn.addEventListener('click', () => {
      openInvoiceModal(activeOrder ? activeOrder.id : null);
    });
  }

  // Order Rating Modal
  if (elements.orderRatingClose) elements.orderRatingClose.addEventListener('click', closeOrderRatingModal);
  if (elements.orderRatingOverlay) elements.orderRatingOverlay.addEventListener('click', closeOrderRatingModal);
  if (elements.orderInteractiveStars) {
    elements.orderInteractiveStars.querySelectorAll('.star-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.dataset.value, 10);
        updateInteractiveRatingStars(val);
      });
    });
  }
  if (elements.submitOrderRatingBtn) {
    elements.submitOrderRatingBtn.addEventListener('click', submitOrderRating);
  }

  // Escape key closes any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeLogin();
      closeLocationModal();
      closeCheckoutModal();
      closeTrackingModal();
      closeOrdersModal();
      closeWishlistModal();
      closeProductModal();
      closeWalletModal();
      closeInvoiceModal();
      closeOrderRatingModal();
      if (elements.userDropdown) elements.userDropdown.classList.add('hidden');
    }
  });

  window.addEventListener('resize', updateHeaderHeight);
}

function updateHeaderHeight() {
  const header = document.getElementById('header');
  if (header) {
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
  }
}

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
  initSoundUI();
  initWalletUI();
  initVoiceSearch();
  updateAuthUI();
  updateHeaderLocationUI();
  updateWishlistUI();
  renderCategories();
  renderProducts();
  updateCartUI();
  initEventListeners();
  updateHeaderHeight();
  checkRedirectToast();

  // Resume active delivery tracking if order active
  if (activeOrder && activeOrder.status === 'in_transit') {
    const elapsed = Math.floor((Date.now() - activeOrder.startTime) / 1000);
    if (elapsed < activeOrder.duration) {
      if (elements.activeOrderBtn) elements.activeOrderBtn.classList.remove('hidden');
      startTrackingTimer();
    } else {
      activeOrder.status = 'delivered';
      updateOrderStatus(activeOrder.id, 'delivered');
      setActiveOrder(null);
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
