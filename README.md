# QuickMart — Zepto-Inspired Grocery Clone

A modern, responsive grocery delivery website built with **HTML**, **CSS**, and **vanilla JavaScript**. Inspired by Zepto's UI/UX but uses original branding ("QuickMart") — no proprietary assets copied.

![QuickMart Preview](images/banner.jpg)

## Features

- **Custom Delivery Location Management** — click the delivery location in the header to choose from saved addresses, detect current location via GPS, or add any desired delivery location of your choice with flat/house, area, city, pincode, and custom tags (Home/Work/Other); saved in `localStorage`
- **Dark Mode & Light Mode** — toggle theme with smooth transitions, persistent `localStorage` support, and system preference detection
- **Online Product Images** — high-resolution Unsplash grocery photo links for all 43 products with graceful local SVG fallbacks
- **Dedicated Login & Sign Up Page (`login.html`)** — tabbed authentication with Mobile OTP (interactive 4-digit code entry & timer), Email/Password, Sign Up, and Social Logins (Google & Apple)
- **User Session & Profile State** — remembers authenticated user, dynamic header user profile badge with dropdown menu & logout
- **Sticky header** with logo, location selector, delivery badge, search, dark mode toggle, login/profile, and cart
- **Live product search** — filter by name, category, or section without page reload
- **Category navigation** — 15 scrollable categories with active highlight
- **43 products** across 11 sections, rendered dynamically from JavaScript
- **Shopping cart** with add/remove, quantity controls, subtotal, delivery fee, and total
- **Cart sidebar** with smooth slide-in animation
- **Quick Login modal** with mobile number validation and direct link to full login page
- **Offers section** with promotional cards
- **localStorage persistence** — cart, locations, and user preferences survive page refresh
- **Fully responsive** — desktop, tablet, and mobile layouts

## Project Structure

```text
zepto-clone/
│
├── index.html          # Main storefront page
├── login.html          # Dedicated Login & Sign Up page
├── style.css           # Complete CSS (dark mode variables, store, and auth styles)
├── script.js           # Products catalog, cart, location selector, live search, theme & user state
├── login.js            # Login page interactivity (OTP, password, registration)
│
├── images/
│   ├── logo.png        # Site logo (QuickMart)
│   ├── banner.jpg      # Hero section grocery delivery banner
│   ├── products/       # Local fallback SVG & JPG product images
│   └── categories/     # Category icon images (SVG)
│
└── README.md
```

## Getting Started

### Option 1: Open directly

Double-click `index.html` in your browser.

### Option 2: Local server (recommended)

```bash
# Using Python
cd zepto-clone
python -m http.server 8080

# Then open http://localhost:8080
```

### Option 3: GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Your site will be live at `https://yourusername.github.io/repo-name/`

## Image Placement Guide

Replace placeholder images with real product photos for a production look.

### Root images (`images/`)

| File | Description | Recommended Size |
|------|-------------|------------------|
| `logo.png` | App logo (purple QuickMart branding) | 200 × 60 px |
| `banner.jpg` | Hero section grocery delivery banner | 800 × 400 px |

### Category icons (`images/categories/`)

| File | Category |
|------|----------|
| `all.svg` | All products |
| `fresh.svg` | Fresh |
| `vegetables.svg` | Vegetables |
| `fruits.svg` | Fruits |
| `dairy.svg` | Dairy |
| `atta-rice-dal.svg` | Atta, Rice & Dal |
| `oil-ghee.svg` | Oil & Ghee |
| `snacks.svg` | Snacks & Biscuits |
| `drinks.svg` | Cold Drinks & Juices |
| `tea-coffee.svg` | Tea & Coffee |
| `instant-food.svg` | Instant Food |
| `frozen.svg` | Frozen Food |
| `beauty.svg` | Beauty & Personal Care |
| `cleaning.svg` | Cleaning Essentials |
| `baby.svg` | Baby Care |
| `pet.svg` | Pet Care |

Recommended size: **80 × 80 px** (square, circular crop works best)

### Product images (`images/products/`)

| File | Product |
|------|---------|
| `apple.svg` | Apple |
| `banana.svg` | Banana |
| `orange.svg` | Orange |
| `mango.svg` | Mango |
| `tomato.svg` | Tomato |
| `potato.svg` | Potato |
| `onion.svg` | Onion |
| `carrot.svg` | Carrot |
| `amul-milk.svg` | Amul Milk |
| `curd.svg` | Curd |
| `paneer.svg` | Paneer |
| `amul-butter.svg` | Amul Butter |
| `india-gate-rice.svg` | India Gate Basmati Rice |
| `fortune-rice.svg` | Fortune Rice |
| `sona-masoori-rice.svg` | Sona Masoori Rice |
| `loreal-shampoo.svg` | L'Oréal Shampoo |
| `tresemme-shampoo.svg` | TRESemmé Shampoo |
| `parachute-oil-hair.svg` | Parachute Oil (Haircare) |
| `indulekha-oil.svg` | Indulekha Oil |
| `chana-dal.svg` | Chana Dal |
| `rajma.svg` | Rajma |
| `kabuli-chana.svg` | Kabuli Chana |
| `green-gram.svg` | Green Gram |
| `gemini-oil.svg` | Gemini Oil |
| `gingelly-oil.svg` | Gingelly Oil |
| `parachute-oil.svg` | Parachute Oil (Cooking) |
| `amul-ghee.svg` | Amul Ghee |
| `aachi-garam-masala.svg` | Aachi Garam Masala |
| `sakthi-sambar.svg` | Sakthi Sambar Powder |
| `eastern-spices.svg` | Eastern Spices |
| `mtr-rasam.svg` | MTR Rasam Powder |
| `munch.svg` | Munch |
| `snickers.svg` | Snickers |
| `ferrero-rocher.svg` | Ferrero Rocher |
| `hersheys.svg` | Hershey's |
| `minute-maid.svg` | Minute Maid |
| `frooti.svg` | Frooti |
| `maaza.svg` | Maaza |
| `appy-fizz.svg` | Appy Fizz |
| `madhur-sugar.svg` | Madhur Sugar |
| `trust-sugar.svg` | Trust Sugar |
| `brown-sugar.svg` | Brown Sugar |
| `organic-jaggery.svg` | Organic Jaggery |

Recommended size: **300 × 300 px** (square, white/transparent background)

> **Tip:** If you replace SVG placeholders with JPG/PNG files, update the `image` paths in `script.js` accordingly (e.g., change `.svg` to `.jpg`).

## JavaScript Architecture

| Feature | Function(s) |
|---------|-------------|
| Product rendering | `renderProducts()`, `createProductCard()` |
| Category filter | `selectCategory()`, `getFilteredProducts()` |
| Search | `handleSearch()` |
| Cart CRUD | `addToCart()`, `removeFromCart()`, `updateQuantity()` |
| Persistence | `loadCart()`, `saveCart()` via `localStorage` |
| Cart UI | `updateCartUI()`, `openCart()`, `closeCart()` |
| Login modal | `openLogin()`, `closeLogin()`, `validateMobile()` |

## Design Tokens

```css
:root {
  --primary: #7b2cbf;
  --secondary: #9d4edd;
  --text: #222;
  --light: #f7f7f7;
  --border: #e5e5e5;
}
```

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Android)

## License

This is an educational project for learning web development. Not affiliated with Zepto or any grocery brand.

---

© 2026 Grocery Clone. All rights reserved.
