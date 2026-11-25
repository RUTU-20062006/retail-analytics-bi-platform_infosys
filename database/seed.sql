-- OmniAnalytics PostgreSQL Database Seed Data
-- 20 items across 5 diverse categories in Indian Rupees (₹) with mixed stock states

TRUNCATE TABLE order_items, orders, activities, top_destinations, sales_analytics_daily, products, customers RESTART IDENTITY CASCADE;

-- 1. Insert Customers (Indian context)
INSERT INTO customers (first_name, last_name, email, gender, country) VALUES
('Rahul', 'Verma', 'rahul.verma@gmail.com', 'Men', 'India - Bengaluru'),
('Sneha', 'Kulkarni', 'sneha.k@outlook.com', 'Women', 'India - Mumbai'),
('Rohan', 'Mehta', 'rohan.m@gmail.com', 'Men', 'India - Delhi NCR'),
('Pooja', 'Deshmukh', 'pooja.d@yahoo.com', 'Women', 'India - Pune'),
('Arjun', 'Nair', 'arjun.nair@corp.in', 'Men', 'India - Hyderabad'),
('Neha', 'Gupta', 'neha.gupta@gmail.com', 'Women', 'India - Chennai');

-- 2. Insert 20 Curated Retail Products (Indian Rupees ₹)
INSERT INTO products (sku, name, category, price, cost, stock, reorder_level, solds, location, image_url) VALUES
-- Electronics & Accessories
('ELEC-101', 'Sony WH-1000XM5 Wireless Headphones', 'Electronics & Accessories', 24999.00, 16500.00, 45, 20, 140, 'Aisle E-01', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=150&h=150&fit=crop'),
('ELEC-102', '65W USB-C GaN Fast Charger', 'Electronics & Accessories', 2499.00, 900.00, 8, 15, 520, 'Aisle E-02', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=150&h=150&fit=crop'),
('ELEC-103', 'Mechanical RGB Gaming Keyboard', 'Electronics & Accessories', 6499.00, 2800.00, 0, 10, 115, 'Aisle E-03', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&h=150&fit=crop'),
('ELEC-104', 'AMOLED Smartwatch Fitness Tracker', 'Electronics & Accessories', 8999.00, 3800.00, 42, 15, 210, 'Aisle E-04', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop'),

-- Apparel & Footwear
('APRL-201', 'Heavyweight Cotton Pullover Hoodie', 'Apparel & Footwear', 2499.00, 850.00, 84, 25, 430, 'Aisle A-01', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=150&h=150&fit=crop'),
('APRL-202', 'Breathable Mesh Running Sneakers', 'Apparel & Footwear', 4299.00, 1600.00, 6, 15, 280, 'Aisle A-02', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop'),
('APRL-203', 'Vintage Canvas Commuter Backpack', 'Apparel & Footwear', 1999.00, 700.00, 32, 15, 195, 'Aisle A-03', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop'),
('APRL-204', 'Classic Sherpa Denim Jacket', 'Apparel & Footwear', 3999.00, 1500.00, 0, 10, 85, 'Aisle A-04', 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=150&h=150&fit=crop'),

-- Home & Kitchen
('HOME-301', '32oz Insulated Stainless Steel Tumbler', 'Home & Kitchen', 1199.00, 390.00, 110, 30, 620, 'Aisle H-01', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&h=150&fit=crop'),
('HOME-302', 'Digital 6-Quart Vortex Air Fryer', 'Home & Kitchen', 6999.00, 2900.00, 7, 12, 165, 'Aisle H-02', 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=150&h=150&fit=crop'),
('HOME-303', 'Artisanal Ceramic Coffee Mugs (Set of 4)', 'Home & Kitchen', 1499.00, 490.00, 45, 15, 240, 'Aisle H-03', 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=150&h=150&fit=crop'),
('HOME-304', 'Minimalist Touch LED Desk Lamp', 'Home & Kitchen', 1899.00, 650.00, 28, 10, 130, 'Aisle H-04', 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=150&h=150&fit=crop'),

-- Beauty & Personal Care
('BEAU-401', 'Pure Vitamin C 20% Brightening Serum', 'Beauty & Personal Care', 899.00, 220.00, 95, 25, 510, 'Aisle B-01', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=150&h=150&fit=crop'),
('BEAU-402', 'Gentle Hydrating Foaming Cleanser', 'Beauty & Personal Care', 599.00, 150.00, 12, 20, 380, 'Aisle B-02', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150&h=150&fit=crop'),
('BEAU-403', 'Ceramic Ionic Hair Styling Wand', 'Beauty & Personal Care', 3299.00, 1100.00, 38, 10, 145, 'Aisle B-03', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&h=150&fit=crop'),
('BEAU-404', 'Shea Butter Deep Moisture Body Lotion', 'Beauty & Personal Care', 499.00, 120.00, 70, 20, 290, 'Aisle B-04', 'https://images.unsplash.com/photo-1585232004423-244e0e6904e3?w=150&h=150&fit=crop'),

-- Sports & Fitness
('SPRT-501', 'Non-Slip Eco Alignment Yoga Mat', 'Sports & Fitness', 1999.00, 650.00, 58, 20, 410, 'Aisle S-01', 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=150&h=150&fit=crop'),
('SPRT-502', 'Heavy-Duty Resistance Loop Bands (Set of 5)', 'Sports & Fitness', 899.00, 200.00, 14, 25, 680, 'Aisle S-02', 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=150&h=150&fit=crop'),
('SPRT-503', '40oz Wide-Mouth Insulated Chug Bottle', 'Sports & Fitness', 1299.00, 400.00, 52, 15, 310, 'Aisle S-03', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=150&h=150&fit=crop'),
('SPRT-504', 'Water-Resistant Gym & Travel Duffle', 'Sports & Fitness', 2499.00, 850.00, 0, 12, 95, 'Aisle S-04', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop');

-- 3. Top Indian Retail Destinations
INSERT INTO top_destinations (country, code, percentage, orders_count) VALUES
('Maharashtra', 'MH', 42, 3112),
('Karnataka', 'KA', 28, 2075),
('Delhi NCR', 'DL', 15, 1112),
('Tamil Nadu', 'TN', 9, 667),
('Telangana', 'TS', 6, 446);

-- 4. Initial Sample Orders
INSERT INTO orders (order_number, customer_id, total_amount, status, destination_country, items_count) VALUES
('ORD-7421', 1, 24999.00, 'Delivered', 'Bengaluru, Karnataka', 1),
('ORD-7420', 2, 2499.00, 'Shipped', 'Mumbai, Maharashtra', 1),
('ORD-7419', 3, 6999.00, 'Processing', 'Delhi NCR', 1),
('ORD-7418', 4, 899.00, 'Delivered', 'Pune, Maharashtra', 1),
('ORD-7417', 5, 1999.00, 'Delivered', 'Hyderabad, Telangana', 1),
('ORD-7416', 6, 6499.00, 'Shipped', 'Chennai, Tamil Nadu', 1);

-- 5. Sales Analytics Daily
INSERT INTO sales_analytics_daily (record_date, products_sold, product_returns, daily_revenue) VALUES
('2026-11-12', 45, 3, 112500.00),
('2026-11-13', 52, 4, 134200.00),
('2026-11-14', 68, 2, 178900.00),
('2026-11-15', 74, 5, 192000.00),
('2026-11-16', 81, 6, 214500.00),
('2026-11-17', 63, 3, 168000.00),
('2026-11-18', 89, 4, 241000.00);

-- 6. Activities
INSERT INTO activities (user_name, action_type, target_item, time_ago) VALUES
('Rahul Verma', 'Purchased', 'Sony WH-1000XM5 Wireless Headphones', '12m ago'),
('Sneha Kulkarni', 'Purchased', 'Heavyweight Cotton Pullover Hoodie', '25m ago'),
('Rohan Mehta', 'Purchased', 'Digital 6-Quart Vortex Air Fryer', '1h ago');
