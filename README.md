# OmniAnalytics — Retail & E-Commerce Business Intelligence Platform
> **Team C — Milestone 1: Role-Based Authentication & Dynamic Multi-Category Retail Intelligence**

---

## 🔐 1. Access Credentials (Note Down for Demos)
The login screen is clean and professional with zero credentials printed on it. Use these credentials to sign in:

| Role | Portal | Email | Password | Scope & Permissions |
|---|---|---|---|---|
| **Administrator** | Admin Portal | `admin@omnianalytics.com` | `admin123` | Full access: Add/Edit/Delete products, quick stock adjustment, gross margins, live BI charts |
| **Store Associate** | Floor Portal | `staff@omnianalytics.com` | `staff123` | Operational access: Stock availability check, shelf locator, low-stock reorder triggers |

> 💡 **Role Switching:** Clicking **"Switch to Employee / Admin"** in the top navigation bar logs you out and prompts for the target role's credentials, demonstrating strict role enforcement.

---

## 📦 2. Five Diverse Retail Categories & Sample Data
The platform includes **20 curated retail products** across **5 diverse departments** with mixed stock states (*Healthy Stock*, *Low Stock*, and *Out of Stock*):

### Category 1: Electronics & Accessories
- `ELEC-101`: **Wireless Noise-Canceling Earbuds** | Price: $129.00 | Cost: $55.00 | Stock: 65 | Reorder: 20 | Solds: 340 | *Aisle E-01* (**Healthy**)
- `ELEC-102`: **65W USB-C GaN Fast Charger** | Price: $39.00 | Cost: $14.00 | Stock: 8 | Reorder: 15 | Solds: 520 | *Aisle E-02* (**Low Stock**)
- `ELEC-103`: **Mechanical RGB Gaming Keyboard** | Price: $149.00 | Cost: $65.00 | Stock: 0 | Reorder: 10 | Solds: 115 | *Aisle E-03* (**Out of Stock**)
- `ELEC-104`: **AMOLED Smartwatch Fitness Tracker** | Price: $199.00 | Cost: $85.00 | Stock: 42 | Reorder: 15 | Solds: 210 | *Aisle E-04* (**Healthy**)

### Category 2: Apparel & Footwear
- `APRL-201`: **Heavyweight Cotton Pullover Hoodie** | Price: $65.00 | Cost: $22.00 | Stock: 84 | Reorder: 25 | Solds: 430 | *Aisle A-01* (**Healthy**)
- `APRL-202`: **Breathable Mesh Running Sneakers** | Price: $95.00 | Cost: $38.00 | Stock: 6 | Reorder: 15 | Solds: 280 | *Aisle A-02* (**Low Stock**)
- `APRL-203`: **Vintage Canvas Commuter Backpack** | Price: $55.00 | Cost: $18.00 | Stock: 32 | Reorder: 15 | Solds: 195 | *Aisle A-03* (**Healthy**)
- `APRL-204`: **Classic Sherpa Denim Jacket** | Price: $110.00 | Cost: $42.00 | Stock: 0 | Reorder: 10 | Solds: 85 | *Aisle A-04* (**Out of Stock**)

### Category 3: Home & Kitchen
- `HOME-301`: **32oz Insulated Stainless Steel Tumbler** | Price: $28.00 | Cost: $9.00 | Stock: 110 | Reorder: 30 | Solds: 620 | *Aisle H-01* (**Healthy**)
- `HOME-302`: **Digital 6-Quart Vortex Air Fryer** | Price: $89.00 | Cost: $38.00 | Stock: 7 | Reorder: 12 | Solds: 165 | *Aisle H-02* (**Low Stock**)
- `HOME-303`: **Artisanal Ceramic Coffee Mugs (Set of 4)** | Price: $34.00 | Cost: $12.00 | Stock: 45 | Reorder: 15 | Solds: 240 | *Aisle H-03* (**Healthy**)
- `HOME-304`: **Minimalist Touch LED Desk Lamp** | Price: $45.00 | Cost: $16.00 | Stock: 28 | Reorder: 10 | Solds: 130 | *Aisle H-04* (**Healthy**)

### Category 4: Beauty & Personal Care
- `BEAU-401`: **Pure Vitamin C 20% Brightening Serum** | Price: $24.00 | Cost: $6.00 | Stock: 95 | Reorder: 25 | Solds: 510 | *Aisle B-01* (**Healthy**)
- `BEAU-402`: **Gentle Hydrating Foaming Cleanser** | Price: $18.00 | Cost: $4.50 | Stock: 12 | Reorder: 20 | Solds: 380 | *Aisle B-02* (**Low Stock**)
- `BEAU-403`: **Ceramic Ionic Hair Styling Wand** | Price: $75.00 | Cost: $26.00 | Stock: 38 | Reorder: 10 | Solds: 145 | *Aisle B-03* (**Healthy**)
- `BEAU-404`: **Shea Butter Deep Moisture Body Lotion** | Price: $16.00 | Cost: $4.00 | Stock: 70 | Reorder: 20 | Solds: 290 | *Aisle B-04* (**Healthy**)

### Category 5: Sports & Fitness
- `SPRT-501`: **Non-Slip Eco Alignment Yoga Mat** | Price: $48.00 | Cost: $16.00 | Stock: 58 | Reorder: 20 | Solds: 410 | *Aisle S-01* (**Healthy**)
- `SPRT-502`: **Heavy-Duty Resistance Loop Bands (Set of 5)** | Price: $22.00 | Cost: $5.00 | Stock: 14 | Reorder: 25 | Solds: 680 | *Aisle S-02* (**Low Stock**)
- `SPRT-503`: **40oz Wide-Mouth Insulated Chug Bottle** | Price: $32.00 | Cost: $10.00 | Stock: 52 | Reorder: 15 | Solds: 310 | *Aisle S-03* (**Healthy**)
- `SPRT-504`: **Water-Resistant Gym & Travel Duffle** | Price: $58.00 | Cost: $20.00 | Stock: 0 | Reorder: 12 | Solds: 95 | *Aisle S-04* (**Out of Stock**)

---

## 📈 3. Live Dynamic Calculations: How the Charts React
The dashboard does **not** rely on static dummy constants. Every action you take as an Admin recalculates metrics live:

1. **Total Revenue Card:** Dynamically computed from `sum(price * solds)`. Adding items or increasing sales updates revenue on the fly.
2. **Gross Profit Margins:** Computed from `(price - cost) / price * 100` on every item, feeding into the **Category Profitability** bar chart in the Analytics tab.
3. **Inventory Valuation:** Dynamically computed from `sum(price * stock)`.
4. **Stock Health Badges:**
   - `In Stock` (Green): `stock > reorderLevel`
   - `Low Stock • Reorder Alert` (Amber): `stock <= reorderLevel && stock > 0`
   - `Out of Stock` (Red): `stock === 0`
5. **Interactive Actions:**
   - Click **`+1` / `-1` / `+5`** on any item to see stock levels and low-stock counters update immediately.
   - Click **"Add Item"** or **"Edit"** to test entering custom products and watch category summaries adjust!

---

## 🚀 How to Run the App

```bash
cd "c:\Users\RUTU KUBASAD\OneDrive\Documents\OmniAnalytics\client"
npm run dev
```

Open **`http://localhost:3000`** in your browser.
