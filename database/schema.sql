-- OmniAnalytics PostgreSQL Database Schema
-- Interactive Visual Business Intelligence Platform for Retail & E-Commerce

CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Men', 'Women', 'Other')),
    country VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    cost NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    stock INTEGER NOT NULL DEFAULT 0,
    reorder_level INTEGER NOT NULL DEFAULT 15,
    solds INTEGER NOT NULL DEFAULT 0,
    location VARCHAR(100) DEFAULT 'Aisle 1 - Bay A',
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Delivered' CHECK (status IN ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned')),
    destination_country VARCHAR(100) NOT NULL,
    items_count INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS sales_analytics_daily (
    id SERIAL PRIMARY KEY,
    record_date DATE NOT NULL UNIQUE,
    products_sold INTEGER NOT NULL DEFAULT 0,
    product_returns INTEGER NOT NULL DEFAULT 0,
    daily_revenue NUMERIC(10, 2) NOT NULL DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(150) NOT NULL,
    user_avatar TEXT,
    action_type VARCHAR(50) DEFAULT 'Purchased',
    target_item VARCHAR(200) NOT NULL,
    time_ago VARCHAR(50) DEFAULT 'Just now',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS top_destinations (
    id SERIAL PRIMARY KEY,
    country VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(5) NOT NULL,
    percentage INTEGER NOT NULL,
    orders_count INTEGER NOT NULL DEFAULT 0
);
